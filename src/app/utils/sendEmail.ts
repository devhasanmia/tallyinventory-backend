import config from "../config";

const nodemailer = require("nodemailer");

export const sendEmail = async (to: string, subject: string, htmlTemplete: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: config.EMAIL_HOST,
            port: config.EMAIL_PORT,
            secure: config.EMAIL_SECURE,
            auth: {
                user: config.EMAIL_AUTH_EMAIL,
                pass: config.EMAIL_AUTH_APP_PASSWORD,
            },
        });
        const mailOptions = {
            from: config.SENDER_EMAIL_ADDRESS,
            to: `${to}`,
            subject: `${subject}`,
            html: `${htmlTemplete}`,
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};



