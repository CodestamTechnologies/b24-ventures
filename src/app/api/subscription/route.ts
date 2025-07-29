import { NextRequest, NextResponse } from 'next/server'
import { verifyAuthToken } from '@/lib/auth'
import { getFirestore } from 'firebase-admin/firestore'

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
    }

    // Verify authentication
    const user = await verifyAuthToken(req)
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const db = getFirestore()
        const userRef = db.collection('users').doc(user.uid)
        const userDoc = await userRef.get()

        if (!userDoc.exists) {
            return NextResponse.json({
                success: false,
                error: 'User not found'
            }, { status: 404 })
        }

        const userData = userDoc.data()
        const subscriptionId = userData?.currentSubscriptionId

        if (!subscriptionId) {
            return NextResponse.json({
                success: true,
                subscription: {
                    isActive: false,
                    planId: null,
                    planName: null,
                    status: 'inactive'
                },
                paymentHistory: []
            })
        }

        // Get subscription details
        const subscriptionRef = db.collection('subscriptions').doc(subscriptionId)
        const subscriptionDoc = await subscriptionRef.get()

        if (!subscriptionDoc.exists) {
            return NextResponse.json({
                success: true,
                subscription: {
                    isActive: false,
                    planId: null,
                    planName: null,
                    status: 'inactive'
                },
                paymentHistory: []
            })
        }

        const subscriptionData = subscriptionDoc.data()

        // Check if subscription is still active
        const now = new Date()
        const expiresAt = subscriptionData?.expiresAt?.toDate()
        const isActive = subscriptionData?.isActive &&
            subscriptionData?.status === 'active' &&
            (!expiresAt || expiresAt > now)

        const subscription = {
            isActive,
            planId: subscriptionData?.planId,
            planName: subscriptionData?.planName,
            status: subscriptionData?.status,
            amount: subscriptionData?.amount,
            currency: subscriptionData?.currency,
            createdAt: subscriptionData?.createdAt?.toDate()?.toISOString(),
            expiresAt: subscriptionData?.expiresAt?.toDate()?.toISOString(),
            subscriptionId: subscriptionData?.subscriptionId
        }

        // Get payment history from user document
        const paymentHistory = userData?.paymentHistory || []

        // Get inactive subscriptions
        const inactiveSubscriptionsQuery = await db.collection('subscriptions')
            .where('userId', '==', user.uid)
            .where('isActive', '==', false)
            .orderBy('createdAt', 'desc')
            .limit(10)
            .get()

        const inactiveSubscriptions = inactiveSubscriptionsQuery.docs.map(doc => {
            const data = doc.data()
            return {
                subscriptionId: data.subscriptionId,
                planId: data.planId,
                planName: data.planName,
                status: data.status,
                amount: data.amount,
                currency: data.currency,
                createdAt: data.createdAt?.toDate()?.toISOString(),
                expiresAt: data.expiresAt?.toDate()?.toISOString(),
                deactivatedAt: data.dbUpdatedAt?.toDate()?.toISOString()
            }
        })

        return NextResponse.json({
            success: true,
            subscription,
            paymentHistory,
            inactiveSubscriptions
        })

    } catch (err) {
        console.error('Subscription status check failed:', err)
        return NextResponse.json({
            success: false,
            error: 'Failed to get subscription status'
        }, { status: 400 })
    }
} 
