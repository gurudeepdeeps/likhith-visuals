# Admin Panel & Backend Setup Guide

## 🎉 What's Been Added

### 1. Google Sheets Backend
- All orders are automatically sent to Google Sheets
- Centralized order tracking across all customers
- No more relying on browser localStorage

### 2. Admin Email Notifications
- You receive an email instantly when a customer places an order
- Includes customer details, UTR number, items, and amount

### 3. Admin Dashboard
- Access: `admin.html`
- Features:
  - View all orders with UTR numbers
  - Order statistics (total, pending, revenue)
  - Export orders as CSV
  - Complete product management (add, edit, delete)
  - Product image and details editing

---

## 📋 Setup Instructions

### Step 1: Update Admin Settings

Open [script.js](script.js) and update these values:

```javascript
// Line 8-16
const EMAILJS_ADMIN_TEMPLATE_ID = "template_admin_notify"; // Create this template
const GOOGLE_SHEETS_API_KEY = "YOUR_GOOGLE_SHEETS_API_KEY"; // Get from Google Cloud
const GOOGLE_SHEETS_SPREADSHEET_ID = "YOUR_SPREADSHEET_ID"; // From your sheet URL
const ADMIN_EMAIL = "your-email@gmail.com"; // Your admin email
const ADMIN_PASSWORD = "your-secure-password"; // Change this!
```

---

### Step 2: Set Up Google Sheets

#### A. Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Likhith Visuals Orders"
3. In the first row, add these headers:
   ```
   Order ID | Date | Customer Name | Email | Phone | UTR | Amount | Status | Method | Items | Discount
   ```
4. Copy the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
   ```

#### B. Get Google Sheets API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google Sheets API**:
   - Go to "APIs & Services" > "Enable APIs and Services"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create API Key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key
5. Restrict the API key (recommended):
   - Click on the key to edit
   - Under "API restrictions", select "Restrict key"
   - Choose "Google Sheets API"
   - Under "Website restrictions", add your domain

#### C. Share Your Sheet
1. Click "Share" on your Google Sheet
2. Change "Restricted" to "Anyone with the link can view"
3. Or add your Google Cloud project service account email (if using)

---

### Step 3: Create Admin Email Template in EmailJS

#### A. Create New Template
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin/templates)
2. Click "Create New Template"
3. Template ID: `template_admin_notify`

#### B. Email Template HTML
Use this template:

**Subject:** New Order {{order_id}} - {{customer_name}}

**Content:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="background: #000; color: #fff; padding: 16px; margin: 0;">New Order Received</h2>
  
  <div style="padding: 20px; background: #f9f9f9;">
    <h3>Order Details</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px; font-weight: bold;">Order ID:</td>
        <td style="padding: 8px;">{{order_id}}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Transaction ID (UTR):</td>
        <td style="padding: 8px;">{{transaction_id}}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Date:</td>
        <td style="padding: 8px;">{{order_date}}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Amount:</td>
        <td style="padding: 8px;">{{order_total}}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Status:</td>
        <td style="padding: 8px;">{{payment_status}}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Method:</td>
        <td style="padding: 8px;">{{payment_method}}</td>
      </tr>
    </table>

    <h3>Customer Details</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px; font-weight: bold;">Name:</td>
        <td style="padding: 8px;">{{customer_name}}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Email:</td>
        <td style="padding: 8px;">{{customer_email}}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Phone:</td>
        <td style="padding: 8px;">{{customer_phone}}</td>
      </tr>
    </table>

    <h3>Items Ordered</h3>
    <pre style="background: #fff; padding: 12px; border-radius: 4px;">{{order_items}}</pre>

    <p style="margin-top: 20px; padding: 12px; background: #fff3cd; border-left: 4px solid #856404; border-radius: 4px;">
      <strong>Action Required:</strong> Verify the UTR number in your bank account and process the order.
    </p>
  </div>
</div>
```

