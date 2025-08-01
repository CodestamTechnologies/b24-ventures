import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const { to, subject, text, html } = await request.json();

    if (!to || !subject || !text) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await sendMail({
      to,
      subject,
      text,
      html: html || text
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}