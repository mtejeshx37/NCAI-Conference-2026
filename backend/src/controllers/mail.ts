import { Request, Response } from "express";
import { ses } from "../../config";

interface MailBody {
  meta: Array<Array<string>>;
  body: string;
  subject: string;
}

const MailSponsor = async (req: Request, res: Response): Promise<Response> => {
  const { body, subject, meta }: MailBody = req.body;

  try {
    const emailPromises = meta.map(async (values) => {
      let modBody = body;
      values.forEach((value, idx) => {
        const placeholder = new RegExp(`\\$\\{${idx}\\}`, "g");
        modBody = modBody.replace(placeholder, value);
      });

      const data = {
        from: process.env.SES_VERIFIED_EMAIL,
        to: values[0],
        subject,
        html: `
					<html>
					<head>
						<title>${subject}</title>
					</head>
					<body>
						${modBody}
					</body>
					</html>
				`,
      };
      return ses.sendMail(data);
    });

    await Promise.all(emailPromises);
    return res.status(200).json({
      status: "👍",
      message: "[Mail sponsor]: Mail sent successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "👎",
      message: "[Mail sponsor]: Internal Server Error",
      error: err.message,
    });
  }
};

const sendContactMessage = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, subject, message } = req.body;

  try {
    const data = {
      from: process.env.SMTP_USER || process.env.SES_VERIFIED_EMAIL, // Must be verified in AWS SES or match SMTP User
      to: "magnus@citchennai.net",
      replyTo: email,
      subject: `[NCAI 2026 Inquiry] ${subject}`,
      html: `
        <html>
          <body>
            <h2>New Contact Message from ${name}</h2>
            <p><strong>From:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr />
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </body>
        </html>
      `,
    };

    // Check if SMTP is configured or if we are in mock mode
    if (process.env.SMTP_HOST) {
      await ses.sendMail(data);
    } else if (!process.env.SES_ACCESS_KEY || process.env.SES_ACCESS_KEY.includes("mock")) {
      console.log("Mocking Contact Email Sending:", data);
    } else {
      await ses.sendMail(data);
    }

    return res.status(200).json({
      status: "👍",
      message: "Message sent successfully",
    });
  } catch (err: any) {
    console.error("Error sending contact email:", err);
    return res.status(500).json({
      status: "👎",
      message: "Failed to send message",
      error: err.message,
    });
  }
};

const MailControllers = {
  MailSponsor,
  sendContactMessage,
};

export default MailControllers;
