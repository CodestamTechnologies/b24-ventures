import { NextRequest, NextResponse } from 'next/server'
import { razorpay } from '@/lib/razorpay'
import { ActivateSubscriptionSchema } from '@/types/order'
import { verifyAuthToken } from '@/lib/auth'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { adminAuth } from '@/lib/firebase-admin'
import { sendMail } from '@/lib/mail'

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
        console.log('🔵 Activate Subscription - Starting process for user:', user.uid)

        const body = await req.json()
        console.log('📥 Request body:', body)

        const { subscriptionId, planId, planName } = ActivateSubscriptionSchema.parse(body)
        console.log('✅ Parsed data:', { subscriptionId, planId, planName })

        // Verify subscription status
        console.log('🔍 Fetching subscription from Razorpay:', subscriptionId)
        const subscription = await razorpay.subscriptions.fetch(subscriptionId)
        console.log('📋 Razorpay subscription details:', subscription)
        console.log('🔍 Checking subscription status:', subscription.status)
        if (subscription.status !== 'active' && subscription.status !== 'authenticated') {
            console.log('❌ Subscription not active. Status:', subscription.status)
            return NextResponse.json({
                success: false,
                error: `Subscription is not active. Current status: ${subscription.status}`,
            }, { status: 400 })
        }
        console.log('✅ Subscription status verified:', subscription.status)

        // Update user subscription in database
        console.log('💾 Updating user subscription in database...')
        await updateUserSubscriptionInDatabase(user.uid, {
            subscriptionId,
            planId,
            planName,
            razorpaySubscription: subscription
        })
        console.log('✅ Database update completed')

        // Grant premium access
        console.log('🔐 Granting premium access...')
        await grantPremiumAccess(user.uid, planId, subscriptionId)
        console.log('✅ Premium access granted')

        // Save payment history
        console.log('💰 Saving payment history...')
        const paymentAmount = subscription.plan_id === 'plan_Qyl9T7xkuJ95Qq' ? 99 :
            subscription.plan_id === 'plan_Qyl9Ts3gGfETMl' ? 199 :
                subscription.plan_id === 'plan_Qyl9Ue8OLQB6VA' ? 1199 : 2399
        console.log('💵 Payment amount calculated:', paymentAmount)

        await savePaymentHistory(user.uid, {
            subscriptionId,
            paymentId: `payment_${Date.now()}`,
            planId,
            planName,
            amount: paymentAmount,
            status: subscription.status,
        })
        console.log('✅ Payment history saved')

        // Send welcome email
        console.log('📧 Sending welcome email to:', user.email)
        await sendWelcomeEmail(user.email, {
            planName,
            planId,
            subscriptionId
        })
        console.log('✅ Welcome email sent')

        console.log('🎉 Subscription activation completed successfully!')
        const response = {
            success: true,
            subscriptionId,
            planId,
            planName,
            status: subscription.status,
            activatedAt: new Date().toISOString(),
        }
        console.log('📤 Sending response:', response)
        return NextResponse.json(response)

    } catch (err) {
        console.error('❌ Subscription activation failed:', err)
        console.error('🔍 Error details:', {
            message: err instanceof Error ? err.message : 'Unknown error',
            stack: err instanceof Error ? err.stack : undefined,
            user: user.uid
        })
        return NextResponse.json({
            success: false,
            error: 'Subscription activation failed'
        }, { status: 400 })
    }
}

