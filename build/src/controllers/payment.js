"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../../config");
const queries_1 = require("../queries");
const razorpay_1 = __importDefault(require("razorpay"));
const mail_1 = require("../templates/mail");
const github_1 = require("../services/github");
const CURRENCY = "INR";
const createOrder = async (req, res) => {
    const { receipt, notes } = req.body;
    const amount = 100;
    try {
        if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID.includes("placeholder")) {
            console.log("Mocking Razorpay Order");
            return res.status(200).json({ status: "👍", order: { id: "order_mock_" + Date.now(), amount: amount, currency: CURRENCY } });
        }
        const options = {
            amount: amount,
            receipt,
            currency: CURRENCY,
            notes,
        };
        const order = await config_1.razorpay.orders.create(options);
        return res.status(200).json({ status: "👍", order, keyId: process.env.RAZORPAY_KEY_ID });
    }
    catch (err) {
        return res.status(500).json({
            status: "👎",
            message: "Failed to create order",
            error: err.message,
        });
    }
};
const verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature } = req.body;
    try {
        const generatedSignature = crypto_1.default
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
    }
    catch (err) {
        return res.status(500).json({
            status: "👎",
            message: "Oh no, failed to verify payment",
            error: err.message,
        });
    }
};
const webhook = async (req, res) => {
    let isAuthorizedHit = razorpay_1.default.validateWebhookSignature(JSON.stringify(req.body), req.headers["x-razorpay-signature"], process.env.RAZORPAY_WEBHOOK_SECRET || "");
    if (!isAuthorizedHit) {
        return res.status(401).json({ error: "fuck off, malicious actor" });
    }
    const { event, payload, created_at } = req.body;
    if (event == "payment.captured") {
        const { id: payment_id, email: userEmail, notes: event, } = payload.payment.entity;
        const client = await config_1.db.connect();
        try {
            const paymentInsertion = await client.query(queries_1.Payment.insertPayment, [
                payment_id,
                new Date(created_at * 1000),
            ]);
            console.log(paymentInsertion);
            const { eventId } = event;
            const insertUserEvent = await client.query(queries_1.Payment.insertUserEvent, [
                eventId,
                userEmail,
                payment_id,
            ]);
            console.log(insertUserEvent);
            const userClg = await client.query(queries_1.User.getUserClg, [userEmail]);
            const eventName = await client.query(queries_1.Event.fetchEventName, [eventId]);
            await (0, mail_1.sendBoardingPass)(userEmail, userClg.rows[0].clg_name, eventName.rows[0].name);
        }
        catch (err) {
            console.error("Errrrr at webhook:", err);
            return res.status(500).json({
                status: "👎",
                message: "Failed to process payment",
                error: err.message,
            });
        }
        finally {
            client.release();
        }
    }
    return res.status(200).json({ status: "👍", message: "Webhook received" });
};
const completeRegistration = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature, email, name, paperTitle } = req.body;
        if (razorpay_order_id.startsWith("order_mock_")) {
            console.log("Skipping signature verification for mock order");
        }
        else {
            const generatedSignature = crypto_1.default
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
                .update(razorpay_order_id + "|" + razorpay_payment_id)
                .digest("hex");
            if (generatedSignature !== razorpay_signature) {
                return res.status(400).json({ status: "👎", message: "Invalid payment signature" });
            }
        }
        let fileLink = null;
        let paperId = null;
        if (req.file) {
            const result = await (0, github_1.savePaperToGitHub)(req.file, {
                title: paperTitle || "Untitled Paper",
                authors: [name],
                track: req.body.track || "General",
                email: email,
            });
            fileLink = result.filePath;
            paperId = result.paperId;
            console.log(`Paper saved to GitHub: ${paperId}`);
        }
        await (0, mail_1.sendRegistrationEmail)(name || "Participant", email, req.file ? paperTitle || "Untitled Paper" : undefined);
        return res.status(200).json({
            status: "👍",
            message: "Registration Successful",
            fileLink,
            paperId
        });
    }
    catch (error) {
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
exports.default = PaymentControllers;
//# sourceMappingURL=payment.js.map