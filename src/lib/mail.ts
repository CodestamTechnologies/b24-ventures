// lib/mail.ts
import nodemailer from 'nodemailer';

// Ensure required environment variables are set
const emailUser = process.env.EMAIL_SERVER_USER;
const emailPass = process.env.EMAIL_SERVER_PASSWORD;
const emailHost = process.env.EMAIL_SERVER_HOST;
const emailPort = process.env.EMAIL_SERVER_PORT;
const emailFromAddress = process.env.EMAIL_FROM_ADDRESS;
const emailFromName = process.env.EMAIL_FROM_NAME || 'Brown24 Ventures'; // Default name

if (!emailUser || !emailPass || !emailHost || !emailPort || !emailFromAddress) {
    console.error('Missing required email environment variables for Nodemailer setup.');
    // In a real app, you might throw an error or handle this more gracefully
    // For now, we'll let it potentially fail later if used without config
}

// Create a reusable transporter object
// Configure based on your provider (this is a generic SMTP example)
const transporter = nodemailer.createTransport({
    host: emailHost,
    port: parseInt(emailPort || '587'), // Default to 587
    secure: parseInt(emailPort || '587') === 465, // true for 465, false for others
    auth: {
        user: emailUser,
        pass: emailPass,
    },
    // Add TLS options if required by your provider (e.g., some need 'ignoreTLS: true' or specific ciphers)
    // tls: { rejectUnauthorized: false } // Use with caution for local testing if needed
});

interface SendMailOptions {
    to: string;
    subject: string;
    text: string;
    html: string;
}

// Function to send an email
export async function sendMail({ to, subject, text, html }: SendMailOptions) {
    if (!emailUser || !emailPass || !emailHost) { // Check if transporter was configured
         console.error("Email transporter not configured due to missing env variables.");
         throw new Error("Email service is not configured.");
    }

    const mailOptions = {
        from: `"${emailFromName}" <${emailFromAddress}>`, // Formatted sender
        to, // Recipient address
        subject,
        text,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully: %s', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        // Rethrow or handle specific errors if needed
        throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}