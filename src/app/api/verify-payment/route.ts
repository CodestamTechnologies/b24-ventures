import { NextRequest, NextResponse } from 'next/server'
import { razorpay } from '@/lib/razorpay'
import { VerifyPaymentSchema } from '@/types/order'
import { verifyAuthToken } from '@/lib/auth'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
    }

    // Verify authentication
    const user = await verifyAuthToken(req)
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await req.json()
        const {
            razorpay_payment_id,
            razorpay_signature,
            razorpay_subscription_id,
            planId,
            planName
        } = VerifyPaymentSchema.parse(body)

        // Verify payment signature for subscription-based payment
        const text = `${razorpay_payment_id}|${razorpay_subscription_id}`
        const signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(text)
            .digest('hex')
        console.log(process.env.RAZORPAY_KEY_SECRET)
        console.log(razorpay_subscription_id, razorpay_payment_id)
        console.log(signature, razorpay_signature)
        if (signature !== razorpay_signature) {
            return NextResponse.json({
                success: false,
                error: 'Invalid payment signature'
            }, { status: 400 })
        }

        // Verify subscription status 
        const subscription = await razorpay.subscriptions.fetch(razorpay_subscription_id)
        console.log(subscription)
        if (subscription.status === 'created') {
            return NextResponse.json({
                success: true,
                subscriptionId: razorpay_subscription_id,
                planId,
                planName,
                status: subscription.status,
            })
        } else {
            return NextResponse.json({
                success: false,
                error: `Subscription status: ${subscription.status}`,
            }, { status: 400 })
        }

    } catch (err) {
        console.error('Payment verification failed:', err)
        return NextResponse.json({
            success: false,
            error: 'Payment verification failed'
        }, { status: 400 })
    }
}
