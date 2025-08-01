import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';
import { getActiveAdmins } from '@/lib/firestore/admin-utils';

interface ContactRequestBody {
    name?: string;
    email?: string;
    message?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: ContactRequestBody = await request.json();
        const { name, email, message } = body;

        
        if (!name || !email || !message || typeof email !== 'string' || !email.includes('@')) {
            console.error('API Validation Failed (Contact):', { name, email, message });
            return NextResponse.json({ message: 'Missing required fields or invalid email.' }, { status: 400 });
        }

        // --- Get Active Admins from Firestore ---
        let admins;
        try {
            admins = await getActiveAdmins();
            if (!admins.length) {
                console.error('No active admins found in Firestore');
                return NextResponse.json({ message: 'Server configuration error (no admins configured).' }, { status: 500 });
            }
        } catch (error) {
            console.error("Error fetching admins from Firestore:", error);
            return NextResponse.json({ message: 'Failed to process request (admin lookup failed).' }, { status: 500 });
        }

        // --- Send Email to All Admins ---
        try {
            const emailPromises = admins.map(admin => 
                sendMail({
                    to: admin.email,
                    subject: `New Contact Form Submission from ${name} - Brown24 Ventures`,
                    text: `You received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
                    html: `<h2>New Contact Form Submission</h2>
                          <p><strong>Name:</strong> ${name}</p>
                          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                          <p><strong>Message:</strong></p>
                          <p>${message.replace(/\n/g, '<br>')}</p>`,
                })
            );

            await Promise.all(emailPromises);
            console.log(`Contact form notifications sent to ${admins.length} admins`);
        } catch (error) {
            console.error("Error sending contact emails to admins:", error);
            return NextResponse.json({ message: 'Failed to process request (admin notification failed).' }, { status: 500 });
        }

        // --- Send Confirmation Email to User ---
        try {
            await sendMail({
                to: email,
                subject: `We Received Your Message - Brown24 Ventures`,
                text: `Hi ${name},\n\nThanks for contacting us! We've received your message and will aim to get back to you within 1-2 business days.\n\nYour message:\n"${message}"\n\nBest regards,\nThe Brown24 Ventures Team`,
                html: `<p>Hi ${name},</p>
                      <p>Thanks for contacting us! We've received your message and will aim to get back to you within 1-2 business days.</p>
                      <p><strong>Your message:</strong></p>
                      <blockquote style="border-left: 2px solid #ccc; padding-left: 1em; margin-left: 1em; font-style: italic;">
                        ${message.replace(/\n/g, '<br>')}
                      </blockquote>
                      <p>Best regards,<br/>The Brown24 Ventures Team</p>`,
            });
            console.log(`Contact form confirmation sent to user: ${email}`);
        } catch (error) {
            console.error("Error sending contact confirmation email to user:", error);
            // Continue even if user confirmation fails
        }

        return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });

    } catch (error) {
        console.error('Contact API POST handler error:', error);
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ message }, { status: 500 });
    }
}