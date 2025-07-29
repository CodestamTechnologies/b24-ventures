# 🔧 Environment Setup Guide

Quick setup guide for the Razorpay subscription API.

## 📋 Required Environment Variables

Create a `.env.local` file in your project root:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_HVOg3EoYDDmNBl
RAZORPAY_KEY_SECRET=your_razorpay_secret_key

# Subscription Plan IDs
RAZORPAY_PLAN_PREMIUM_MONTHLY_ID=plan_Qyl9T7xkuJ95Qq
RAZORPAY_PLAN_ALPHA_MONTHLY_ID=plan_Qyl9Ts3gGfETMl
RAZORPAY_PLAN_PREMIUM_YEARLY_ID=plan_Qyl9Ue8OLQB6VA
RAZORPAY_PLAN_ALPHA_YEARLY_ID=plan_Qyl9VCJPP40sfK

# Firebase Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email@project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
```

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables** (see above)

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Test the API:**
   ```bash
   curl -X POST http://localhost:3000/api/order \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_FIREBASE_ID_TOKEN" \
     -d '{"planId": "premium_monthly", "planName": "Premium Monthly"}'
   ```

## 🔑 Getting Firebase Service Account

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > Service Accounts
4. Click "Generate new private key"
5. Download the JSON file
6. Extract the values for environment variables

## 💳 Getting Razorpay Keys

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Navigate to Settings > API Keys
3. Generate new API key pair
4. Copy Key ID and Key Secret

## 🧪 Testing

Use these test cards:
- **Success**: `4111 1111 1111 1111`
- **Failure**: `4000 0000 0000 0002`

## 🚀 Production Deployment

1. **Update to live keys:**
   ```env
   RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY
   RAZORPAY_KEY_SECRET=YOUR_LIVE_SECRET
   ```

2. **Deploy to your hosting platform**

3. **Update React Native app URL** to production domain

## ✅ Verification

Test all endpoints work:
- ✅ `/api/order` - Creates subscription
- ✅ `/api/verify-payment` - Verifies payment
- ✅ `/api/activate-subscription` - Activates subscription

---

**Need help?** Check the main documentation: `RAZORPAY_API_DOCUMENTATION.md` 
