import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

// Simple in-memory rate limiting (IP-based limit, max 5 per hour)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();

    // Rate Limiting Logic
    const userRateData = rateLimitMap.get(ip);
    if (userRateData) {
      if (now - userRateData.timestamp < RATE_LIMIT_WINDOW) {
        if (userRateData.count >= RATE_LIMIT) {
          return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
        }
        userRateData.count++;
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    const body = await req.json();
    const { name, email, subject, message, honeypot } = body;

    // Anti-spam: Honeypot check
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Save to Database
    const newContactMessage = await prisma.contactMessage.create({
      data: { name, email, subject, message, status: 'unread' },
    });

    const fromEmail = process.env.NEXT_PUBLIC_SITE_EMAIL || 'onboarding@resend.dev';
    const myEmail = process.env.MY_EMAIL || 'abubakrfazliddinov768@gmail.com';

    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: `Portfolio Contact <${fromEmail}>`,
          to: myEmail,
          subject: `New Message from ${name}: ${subject}`,
          replyTo: email,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #333; margin-bottom: 20px;">New Contact Message</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 100px; color: #666; font-weight: bold;">Name:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">Email:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <a href="mailto:${email}" style="color: #0066cc;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">Subject:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-weight: bold;">Date:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
              <div style="margin-top: 20px;">
                <h3 style="color: #666; font-size: 16px; margin-bottom: 10px;">Message:</h3>
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap; font-size: 15px; line-height: 1.5; color: #333;">${message}</div>
              </div>
            </div>
          `,
        });

        await resend.emails.send({
          from: `Abubakr Fazliddinov <${fromEmail}>`,
          to: email,
          subject: `Thanks for reaching out! - ${subject}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; text-align: center;">
              <h2 style="color: #333;">Message Received!</h2>
              <p style="color: #666; font-size: 16px; line-height: 1.5;">
                Hi ${name},<br><br>
                Thank you for contacting me regarding <strong>${subject}</strong>.<br>
                I have received your message and will get back to you as soon as possible.
              </p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="color: #999; font-size: 12px;">
                This is an automated confirmation email. Please do not reply directly to this email unless you have additional details to share.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    }

    return NextResponse.json({ success: true, messageId: newContactMessage.id });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
