# Email + Telegram Notification Setup

## ✅ What You'll Get
- **Email Notifications** - Receive detailed order info in your inbox (likhithlikhith278@gmail.com)
- **Telegram Notifications** - Instant mobile alerts with order details
- **Admin Panel** - Already working, view all orders anytime at admin.html

---

## 📧 Part 1: Email Setup (5 minutes)

You already have EmailJS configured! Just need to create one template:

### Step 1: Create Admin Email Template

1. Go to https://dashboard.emailjs.com/admin/templates
2. Click **"Create New Template"**
3. Fill in these details:

**Template ID:** `template_admin_notify`

**Template Name:** Admin Order Notification

**Subject:** 
```
New Order {{order_id}} - {{order_total}}
```

**Content (HTML):**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
  <div style="background: #000; color: #fff; padding: 20px; text-align: center;">
    <h1 style="margin: 0;">🛒 New Order Received</h1>
  </div>
  
  <div style="background: #fff; padding: 30px; margin-top: 20px; border-radius: 8px;">
    <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">Order Details</h2>
    
    <table style="width: 100%; margin: 20px 0;">
      <tr>
        <td style="padding: 10px 0; font-weight: bold; color: #666;">Order ID:</td>
        <td style="padding: 10px 0; color: #000;">{{order_id}}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; font-weight: bold; color: #666;">UTR Number:</td>
        <td style="padding: 10px 0; color: #000; font-family: monospace; background: #f0f0f0; padding: 5px;">{{transaction_id}}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; font-weight: bold; color: #666;">Date:</td>
        <td style="padding: 10px 0; color: #000;">{{order_date}}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; font-weight: bold; color: #666;">Amount:</td>
        <td style="padding: 10px 0; color: #28a745; font-size: 18px; font-weight: bold;">{{order_total}}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; font-weight: bold; color: #666;">Status:</td>
        <td style="padding: 10px 0;"><span style="background: #ffc107; padding: 5px 10px; border-radius: 4px; color: #000;">{{payment_status}}</span></td>
      </tr>
    </table>

    <h3 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px; margin-top: 30px;">Customer Information</h3>
    
    <table style="width: 100%; margin: 20px 0;">
      <tr>
        <td style="padding: 10px 0; font-weight: bold; color: #666;">Name:</td>
        <td style="padding: 10px 0; color: #000;">{{customer_name}}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; font-weight: bold; color: #666;">Email:</td>
        <td style="padding: 10px 0; color: #000;">{{customer_email}}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; font-weight: bold; color: #666;">Phone:</td>
        <td style="padding: 10px 0; color: #000;">{{customer_phone}}</td>
      </tr>
    </table>

    <h3 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px; margin-top: 30px;">Order Items</h3>
    
    <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; margin: 20px 0; white-space: pre-line; font-family: monospace;">{{order_items}}</div>

    <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 4px;">
      <p style="margin: 0; color: #666;">Payment Method: <strong>{{payment_method}}</strong></p>
      <p style="margin: 10px 0 0 0; font-size: 14px; color: #999;">Check your admin panel for more details</p>
    </div>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
    <p>Likhith Visuals - Order Notification System</p>
  </div>
</div>
```

**To Email:** 
```
{{to_email}}
```

4. Click **"Save"**

### Step 2: Test
- Place a test order on your website
- Check your email: likhithlikhith278@gmail.com
- You should receive a beautifully formatted email with all order details!

---

## 📱 Part 2: Telegram Setup (5 minutes)

Get instant notifications on your phone!

### Step 1: Create Your Bot

1. Open **Telegram** app on your phone or computer
2. Search for **@BotFather** (it's a verified bot by Telegram)
3. Start a chat and send: `/newbot`
4. Bot will ask for a name. Send: `Likhith Orders Bot`
5. Bot will ask for a username. Send: `LikhithOrdersBot` (must end with 'bot')
6. **IMPORTANT:** Copy the **Bot Token** that BotFather gives you 7959976246:AAHrcb6u2_4C_b_CsOubdfpDP23DH1gC7Ks
   - It looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`
   - Save it somewhere safe!

### Step 2: Get Your Chat ID

1. Still in Telegram, search for **@userinfobot**
2. Start a chat and send any message (like "hi")
3. The bot will reply with your user info
4. **Copy your Chat ID** (it's a number, like: `123456789`)  8049155427

### Step 3: Start Your Bot

1. Search for your bot username in Telegram: `@LikhithOrdersBot`
2. Click **"START"** button
3. Send any message to it (like "hello")
4. This activates the bot to send you messages

### Step 4: Update Your Website Code

Open `script.js` and find these lines near the top (around line 22):

```javascript
const TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN_HERE"; // Get from @BotFather
const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID_HERE"; // Get from @userinfobot
```

Replace with YOUR values:

```javascript
const TELEGRAM_BOT_TOKEN = "123456789:ABCdefGHIjklMNOpqrsTUVwxyz"; // Paste your bot token
const TELEGRAM_CHAT_ID = "123456789"; // Paste your chat ID
```

### Step 5: Test

1. Save the file
2. Refresh your website
3. Place a test order
4. **Within seconds**, you'll get a beautiful formatted message on Telegram with:
   - Order ID
   - UTR Number
   - Customer details (name, email, phone)
   - Order items
   - Total amount
   - Date and time

---

## 🎉 You're All Set!

### What happens when someone places an order:

1. ✅ Customer gets receipt email
2. ✅ **You get admin notification email**
3. ✅ **You get instant Telegram message on your phone**
4. ✅ Order is saved in admin panel (localhost:5500/admin.html)
5. ✅ Order is saved in browser localStorage (never lost)

### To view all orders:
- Go to `admin.html`
- Login with password: `Admin@123`
- See all orders with UTR numbers
- Export to CSV if needed

---

## 🔧 Troubleshooting

### Email not working?
- Make sure template ID is exactly: `template_admin_notify`
- Check spam folder
- Verify email in EmailJS dashboard settings

### Telegram not working?
- Make sure you clicked START on your bot
- Verify bot token has no extra spaces
- Check browser console for errors
- Test your bot token: https://api.telegram.org/bot<YOUR_TOKEN>/getMe

### Still having issues?
Open browser console (F12) and check for error messages. The logs will tell you exactly what's wrong!

---

## 📊 Sample Telegram Message You'll Receive:

```
🆕 New Order Received

📦 Order ID: LV-1234567890
💳 UTR Number: test12345

👤 Customer Details:
• Name: John Doe
• Email: john@example.com
• Phone: 9876543210

🛍️ Order Items:
• Gaming Subtitle Presets x1 - Rs. 99

💰 Total Amount: ₹99
📋 Status: pending
💳 Method: UPI QR
📅 Date: 12/2/2026, 11:30:45 PM

✅ Check admin panel for more details!
```

---

## 🎯 Next Steps After Setup:

1. ✅ Complete EmailJS template creation
2. ✅ Set up Telegram bot
3. ✅ Update Telegram credentials in script.js
4. 🧪 Place a test order to verify everything works
5. 🚀 Go live!

**Your order notification system is now professional-grade!** 🎉
