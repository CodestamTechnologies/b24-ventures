// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail'; // Import the utility

interface ContactRequestBody {
    name?: string;
    email?: string;
    message?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: ContactRequestBody = await request.json();
        const { name, email, message } = body;
        const adminEmail = process.env.ADMIN_EMAIL; // Get admin email from env

        // --- Server-Side Validation ---
        if (!name || !email || !message || typeof email !== 'string' || !email.includes('@') || !adminEmail) {
            console.error('API Validation Failed (Contact):', { name, email, message, adminEmail });
            return NextResponse.json({ message: 'Missing required fields, invalid email, or server configuration error.' }, { status: 400 });
        }

        // --- Send Email to Admin ---
        try {
            await sendMail({
                to: adminEmail,
                subject: `New Contact Form Submission from ${name} - Brown24 Ventures`,
                text: `You received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
                html: `<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`, // Basic HTML formatting
            });
            console.log(`Contact form notification sent to admin: ${adminEmail}`);
        } catch (error) {
            console.error("Error sending contact email to admin:", error);
            // Decide if you want to proceed if admin email fails
            // For now, we'll return an error
            return NextResponse.json({ message: 'Failed to process request (admin notification failed).' }, { status: 500 });
        }

        // --- Send Confirmation Email to User ---
        try {
            await sendMail({
                to: email,
                subject: `We Received Your Message - Brown24 Ventures`,
                text: `Hi ${name},\n\nThanks for contacting us! We've received your message and will aim to get back to you within 1-2 business days.\n\nYour message:\n"${message}"\n\nBest regards,\nThe Brown24 Ventures Team`,
                html: `<p>Hi ${name},</p><p>Thanks for contacting us! We've received your message and will aim to get back to you within 1-2 business days.</p><p><strong>Your message:</strong></p><blockquote style="border-left: 2px solid #ccc; padding-left: 1em; margin-left: 1em; font-style: italic;">${message.replace(/\n/g, '<br>')}</blockquote><p>Best regards,<br/>The Brown24 Ventures Team</p>`,
            });
            console.log(`Contact form confirmation sent to user: ${email}`);
        } catch (error) {
             console.error("Error sending contact confirmation email to user:", error);
             // Don't necessarily fail the whole request if user confirmation fails
             // Log it, maybe notify admin differently? For now, let it proceed.
             // You could return a specific message indicating user email failure.
        }

        return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });

    } catch (error) {
        console.error('Contact API POST handler error:', error);
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ message }, { status: 500 });
    }
}