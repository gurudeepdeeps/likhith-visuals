# Razorpay Integration Setup

## What You Get:
✅ Full Razorpay Checkout (cards, UPI, netbanking, wallets)  
✅ Netlify Function backend (serverless)  
✅ Order saved to Supabase after payment  
✅ Email + Telegram notifications  
✅ Redirects to order-success.html  

---

## Setup Steps:

### 1. Install Dependencies

In your project folder, run:

```bash
cd netlify/functions
npm install
```

This installs the Razorpay Node.js SDK.

---

### 2. Add Environment Variable in Netlify

1. Go to **Netlify Dashboard** → Your site → **Site settings** → **Environment variables**
2. Click **Add a variable**
3. Key: `RAZORPAY_KEY_SECRET`
4. Value: Your Razorpay secret key (starts with `rzp_live_` or `rzp_test_`)
5. Click **Save**

---

### 3. Deploy to Netlify

Commit & push your changes:

```bash
git add .
git commit -m "Add Razorpay Checkout integration"
git push
```

Netlify will auto-deploy and create the function endpoint at:
`https://yoursite.netlify.app/.netlify/functions/create-razorpay-order`

---

### 4. Test Locally (Optional)

Install Netlify CLI:

```bash
npm install -g netlify-cli
```

Run local dev server:

```bash
netlify dev
```

This will run your site at `http://localhost:8888` with working functions.

---

## How It Works:

1. Customer clicks **Check Out**
2. Frontend calls Netlify Function → creates Razorpay order
3. Razorpay Checkout modal opens
4. Customer pays (card/UPI/netbanking/wallet)
5. On success → order saved to Supabase
6. Email + Telegram sent
7. Redirect to order-success.html

---

## Files Created:

- `netlify/functions/create-razorpay-order.js` - Backend order creation
- `netlify/functions/package.json` - Razorpay SDK dependency
- `netlify.toml` - Netlify config

---

## Security:

✅ Secret key is in Netlify env vars (not in code)  
✅ Order creation happens server-side  
✅ Frontend never sees the secret  

---

## Testing:

Use Razorpay test mode:
- Test Key ID: `rzp_test_...`
- Test Secret: `...`
- Test cards: https://razorpay.com/docs/payments/payments/test-card-details/

Switch to live mode when ready (update key_id in script.js and secret in Netlify).

---

Ready! Deploy and test the checkout flow.
