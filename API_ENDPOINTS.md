# Subscription API Endpoints

## Overview
These API endpoints handle subscription creation, payment verification, and activation for the B24 Ventures mobile app, following the [Razorpay Subscriptions documentation](https://razorpay.com/docs/payments/subscriptions/create//#plan).

## Authentication
All endpoints require Firebase ID token authentication via the `Authorization: Bearer <token>` header.

## Workflow
According to Razorpay docs, the subscription workflow is:
1. **Create a Plan** (one-time setup)
2. **Create a Subscription** (for each customer)
3. **Handle payment verification**
4. **Activate subscription**

## Endpoints

### 1. Create Plans (One-time Setup)
**POST** `/api/create-plans`

Creates the Premium Monthly and Yearly plans in Razorpay.

**Response:**
```json
{
  "success": true,
  "plans": {
    "premium_monthly": {
      "id": "plan_xxxxxxxxxxxxx",
      "name": "Premium Monthly",
      "amount": 29900,
      "currency": "INR",
      "period": "monthly"
    },
    "premium_yearly": {
      "id": "plan_xxxxxxxxxxxxx", 
      "name": "Premium Yearly",
      "amount": 299900,
      "currency": "INR",
      "period": "yearly"
    }
  }
}
```

### 2. Create Subscription
**POST** `/api/create-subscription`

Creates a new subscription for the selected plan.

**Request Body:**
```json
{
  "planId": "premium_monthly" | "premium_yearly",
  "planName": "Premium Monthly" | "Premium Yearly"
}
```

**Response:**
```json
{
  "success": true,
  "subscriptionId": "sub_xxxxxxxxxxxxx",
  "status": "created",
  "planId": "premium_monthly",
  "planName": "Premium Monthly",
  "shortUrl": "https://rzp.io/i/xxxxxxxxx"
}
```

### 3. Verify Payment
**POST** `/api/verify-payment`

Verifies the payment signature and subscription status after Razorpay checkout.

**Request Body:**
```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx",
  "subscriptionId": "sub_xxx",
  "planId": "premium_monthly",
  "planName": "Premium Monthly"
}
```

**Response:**
```json
{
  "success": true,
  "subscriptionId": "sub_xxx",
  "planId": "premium_monthly",
  "planName": "Premium Monthly",
  "status": "active"
}
```

### 4. Activate Subscription
**POST** `/api/activate-subscription`

Activates the subscription and grants premium access to the user.

**Request Body:**
```json
{
  "subscriptionId": "sub_xxx",
  "planId": "premium_monthly",
  "planName": "Premium Monthly"
}
```

**Response:**
```json
{
  "success": true,
  "subscriptionId": "sub_xxx",
  "planId": "premium_monthly",
  "planName": "Premium Monthly",
  "status": "active",
  "activatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 5. Get Plans
**GET** `/api/get-plans`

Fetches all existing plans from Razorpay.

## Environment Variables Required

```env
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_PLAN_MONTHLY_ID=plan_xxxxxxxxxxxxx
RAZORPAY_PLAN_YEARLY_ID=plan_xxxxxxxxxxxxx
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
```

## Pricing Plans

- **Premium Monthly**: ₹299/month
- **Premium Yearly**: ₹2999/year (Save 16%)

## Setup Instructions

### Step 1: Create Plans
```bash
curl -X POST http://localhost:3000/api/create-plans
```

### Step 2: Update Environment Variables
Add the plan IDs from Step 1 to your `.env` file.

### Step 3: Test Subscription Creation
```bash
curl -X POST http://localhost:3000/api/create-subscription \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_FIREBASE_ID_TOKEN" \
  -d '{
    "planId": "premium_monthly",
    "planName": "Premium Monthly"
  }'
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200`: Success
- `400`: Bad Request (invalid payload or business logic error)
- `401`: Unauthorized (invalid or missing authentication token)
- `405`: Method Not Allowed
- `500`: Internal Server Error

## Trial Period Support

You can add trial periods by uncommenting the `start_at` parameter in the subscription creation. This creates a free trial period before billing starts.

## References
- [Razorpay Subscriptions Documentation](https://razorpay.com/docs/payments/subscriptions/create//#plan)
- [Plan Creation Guide](https://razorpay.com/docs/payments/subscriptions/create//#plan) 
 