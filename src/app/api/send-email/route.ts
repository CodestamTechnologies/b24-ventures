import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { to, subject, text, html } = await request.json();

    if (!to || !subject || !text) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_SERVER_USER;
    const emailPass = process.env.EMAIL_SERVER_PASSWORD;
    const emailHost = process.env.EMAIL_SERVER_HOST;
    const emailPort = process.env.EMAIL_SERVER_PORT;

    // Create transporter directly in the API route
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

    // Define mail options
    const mailOptions = {
      from: `Brown24Ventures <${emailUser}>`, // Proper format for "Name <email>" 
      to,
      subject,
      text,
      html: html || text,
    };
    

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
