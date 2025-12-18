import { Request, Response } from "express";
import crypto from "crypto";
import { db, razorpay } from "../../config";
import { Event, User, Payment } from "../queries";
import Razorpay from "razorpay";
import { sendBoardingPass, sendRegistrationEmail } from "../templates/mail";
import { savePaperToGitHub } from "../services/github";
// import format from "pg-format";

const CURRENCY = "INR";

const createOrder = async (req: Request, res: Response): Promise<Response> => {
  const { receipt, notes } = req.body;
  const amount = 100; // Fixed to 1 Rupee (100 paise)
  // const client = await db.connect();
  // try {
  //   const doesUserExist = await client.query(User.doesUserExists, [email]);
  //   if (doesUserExist.rows.length == 0) {
  //     return res.status(500).json({
  //       status: "👎",
  //       message: "Failed to create order, no user with the given email exists",
  //     });
  //   }
  // } catch (e) {
  // } finally {
  //   client.release();
  // }
  try {
    // Mock Razorpay Order if keys are placeholder
    if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID.includes("placeholder")) {
      console.log("Mocking Razorpay Order");
      return res.status(200).json({ status: "👍", order: { id: "order_mock_" + Date.now(), amount: amount, currency: CURRENCY } });
    }

    const options = {
      amount: amount, // should be in paise
      receipt,
      currency: CURRENCY,
      notes,
    };
    const order = await razorpay.orders.create(options);
    return res.status(200).json({ status: "👍", order, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    return res.status(500).json({
      status: "👎",
      message: "Failed to create order",
      error: err.message,
    });
  }
};

const verifyPayment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { order_id, payment_id, signature } = req.body;

  try {
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(order_id + "|" + payment_id)
      .digest("hex");

    if (generatedSignature === signature) {
      return res
        .status(200)
        .json({ status: "👍", message: "Payment verified successfully" });
    }
    return res
      .status(400)
      .json({ status: "👎", message: "Invalid payment signature" });
  } catch (err) {
    return res.status(500).json({
      status: "👎",
      message: "Oh no, failed to verify payment",
      error: err.message,
    });
  }
};

const webhook = async (req: Request, res: Response): Promise<Response> => {
  let isAuthorizedHit = Razorpay.validateWebhookSignature(
    JSON.stringify(req.body),
    req.headers["x-razorpay-signature"] as string,
    process.env.RAZORPAY_WEBHOOK_SECRET || "",
  );
  if (!isAuthorizedHit) {
    return res.status(401).json({ error: "fuck off, malicious actor" });
  }
  const { event, payload, created_at } = req.body;
  if (event == "payment.captured") {
    const {
      id: payment_id,
      email: userEmail,
      notes: event,
    } = payload.payment.entity;
    const client = await db.connect();
    try {
      // we need to handle idempotency
      const paymentInsertion = await client.query(Payment.insertPayment, [
        payment_id,
        new Date(created_at * 1000),
      ]);
      console.log(paymentInsertion);

      const { eventId } = event;

      const insertUserEvent = await client.query(Payment.insertUserEvent, [
        eventId,
        userEmail,
        payment_id,
      ]);
      console.log(insertUserEvent);

      // if (team_members.length > 0) {
      //   const team_member_data = team_members.map((member: any) => [
      //     member.email,
      //     member.clgName,
      //     member.phoneNo,
      //     eventId,
      //     userEmail,
      //   ]);
      //   await client.query(format(Event.addTeamMembers, team_member_data));
      // }

      const userClg = await client.query(User.getUserClg, [userEmail]);
      const eventName = await client.query(Event.fetchEventName, [eventId]);

      // send boarding pass email
      await sendBoardingPass(
        userEmail,
        userClg.rows[0].clg_name as string,
        eventName.rows[0].name,
      );

      // might as well send mail to team members too
    } catch (err) {
      console.error("Errrrr at webhook:", err);
      return res.status(500).json({
        status: "👎",
        message: "Failed to process payment",
        error: err.message,
      });
    } finally {
      client.release();
    }
    // console.log(payment_id, userEmail, events);
  }
  return res.status(200).json({ status: "👍", message: "Webhook received" });
};

const completeRegistration = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, email, name, paperTitle } = req.body;

    // Verify Signature
    if (razorpay_order_id.startsWith("order_mock_")) {
      console.log("Skipping signature verification for mock order");
    } else {
      const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

      if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({ status: "👎", message: "Invalid payment signature" });
      }
    }

    // Save Paper to GitHub Repository
    let fileLink = null;
    let paperId = null;
    if (req.file) {
      const result = await savePaperToGitHub(req.file, {
        title: paperTitle || "Untitled Paper",
        authors: [name],
        track: req.body.track || "General",
        email: email,
      });
      fileLink = result.filePath;
      paperId = result.paperId;
      console.log(`Paper saved to GitHub: ${paperId}`);
    }

    // Send Email
    await sendRegistrationEmail(
      name || "Participant",
      email,
      req.file ? paperTitle || "Untitled Paper" : undefined
    );

    return res.status(200).json({
      status: "👍",
      message: "Registration Successful",
      fileLink,
      paperId
    });

  } catch (error: any) {
    console.error("Completion Error", error);
    return res.status(500).json({ status: "👎", message: "Failed to complete registration", error: error.message });
  }
};

const PaymentControllers = {
  createOrder,
  verifyPayment,
  webhook,
  completeRegistration,
};

export default PaymentControllers;