#### C. Template Variables
Make sure these variables are in your template:
- `to_email` (To Email field: `{{to_email}}`)
- `order_id`
- `transaction_id`
- `customer_name`
- `customer_email`
- `customer_phone`
- `order_items`
- `order_total`
- `payment_status`
- `payment_method`
- `order_date`

---

### Step 4: Update Customer Email Template

In your existing customer template (`template_vqs92b6`), add the transaction ID:

```html
<tr>
  <td style="padding: 8px; font-weight: bold;">Transaction ID:</td>
  <td style="padding: 8px;">{{transaction_id}}</td>
</tr>
```

---

## 🔐 Admin Panel Access

### Login Details
- URL: `https://yourwebsite.com/admin.html`
- Password: The one you set in `ADMIN_PASSWORD` (default: `admin123`)

**⚠️ IMPORTANT:** Change the default password before going live!

### Features

#### 1. Orders Tab
- View all orders in a table
- See UTR numbers, customer details, amounts
- Filter by status (pending/paid)
- Export all orders as CSV
- Real-time statistics

#### 2. Products Tab
- Add new products with images
- Edit existing products
- Delete products
- Update prices, descriptions, features
- All changes sync automatically to the website

---

## 🧪 Testing

### Test Order Flow
1. Go to your website
2. Add items to cart
3. Fill in checkout details
4. Complete UPI payment with test UTR: `TEST123456789`
5. Check:
   - Google Sheets (new row added)
   - Your email (admin notification)
   - Admin panel orders tab

### Test Product Management
1. Go to `admin.html`
2. Login with your password
3. Click "Products" tab
4. Click "Add Product"
5. Fill in details and save
6. Refresh your website - new product appears!

---

## 📊 Google Sheets Structure

Your sheet will automatically populate with:
| Order ID | Date | Customer Name | Email | Phone | UTR | Amount | Status | Method | Items | Discount |
|----------|------|---------------|-------|-------|-----|--------|--------|--------|-------|----------|

---

## 🚨 Troubleshooting

### Orders Not Appearing in Google Sheets
1. Check API key is valid
2. Verify spreadsheet ID is correct
3. Check sheet name is "Orders" (or update `GOOGLE_SHEETS_RANGE`)
4. Ensure sheet is shared with "Anyone with link"
5. Check browser console for errors

### Admin Email Not Received
1. Verify `ADMIN_EMAIL` is correct
2. Check EmailJS template ID matches
3. Verify template variables are correct
4. Check spam folder

### Can't Login to Admin
1. Check password in script.js
2. Clear browser cache
3. Check browser console for errors

### Products Not Saving
1. Check browser console for errors
2. Clear localStorage and try again
3. Verify all required fields are filled

---

## 🔒 Security Notes

1. **Change the admin password** immediately
2. **Secure your API keys** - use environment variables for production
3. **Restrict Google Sheets API key** to your domain only
4. **Enable HTTPS** for your website
5. Consider adding:
   - Rate limiting on order submissions
   - CAPTCHA on checkout
   - Backend verification of UTR numbers

---

## 📈 Next Steps (Optional)

1. Add order status updates (pending → verified → completed)
2. Add automated UTR verification via bank APIs
3. Add order fulfillment tracking
4. Add customer accounts and order history
5. Add analytics dashboard
6. Integrate WhatsApp notifications
7. Add inventory management

---

## 💡 Tips

- **Backup your Google Sheet** regularly
- **Export orders CSV** weekly for records
- **Monitor pending orders** daily to verify payments
- **Test with small amounts** before going live
- **Keep EmailJS quota** in mind (200 emails/month on free plan)

---

## 📞 Support

If you need help:
1. Check browser console for errors (F12)
2. Verify all API keys are correct
3. Test each feature individually
4. Check EmailJS and Google Cloud console logs

---

**All set!** Your admin panel and backend are ready. Update the configuration values and start receiving orders! 🚀
