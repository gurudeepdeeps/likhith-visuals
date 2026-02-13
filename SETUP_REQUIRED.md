# ⚠️ IMPORTANT: Complete Setup Steps

## You Need to Complete These Steps:

### ✅ Step 1: Update Supabase Database (REQUIRED)

1. Go to your Supabase project: https://ulzixsrxslzniivfaqih.supabase.co
2. Click **SQL Editor** in the left sidebar
3. Click **New query**
4. Copy and paste the entire content from **SUPABASE_UPDATE.sql**
5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success" messages

**This adds:**
- Razorpay payment fields to orders table (razorpay_order_id, razorpay_payment_id, razorpay_signature)
- old_price column to products table (for showing discount prices)

---

### ✅ Step 2: Deploy to Netlify

**Make sure you've already done this:**

1. Install dependencies:
   ```bash
   cd netlify/functions
   npm install
   ```

2. Add environment variable in Netlify:
   - Go to Netlify Dashboard → Site settings → Environment variables
   - Add variable: `RAZORPAY_KEY_SECRET` = `your_razorpay_secret_key`

3. Push to GitHub:
   ```bash
   git add .
   git commit -m "Fix Razorpay integration"
   git push
   ```

---

### ✅ Step 3: Test the Complete Flow

1. **Open your site** (not localhost, use the actual Netlify URL)
2. **Add products to cart**
3. **Fill checkout details** (name, email, phone)
4. **Click "Check Out"**
5. **Check browser console** (F12 → Console tab) - you should see:
   ```
   Payment successful!
   Order created: {...}
   Saved to localStorage
   Saving to Supabase...
   Order saved to Supabase successfully
   Sending email to customer...
   Sending email to admin...
   Sending Telegram notification...
   Telegram notification sent successfully
   Redirecting to success page...
   ```

6. **Complete Razorpay payment** (use test card or UPI)
7. **Wait for redirect** to order-success.html
8. **Check your email** (customer receipt)
9. **Check admin email** (likhithlikhith278@gmail.com)
10. **Check Telegram** (should receive notification)

---

## Troubleshooting:

### Problem: "Failed to create Razorpay order"
**Solution:** 
- Check that you've deployed to Netlify (not localhost)
- Verify `RAZORPAY_KEY_SECRET` is set in Netlify env vars
- Check Netlify function logs for errors

### Problem: Not redirecting to success page
**Solution:**
- Open browser console (F12) and check for errors
- Make sure order-success.html exists
- Check if there are any JavaScript errors blocking execution

### Problem: No email received
**Solution:**
- Check browser console for "Email send failed" errors
- Verify EmailJS is configured (should see "Email sent successfully" in console)
- Check spam folder
- Verify EmailJS templates exist and are published

### Problem: No Telegram message
**Solution:**
- Check console for "Telegram notification sent successfully"
- Verify TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in script.js
- Test manually: Send a message to your bot on Telegram first

### Problem: Order not in Supabase
**Solution:**
- Check console for "Order saved to Supabase successfully"
- Verify you ran the SQL update (SUPABASE_UPDATE.sql)
- Check Supabase logs for errors
- Verify Supabase credentials in script.js

### Problem: Old price not showing for products
**Solution:**
- Make sure you ran SUPABASE_UPDATE.sql (adds old_price column)
- In admin panel, edit a product and set "Old Price (Rs.)"
- Save and refresh the storefront

---

## What Was Fixed:

### 1. ✅ Supabase Orders Table
- **Added:** razorpay_order_id, razorpay_payment_id, razorpay_signature fields
- **Updated:** saveOrderToSupabase() to save Razorpay payment details
- **Updated:** loadOrdersFromSupabase() to load Razorpay fields

### 2. ✅ Products Old Price
- **Added:** old_price column to products table
- **Updated:** saveProductToSupabase() to save old_price
- **Updated:** loadProductsFromSupabase() to map old_price → oldPrice
- **Frontend:** Admin panel already has "Old Price" field

### 3. ✅ Success Page Redirect
- **Added:** setTimeout() with 500ms delay to ensure all async operations complete
- **Added:** Console logging at each step
- **Added:** Error handling with user-friendly message

### 4. ✅ Email Notifications
- **Verified:** sendOrderEmail() and sendAdminNotification() are called in payment handler
- **Added:** Console logging to track email sending
- **Verified:** EmailJS initialization in script.js

### 5. ✅ Telegram Notifications
- **Verified:** sendTelegramNotification() is called and awaited
- **Added:** Console logging to confirm Telegram message sent
- **Verified:** Plain text message format (no Markdown parsing errors)

---

## Next Steps:

1. **Run SUPABASE_UPDATE.sql** in your Supabase project (this is critical!)
2. **Deploy to Netlify** (push your changes)
3. **Test a complete order** on your live site
4. **Check all notifications** (console, email, Telegram)
5. **Verify order appears** in Supabase and admin panel

---

## Live Testing Checklist:

- [ ] Ran SUPABASE_UPDATE.sql in Supabase
- [ ] Deployed to Netlify with RAZORPAY_KEY_SECRET env var
- [ ] Tested checkout flow on live site (not localhost)
- [ ] Razorpay modal opens correctly
- [ ] Payment completes successfully
- [ ] Redirects to order-success.html
- [ ] Customer email received
- [ ] Admin email received
- [ ] Telegram notification received
- [ ] Order appears in Supabase database
- [ ] Order appears in admin panel
- [ ] Old prices display correctly for products

---

If you're still having issues after following all these steps, share:
1. Browser console logs (F12 → Console)
2. Netlify function logs
3. Screenshots of any errors

I'll help you debug further!
