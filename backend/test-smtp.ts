
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('Testing SMTP Configuration...');
console.log('Host:', process.env.SMTP_HOST);
console.log('User:', process.env.SMTP_USER);

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

transporter.verify(function (error, success) {
    if (error) {
        console.error('SMTP VERIFICATION FAILED:');
        console.error(error);
        process.exit(1);
    } else {
        console.log('SMTP VERIFICATION SUCCESS! Server is ready to take our messages');
        process.exit(0);
    }
});