// Update user subscription in database
async function updateUserSubscriptionInDatabase(userId: string, data: {
    subscriptionId: string
    planId: string
    planName: string
    razorpaySubscription: {
        id: string
        plan_id: string
        status: string
        created_at: number
        end_at?: number
    }
}) {
    console.log('💾 updateUserSubscriptionInDatabase - Starting for user:', userId)
    console.log('📋 Data to update:', data)

    const db = getFirestore()

    const userRef = db.collection('users').doc(userId)
    const subscriptionRef = db.collection('subscriptions').doc(data.subscriptionId)

    // Calculate amount
    const amount = data.razorpaySubscription.plan_id === 'plan_Qyl9T7xkuJ95Qq' ? 99 :
        data.razorpaySubscription.plan_id === 'plan_Qyl9Ts3gGfETMl' ? 199 :
            data.razorpaySubscription.plan_id === 'plan_Qyl9Ue8OLQB6VA' ? 1199 : 2399
    console.log('💵 Calculated amount:', amount)

    // Update user document
    console.log('👤 Updating user document...')
    await userRef.update({
        subscriptionStatus: 'active',
        currentPlan: data.planId,
        currentSubscriptionId: data.subscriptionId,
        isPremium: true,
        updatedAt: new Date()
    })
    console.log('✅ User document updated')

    // Store subscription details
    console.log('📄 Creating subscription document...')
    await subscriptionRef.set({
        userId,
        subscriptionId: data.subscriptionId,
        planId: data.planId,
        planName: data.planName,
        status: data.razorpaySubscription.status,
        amount: amount,
        currency: 'INR',
        createdAt: new Date(data.razorpaySubscription.created_at * 1000),
        expiresAt: data.razorpaySubscription.end_at ? new Date(data.razorpaySubscription.end_at * 1000) : null,
        isActive: true,
        dbCreatedAt: new Date(),
        dbUpdatedAt: new Date()
    })
    console.log('✅ Subscription document created')

    console.log(`✅ Updated subscription in database for user ${userId}`)
}

// Grant premium access
async function grantPremiumAccess(userId: string, planId: string, subscriptionId: string) {
    console.log('🔐 grantPremiumAccess - Starting for user:', userId)
    console.log('📋 Claims data:', { planId, subscriptionId })

    // Set custom claims for premium access
    await adminAuth.setCustomUserClaims(userId, {
        subscriptionStatus: 'active',
        currentPlan: planId,
        subscriptionId: subscriptionId,
        isPremium: true,
        updatedAt: new Date().toISOString()
    })

    console.log(`✅ Granted premium access for user ${userId} with plan ${planId}`)
}

// Send welcome email
async function sendWelcomeEmail(email: string | undefined, data: {
    planName: string
    planId: string
    subscriptionId: string
}) {
    console.log('📧 sendWelcomeEmail - Starting')
    console.log('📋 Email data:', { email, data })

    if (!email) {
        console.log('❌ No email provided for welcome email')
        return
    }

    try {
        console.log('📤 Sending email to:', email)
        await sendMail({
            to: email,
            subject: `Welcome to ${data.planName}!`,
            text: `Welcome to ${data.planName}! Your subscription has been activated successfully. Subscription ID: ${data.subscriptionId}`,
            html: `
                <h2>Welcome to ${data.planName}!</h2>
                <p>Your subscription has been activated successfully.</p>
                <p><strong>Subscription ID:</strong> ${data.subscriptionId}</p>
                <p>Thank you for choosing B24 Ventures!</p>
            `
        })

        console.log(`✅ Welcome email sent to ${email} for ${data.planName}`)
    } catch (error) {
        console.error('❌ Failed to send welcome email:', error)
        console.error('🔍 Email error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            email,
            data
        })
    }
}

// Save payment history
async function savePaymentHistory(userId: string, data: {
    subscriptionId: string
    paymentId: string
    planId: string
    planName: string
    amount: number
    status: string
}) {
    console.log('💰 savePaymentHistory - Starting for user:', userId)
    console.log('📋 Payment data:', data)

    const db = getFirestore()

    // Save payment record
    console.log('💳 Creating payment document...')
    const paymentRef = db.collection('payments').doc(data.paymentId)
    await paymentRef.set({
        userId,
        subscriptionId: data.subscriptionId,
        paymentId: data.paymentId,
        planId: data.planId,
        planName: data.planName,
        amount: data.amount,
        currency: 'INR',
        status: data.status,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    console.log('✅ Payment document created')

    // Update user's payment history
    console.log('👤 Updating user payment history...')
    const userRef = db.collection('users').doc(userId)
    await userRef.update({
        paymentHistory: FieldValue.arrayUnion({
            paymentId: data.paymentId,
            subscriptionId: data.subscriptionId,
            planId: data.planId,
            planName: data.planName,
            amount: data.amount,
            status: data.status,
            createdAt: new Date()
        }),
        updatedAt: new Date()
    })
    console.log('✅ User payment history updated')

    console.log(`✅ Payment history saved for user ${userId}`)
}
