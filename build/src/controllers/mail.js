"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const MailSponsor = async (req, res) => {
    const { body, subject, meta } = req.body;
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
            return config_1.ses.sendMail(data);
        });
        await Promise.all(emailPromises);
        return res.status(200).json({
            status: "👍",
            message: "[Mail sponsor]: Mail sent successfully",
        });
    }
    catch (err) {
        return res.status(500).json({
            status: "👎",
            message: "[Mail sponsor]: Internal Server Error",
            error: err.message,
        });
    }
};
const sendContactMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const data = {
            from: process.env.SMTP_USER || process.env.SES_VERIFIED_EMAIL,
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
        if (process.env.SMTP_HOST) {
            await config_1.ses.sendMail(data);
        }
        else if (!process.env.SES_ACCESS_KEY || process.env.SES_ACCESS_KEY.includes("mock")) {
            console.log("Mocking Contact Email Sending:", data);
        }
        else {
            await config_1.ses.sendMail(data);
        }
        return res.status(200).json({
            status: "👍",
            message: "Message sent successfully",
        });
    }
    catch (err) {
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
exports.default = MailControllers;
//# sourceMappingURL=mail.js.map