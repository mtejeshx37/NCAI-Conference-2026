import * as AWS from "@aws-sdk/client-ses";
import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter;

if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  console.log("Using SMTP for email delivery");
} else {
  const ses = new AWS.SES({
    apiVersion: "2010-12-01",
    region: process.env.REGION || "",
    credentials: {
      accessKeyId: process.env.SES_ACCESS_KEY || "",
      secretAccessKey: process.env.SES_SECRET_ACCESS_KEY || "",
    },
  });

  transporter = nodemailer.createTransport({
    SES: { ses, aws: AWS },
  });
  console.log("Using AWS SES (or Mock) for email delivery");
}

export default transporter;
