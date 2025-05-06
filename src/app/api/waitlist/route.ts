// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail'; // Import the utility

interface WaitlistRequestBody {
    email?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: WaitlistRequestBody = await request.json();
        const { email } = body;
        const adminEmail = process.env.ADMIN_EMAIL;

        // --- Server-Side Validation ---
        if (!email || typeof email !== 'string' || !email.includes('@') || !adminEmail) {
             console.error('API Validation Failed (Waitlist):', { email, adminEmail });
            return NextResponse.json({ message: 'Valid email is required or server configuration error.' }, { status: 400 });
        }

        // --- Send Email to Admin ---
         try {
            await sendMail({
                to: adminEmail,
                subject: `New Waitlist Signup - Brown24 Ventures`,
                text: `New user joined the waitlist:\n\nEmail: ${email}`,
                html: `<h2>New Waitlist Signup</h2><p><strong>Email:</strong> ${email}</p>`,
            });
            console.log(`Waitlist notification sent to admin: ${adminEmail}`);
        } catch (error) {
            console.error("Error sending waitlist email to admin:", error);
            // Decide if you want to proceed if admin email fails
            return NextResponse.json({ message: 'Failed to process request (admin notification failed).' }, { status: 500 });
        }

        // --- Send Confirmation Email to User ---
        try {
            await sendMail({
                to: email,
                subject: `You're on the Waitlist! - Brown24 Ventures`,
                text: `Hi there,\n\nThanks for joining the waitlist for Brown24 Ventures! We're excited to have you.\n\nWe'll notify you as soon as we launch or have major updates.\n\nBest regards,\nThe Brown24 Ventures Team`,
                html: `<p>Hi there,</p><p>Thanks for joining the waitlist for Brown24 Ventures! We're excited to have you.</p><p>We'll notify you as soon as we launch or have major updates.</p><p>Best regards,<br/>The Brown24 Ventures Team</p>`,
            });
             console.log(`Waitlist confirmation sent to user: ${email}`);
        } catch (error) {
             console.error("Error sending waitlist confirmation email to user:", error);
             // Log it, but let the request succeed for the user interface
        }

        // Assume success even if user confirmation fails, as admin notification is more critical here
        return NextResponse.json({ message: 'Successfully joined waitlist!' }, { status: 200 });

    } catch (error) {
        console.error('Waitlist API POST handler error:', error);
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ message }, { status: 500 });
    }
}