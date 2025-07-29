import { z } from 'zod'

const envSchema = z.object({
    RAZORPAY_KEY_ID: z.string().min(1),
    RAZORPAY_KEY_SECRET: z.string().min(1),
    RAZORPAY_PLAN_PREMIUM_MONTHLY_ID: z.string().default('plan_Qyl9T7xkuJ95Qq'),
    RAZORPAY_PLAN_ALPHA_MONTHLY_ID: z.string().default('plan_Qyl9Ts3gGfETMl'),
    RAZORPAY_PLAN_PREMIUM_YEARLY_ID: z.string().default('plan_Qyl9Ue8OLQB6VA'),
    RAZORPAY_PLAN_ALPHA_YEARLY_ID: z.string().default('plan_Qyl9VCJPP40sfK'),
    FIREBASE_PROJECT_ID: z.string().min(1),
    FIREBASE_CLIENT_EMAIL: z.string().min(1),
    FIREBASE_PRIVATE_KEY: z.string().min(1),
})

export const env = envSchema.parse({
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    RAZORPAY_PLAN_PREMIUM_MONTHLY_ID: process.env.RAZORPAY_PLAN_PREMIUM_MONTHLY_ID || 'plan_Qyl9T7xkuJ95Qq',
    RAZORPAY_PLAN_ALPHA_MONTHLY_ID: process.env.RAZORPAY_PLAN_ALPHA_MONTHLY_ID || 'plan_Qyl9Ts3gGfETMl',
    RAZORPAY_PLAN_PREMIUM_YEARLY_ID: process.env.RAZORPAY_PLAN_PREMIUM_YEARLY_ID || 'plan_Qyl9Ue8OLQB6VA',
    RAZORPAY_PLAN_ALPHA_YEARLY_ID: process.env.RAZORPAY_PLAN_ALPHA_YEARLY_ID || 'plan_Qyl9VCJPP40sfK',
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
})
