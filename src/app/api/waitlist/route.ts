// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';
import { getActiveAdmins } from '@/lib/firestore/admin-utils';

interface WaitlistRequestBody {
    email?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: WaitlistRequestBody = await request.json();
        const { email } = body;

        // --- Server-Side Validation ---
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            console.error('API Validation Failed (Waitlist):', { email });
            return NextResponse.json(
                { message: 'Valid email is required.' }, 
                { status: 400 }
            );
        }

        // --- Get Active Admins from Firestore ---
        let admins;
        try {
            admins = await getActiveAdmins();
            if (!admins.length) {
                console.error('No active admins found in Firestore');
                return NextResponse.json(
                    { message: 'Server configuration error (no admins configured).' }, 
                    { status: 500 }
                );
            }
        } catch (error) {
            console.error("Error fetching admins from Firestore:", error);
            return NextResponse.json(
                { message: 'Failed to process request (admin lookup failed).' }, 
                { status: 500 }
            );
        }

        // --- Send Email to All Admins ---
        try {
            const adminEmails = admins.map(admin => admin.email);
            const adminNotificationPromise = sendMail({
                to: adminEmails.join(','), // Send to all admins in one email
                subject: `New Waitlist Signup - Brown24 Ventures`,
                text: `New user joined the waitlist:\n\nEmail: ${email}\n\nNotified admins: ${adminEmails.join(', ')}`,
                html: `
                    <h2>New Waitlist Signup</h2>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Notified admins:</strong> ${adminEmails.join(', ')}</p>
                `,
            });

            // --- Send Confirmation Email to User ---
            const userConfirmationPromise = sendMail({
                to: email,
                subject: `You're on the Waitlist! - Brown24 Ventures`,
                text: `Hi there,\n\nThanks for joining the waitlist for Brown24 Ventures! We're excited to have you.\n\nWe'll notify you as soon as we launch or have major updates.\n\nBest regards,\nThe Brown24 Ventures Team`,
                html: `
                    <p>Hi there,</p>
                    <p>Thanks for joining the waitlist for Brown24 Ventures! We're excited to have you.</p>
                    <p>We'll notify you as soon as we launch or have major updates.</p>
                    <p>Best regards,<br/>The Brown24 Ventures Team</p>
                `,
            });

            // Execute both email sends in parallel
            await Promise.all([adminNotificationPromise, userConfirmationPromise]);
            
            console.log(`Waitlist notification sent to ${admins.length} admins`);
            console.log(`Waitlist confirmation sent to user: ${email}`);

        } catch (error: unknown) {
    console.error("Error sending waitlist emails:", error);

    if (error instanceof Error && error.message.includes('admin')) {
        return NextResponse.json(
            { message: 'Failed to process request (admin notification failed).' },
            { status: 500 }
        );
    }

    // Continue even if user confirmation fails
}



        return NextResponse.json(
            { message: 'Successfully joined waitlist!' }, 
            { status: 200 }
        );

    } catch (error) {
        console.error('Waitlist API POST handler error:', error);
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json(
            { message }, 
            { status: 500 }
        );
    }
}