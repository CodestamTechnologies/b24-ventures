import { z } from 'zod'

// Subscription creation schema
export const CreateSubscriptionSchema = z.object({
    planId: z.enum(['premium_monthly', 'alpha_monthly', 'premium_yearly', 'alpha_yearly']),
    planName: z.string().min(1),
})

// Payment verification schema for subscriptions
export const VerifyPaymentSchema = z.object({
    razorpay_payment_id: z.string(),
    razorpay_signature: z.string(),
    razorpay_subscription_id: z.string(), // For subscription-based payments
    planId: z.string(),
    planName: z.string(),
})

// Subscription activation schema
export const ActivateSubscriptionSchema = z.object({
    subscriptionId: z.string(),
    planId: z.string(),
    planName: z.string(),
})

// Cancel subscription schema (only requires access token)
export const CancelSubscriptionSchema = z.object({})

// TypeScript types
export type CreateSubscriptionRequest = z.infer<typeof CreateSubscriptionSchema>
export type VerifyPaymentRequest = z.infer<typeof VerifyPaymentSchema>
export type ActivateSubscriptionRequest = z.infer<typeof ActivateSubscriptionSchema>
export type CancelSubscriptionRequest = z.infer<typeof CancelSubscriptionSchema>
