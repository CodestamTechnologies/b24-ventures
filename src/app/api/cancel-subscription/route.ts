import { NextRequest, NextResponse } from 'next/server'
import { razorpay } from '@/lib/razorpay'
import { CancelSubscriptionSchema } from '@/types/order'
import { verifyAuthToken } from '@/lib/auth'
import { getFirestore } from 'firebase-admin/firestore'
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
        console.log('🔴 Cancel Subscription - Starting process for user:', user.uid)

        const body = await req.json()
        console.log('📥 Request body:', body)

        // Validate request body (empty object since we only need the token)
        const { } = CancelSubscriptionSchema.parse(body)
        console.log('✅ Request validated')

        // Get user's current subscription from database
        console.log('🔍 Fetching user subscription from database...')
        const userSubscription = await getUserSubscription(user.uid)

        if (!userSubscription) {
            console.log('❌ No active subscription found for user')
            return NextResponse.json({
                success: false,
                error: 'No active subscription found'
            }, { status: 404 })
        }

        console.log('📋 User subscription details:', userSubscription)

        // Cancel subscription in Razorpay
        console.log('🔄 Canceling subscription in Razorpay:', userSubscription.subscriptionId)
        const canceledSubscription = await razorpay.subscriptions.cancel(userSubscription.subscriptionId)
        console.log('✅ Razorpay subscription canceled:', canceledSubscription)

        // Update database
        console.log('💾 Updating database...')
        await updateSubscriptionInDatabase(user.uid, userSubscription.subscriptionId, 'cancelled')
        console.log('✅ Database updated')

        // Remove premium access
        console.log('🔐 Removing premium access...')
        await removePremiumAccess(user.uid)
        console.log('✅ Premium access removed')

        // Send cancellation email
        console.log('📧 Sending cancellation email to:', user.email)
        await sendCancellationEmail(user.email, {
            planName: userSubscription.planName,
            subscriptionId: userSubscription.subscriptionId,
            cancelAt: canceledSubscription.end_at ? new Date(canceledSubscription.end_at * 1000) : null
        })
        console.log('✅ Cancellation email sent')

        console.log('🎉 Subscription cancellation completed successfully!')
        const response = {
            success: true,
            subscriptionId: userSubscription.subscriptionId,
            planName: userSubscription.planName,
            status: 'cancelled',
            cancelAt: canceledSubscription.end_at ? new Date(canceledSubscription.end_at * 1000).toISOString() : null,
            cancelledAt: new Date().toISOString(),
        }
        console.log('📤 Sending response:', response)
        return NextResponse.json(response)

    } catch (err) {
        console.error('❌ Subscription cancellation failed:', err)
        console.error('🔍 Error details:', {
            message: err instanceof Error ? err.message : 'Unknown error',
            stack: err instanceof Error ? err.stack : undefined,
            user: user.uid
        })
        return NextResponse.json({
            success: false,
            error: 'Subscription cancellation failed'
        }, { status: 400 })
    }
}

// Get user's current subscription from database
async function getUserSubscription(userId: string) {
    console.log('🔍 getUserSubscription - Starting for user:', userId)

    const db = getFirestore()
    const userRef = db.collection('users').doc(userId)

    try {
        const userDoc = await userRef.get()

        if (!userDoc.exists) {
            console.log('❌ User document not found')
            return null
        }

        const userData = userDoc.data()
        console.log('👤 User data:', userData)

        if (!userData?.currentSubscriptionId || userData?.subscriptionStatus !== 'active') {
            console.log('❌ No active subscription found')
            return null
        }

        // Get subscription details
        const subscriptionRef = db.collection('subscriptions').doc(userData.currentSubscriptionId)
        const subscriptionDoc = await subscriptionRef.get()

        if (!subscriptionDoc.exists) {
            console.log('❌ Subscription document not found')
            return null
        }

        const subscriptionData = subscriptionDoc.data()
        console.log('📋 Subscription data:', subscriptionData)

        return {
            subscriptionId: userData.currentSubscriptionId,
            planId: userData.currentPlan,
            planName: subscriptionData?.planName || 'Unknown Plan',
            status: subscriptionData?.status || 'unknown'
        }

    } catch (error) {
        console.error('❌ Error fetching user subscription:', error)
        throw error
    }
}

// Update subscription in database
async function updateSubscriptionInDatabase(userId: string, subscriptionId: string, status: string) {
    console.log('💾 updateSubscriptionInDatabase - Starting for user:', userId)
    console.log('📋 Update data:', { subscriptionId, status })

    const db = getFirestore()

    const userRef = db.collection('users').doc(userId)
    const subscriptionRef = db.collection('subscriptions').doc(subscriptionId)

    // Update user document
    console.log('👤 Updating user document...')
    await userRef.update({
        subscriptionStatus: status,
        isPremium: false,
        updatedAt: new Date()
    })
    console.log('✅ User document updated')

    // Update subscription document
    console.log('📄 Updating subscription document...')
    await subscriptionRef.update({
        status: status,
        isActive: false,
        cancelledAt: new Date(),
        dbUpdatedAt: new Date()
    })
    console.log('✅ Subscription document updated')

    console.log(`✅ Updated subscription status in database for user ${userId}`)
}

// Remove premium access
async function removePremiumAccess(userId: string) {
    console.log('🔐 removePremiumAccess - Starting for user:', userId)

    // Remove custom claims for premium access
    await adminAuth.setCustomUserClaims(userId, {
        subscriptionStatus: 'cancelled',
        isPremium: false,
        updatedAt: new Date().toISOString()
    })

    console.log(`✅ Removed premium access for user ${userId}`)
}

// Send cancellation email
async function sendCancellationEmail(email: string | undefined, data: {
    planName: string
    subscriptionId: string
    cancelAt: Date | null
}) {
    console.log('📧 sendCancellationEmail - Starting')
    console.log('📋 Email data:', { email, data })

    if (!email) {
        console.log('❌ No email provided for cancellation email')
        return
    }

    try {
        const cancelDate = data.cancelAt ? data.cancelAt.toLocaleDateString() : 'end of current billing cycle'

        console.log('📤 Sending cancellation email to:', email)
        await sendMail({
            to: email,
            subject: `Subscription Cancelled - ${data.planName}`,
            text: `Your ${data.planName} subscription has been cancelled successfully. Your subscription will remain active until ${cancelDate}. Subscription ID: ${data.subscriptionId}`,
            html: `
                <h2>Subscription Cancelled</h2>
                <p>Your <strong>${data.planName}</strong> subscription has been cancelled successfully.</p>
                <p>Your subscription will remain active until <strong>${cancelDate}</strong>.</p>
                <p><strong>Subscription ID:</strong> ${data.subscriptionId}</p>
                <p>Thank you for being a part of B24 Ventures!</p>
                <p>If you change your mind, you can reactivate your subscription anytime.</p>
            `
        })

        console.log(`✅ Cancellation email sent to ${email} for ${data.planName}`)
    } catch (error) {
        console.error('❌ Failed to send cancellation email:', error)
        console.error('🔍 Email error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            email,
            data
        })
    }
} 
