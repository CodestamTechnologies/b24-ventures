import { NextRequest, NextResponse } from 'next/server'
import { razorpay } from '@/lib/razorpay'
import { CreateSubscriptionSchema } from '@/types/order'
import { verifyAuthToken } from '@/lib/auth'
import { env } from '@/lib/env'

// Plan configuration
const SUBSCRIPTION_PLANS = {
    premium_monthly: env.RAZORPAY_PLAN_PREMIUM_MONTHLY_ID,
    alpha_monthly: env.RAZORPAY_PLAN_ALPHA_MONTHLY_ID,
    premium_yearly: env.RAZORPAY_PLAN_PREMIUM_YEARLY_ID,
    alpha_yearly: env.RAZORPAY_PLAN_ALPHA_YEARLY_ID,
} as const

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
        const { planId, planName } = CreateSubscriptionSchema.parse(body)

        // Validate plan ID
        const razorpayPlanId = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS]
        if (!razorpayPlanId) {
            return NextResponse.json({
                error: 'Invalid plan ID',
                availablePlans: Object.keys(SUBSCRIPTION_PLANS)
            }, { status: 400 })
        }

        // Create subscription
        const subscription = await razorpay.subscriptions.create({
            plan_id: razorpayPlanId,
            customer_notify: 1,
            notes: {
                planName,
                userId: user.uid,
                planId,
            },
            total_count: planId.includes('monthly') ? 12 : 2,
        })

        return NextResponse.json({
            subscriptionId: subscription.id,
            status: subscription.status,
            planId,
            planName,
            shortUrl: subscription.short_url,
        })

    } catch (err) {
        console.error('Subscription creation failed:', err)
        return NextResponse.json({
            error: 'Subscription creation failed'
        }, { status: 400 })
    }
}
