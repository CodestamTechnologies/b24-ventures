# 🚀 Razorpay Subscription API Documentation

Production-grade subscription system for B24 Ventures with Razorpay integration.

## 📋 Table of Contents

- [Overview](#overview)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Subscription Plans](#subscription-plans)
- [Integration Guide](#integration-guide)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Production Checklist](#production-checklist)

## 🎯 Overview

This API provides a complete subscription management system using Razorpay's subscription API. It handles subscription creation, payment verification, and activation with proper authentication and error handling.

### **Key Features:**
- ✅ Firebase authentication
- ✅ Razorpay subscription integration
- ✅ Payment signature verification
- ✅ Comprehensive error handling
- ✅ Type-safe API with Zod validation
- ✅ Production-ready security

## 🔌 API Endpoints

### **1. Create Subscription**
Creates a new subscription for the authenticated user.

```http
POST /api/order
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <firebase_id_token>
```

**Request Body:**
```json
{
  "planId": "premium_monthly",
  "planName": "Premium Monthly"
}
```

**Response:**
```json
{
  "subscriptionId": "sub_xxxxxxxxxxxxx",
  "status": "created",
  "planId": "premium_monthly",
  "planName": "Premium Monthly",
  "shortUrl": "https://rzp.io/i/xxxxxxxxx"
}
```

### **2. Verify Payment**
Verifies payment signature and subscription status for subscription-based payments.

```http
POST /api/verify-payment
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <firebase_id_token>
```

**Request Body:**
```json
{
  "razorpay_payment_id": "pay_xxxxxxxxxxxxx",
  "razorpay_signature": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "razorpay_subscription_id": "sub_xxxxxxxxxxxxx",
  "planId": "premium_monthly",
  "planName": "Premium Monthly"
}
```

**Response:**
```json
{
  "success": true,
  "subscriptionId": "sub_xxxxxxxxxxxxx",
  "planId": "premium_monthly",
  "planName": "Premium Monthly",
  "status": "active"
}
```

### **3. Activate Subscription**
Activates the subscription and grants premium access with comprehensive user management.

```http
POST /api/activate-subscription
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <firebase_id_token>
```

**Request Body:**
```json
{
  "subscriptionId": "sub_xxxxxxxxxxxxx",
  "planId": "premium_monthly",
  "planName": "Premium Monthly"
}
```

**Response:**
```json
{
  "success": true,
  "subscriptionId": "sub_xxxxxxxxxxxxx",
  "planId": "premium_monthly",
  "planName": "Premium Monthly",
  "status": "active",
  "activatedAt": "2024-01-01T00:00:00.000Z",
  "expiresAt": "2025-01-01T00:00:00.000Z",
  "features": [
    "Exclusive Market Insights",
    "Dealflow Hotspots & Sector Analysis",
    "Investment Theses & Expert Reports",
    "Downloadable Mini Reports",
    "Emerging Microtrends",
    "Early Access to New Features",
    "Priority Customer Support",
    "Unlimited Article Access"
  ],
  "message": "Welcome to Premium Monthly! Your subscription has been activated successfully."
}
```

**Features:**
- ✅ Verifies subscription status with Razorpay
- ✅ Calculates expiry date based on plan type
- ✅ Returns plan-specific features
- ✅ Real subscription activation
- ✅ Working payment verification
- ✅ Complete user management flow

## 🔐 Authentication

All endpoints require Firebase authentication via Bearer token.

**How to get Firebase ID token:**
```javascript
// React Native
const idToken = await user.getIdToken();

// Web
const idToken = await auth.currentUser?.getIdToken();
```

## 💰 Subscription Plans

| Plan ID | Name | Price | Duration | Razorpay Plan ID |
|---------|------|-------|----------|------------------|
| `premium_monthly` | Premium Monthly | ₹99/month | 12 months | `plan_Qyl9T7xkuJ95Qq` |
| `alpha_monthly` | Alpha Monthly | ₹199/month | 12 months | `plan_Qyl9Ts3gGfETMl` |
| `premium_yearly` | Premium Yearly | ₹1199/year | 1 year | `plan_Qyl9Ue8OLQB6VA` |
| `alpha_yearly` | Alpha Yearly | ₹2399/year | 1 year | `plan_Qyl9VCJPP40sfK` |

## 📱 Integration Guide

### **React Native Integration**

```javascript
import RazorpayCheckout from 'react-native-razorpay';

const handleSubscription = async () => {
  try {
    // 1. Get Firebase ID token
    const idToken = await user.getIdToken();
    
    // 2. Create subscription
    const subscriptionRes = await fetch('https://your-api.com/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({
        planId: 'premium_monthly',
        planName: 'Premium Monthly'
      }),
    });
    
    const subscription = await subscriptionRes.json();
    
    // 3. Launch Razorpay checkout
    const options = {
      description: 'B24 Premium Monthly',
      image: 'https://your-logo.com/logo.png',
      currency: 'INR',
      key: 'rzp_live_YOUR_KEY', // Use live key in production
      subscription_id: subscription.subscriptionId,
      name: 'B24 Ventures',
      prefill: {
        email: user.email,
        name: user.displayName,
      },
      theme: { color: '#6F1E14' },
    };
    
    const data = await RazorpayCheckout.open(options);
    
    // 4. Verify payment (subscription-based)
    const verifyRes = await fetch('https://your-api.com/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_signature: data.razorpay_signature,
        razorpay_subscription_id: data.razorpay_subscription_id,
        planId: 'premium_monthly',
        planName: 'Premium Monthly'
      }),
    });
    
    const verifyResult = await verifyRes.json();
    
    if (verifyResult.success) {
      // 5. Activate subscription
      const activateRes = await fetch('https://your-api.com/api/activate-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          subscriptionId: data.razorpay_subscription_id,
          planId: 'premium_monthly',
          planName: 'Premium Monthly'
        }),
      });
      
      const activateResult = await activateRes.json();
      
      if (activateResult.success) {
        // Subscription activated successfully
        console.log('Subscription activated!');
      }
    }
    
  } catch (error) {
    console.error('Subscription failed:', error);
  }
};
```

### **Web Integration**

```

```
