# Coupon Management System Guide

## Overview

Your website now has a complete coupon code management system with admin control panel and automatic Supabase synchronization. Admins can create, edit, and delete discount coupons that customers can apply during checkout.

---

## Features

✅ **Admin Panel** - Manage all coupons from the admin dashboard  
✅ **Supabase Sync** - All coupons stored in cloud database and synced automatically  
✅ **Two Types** - Percentage discounts and flat amount discounts  
✅ **Status Control** - Active/Inactive status for enabling/disabling coupons  
✅ **Real-time Validation** - Customers see instant feedback when applying coupons  
✅ **Automatic Calculation** - Discounts applied immediately to cart total

---

## How to Access Coupon Management

### 1. **Login to Admin Panel**
- Go to: `admin.html`
- Enter admin password
- Click **"Login"**

### 2. **Navigate to Coupons Tab**
- Click **"Coupons"** tab in navigation
- You'll see all existing coupons in a table

---

## Adding a New Coupon

### Step-by-Step:

1. Click **"Add Coupon"** button
2. Fill in the form:
   - **Coupon Code**: Enter code (e.g., `SAVE20`, `NEWYEAR`)
     - Automatically converts to UPPERCASE
     - Must be unique
   - **Type**: Choose discount type
     - **Percentage Off**: Discount as % of cart total
     - **Flat Discount (Rs.)**: Fixed rupee amount off
   - **Value**: Enter the discount value
     - For percentage: Enter number like `20` (means 20%)
     - For flat: Enter amount like `50` (means Rs. 50 off)
   - **Description** (optional): Add note like "New Year Sale"
   - **Status**: 
     - **Active**: Customers can use it
     - **Inactive**: Disabled (hidden from validation)

3. Click **"Save Coupon"**
4. Coupon is immediately saved to Supabase
5. Table refreshes to show new coupon

### Example Coupons:

**20% Off Sale:**
```
Code: SAVE20
Type: Percentage Off
Value: 20
Description: Get 20% off on all products
Status: Active
```

**Flat Rs. 100 Discount:**
```
Code: FLAT100
Type: Flat Discount (Rs.)
Value: 100
Description: Rs. 100 flat discount
Status: Active
```

**Festival Offer:**
```
Code: FESTIVAL50
Type: Percentage Off
Value: 50
Description: Festival mega sale - 50% off!
Status: Active
```

---

## Editing an Existing Coupon

1. Find coupon in the table
2. Click **"Edit"** button
3. Modify fields (Note: **Code cannot be changed** after creation)
4. Click **"Save Coupon"**
5. Changes sync to Supabase instantly

**Common Edits:**
- Change discount value (e.g., increase 10% to 20%)
- Update description
- Change status to Inactive to disable without deleting

---

## Deleting a Coupon

1. Find coupon in the table
2. Click **"Delete"** button
3. Confirm deletion in popup
4. Coupon removed from Supabase permanently

⚠️ **Warning**: This action cannot be undone!

---

## How Customers Use Coupons

### On Cart Page:

1. Customer adds products to cart
2. Navigates to `cart.html`
3. Enters coupon code in **"Coupon Code"** field
4. Clicks **"Apply"** button

**Validation Process:**
- Code is sent to Supabase for validation
- Only **Active** coupons are accepted
- If valid:
  - ✅ Success message: "Coupon SAVE20 applied successfully!"
  - Discount calculates automatically
  - Cart total updates
- If invalid:
  - ❌ Error message: "Invalid or expired coupon code."
  - No discount applied

**Discount Calculation:**

**Percentage Discount:**
```
Cart Subtotal: Rs. 1000
Coupon: SAVE20 (20% off)
Discount: Rs. 200
Total: Rs. 800
```

**Flat Discount:**
```
Cart Subtotal: Rs. 1000
Coupon: FLAT50 (Rs. 50 off)
Discount: Rs. 50
Total: Rs. 950
```

---

## Database Structure

### Coupons Table Schema:

| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGSERIAL | Auto-increment primary key |
| `code` | TEXT | Coupon code (unique, uppercase) |
| `type` | TEXT | `'percent'` or `'flat'` |
| `value` | DECIMAL | Discount value (percentage or amount) |
| `description` | TEXT | Optional description |
| `status` | TEXT | `'active'` or `'inactive'` |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

**Indexes:**
- `idx_coupons_code` - Fast lookups by code
- `idx_coupons_status` - Filter by status

**Constraints:**
- `code` must be UNIQUE
- `type` must be `'percent'` or `'flat'`
- `value` must be > 0
- `status` must be `'active'` or `'inactive'`

---

## Setup Instructions

### 1. **Run SQL Migration**

Open Supabase → SQL Editor → run this:

```sql
-- Create coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id BIGSERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('percent', 'flat')),
  value DECIMAL(10,2) NOT NULL CHECK (value > 0),
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_status ON coupons(status);

-- Enable RLS
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Allow public read active coupons
CREATE POLICY "Allow public select active coupons" ON coupons
  FOR SELECT USING (status = 'active');

-- Allow public insert/update/delete (for admin)
CREATE POLICY "Allow public insert coupons" ON coupons
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update coupons" ON coupons
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete coupons" ON coupons
  FOR DELETE USING (true);

-- Seed default coupons
INSERT INTO coupons (code, type, value, description, status)
VALUES 
  ('SAVE10', 'percent', 10, '10% off on all products', 'active'),
  ('SAVE20', 'percent', 20, '20% off on all products', 'active'),
  ('FLAT50', 'flat', 50, 'Rs. 50 flat discount', 'active')
ON CONFLICT (code) DO NOTHING;
```

### 2. **Verify Setup**

Run this query to check:

```sql
SELECT code, type, value, description, status 
FROM coupons 
WHERE status = 'active'
ORDER BY created_at DESC;
```

You should see 3 default coupons.

---

## Best Practices

### ✅ DO:

- **Use memorable codes**: `SAVE20`, `NEWYEAR`, `FESTIVAL` (easy to remember)
- **Set expiration manually**: When campaign ends, set status to Inactive
- **Test before launch**: Add coupon, test on cart page, then activate
- **Track usage**: Check orders table to see which coupons are used most
- **Communicate clearly**: Tell customers max discount, minimum order, etc.

### ❌ DON'T:

- **Don't use complex codes**: Avoid `X7F3K9P2Q` (customers will misspell)
- **Don't leave expired coupons active**: Set to Inactive when campaign ends
- **Don't create duplicate codes**: System prevents this, but be aware
- **Don't set value to 0**: Validation requires value > 0
- **Don't forget to sync**: All changes save to Supabase automatically

---

## Troubleshooting

### **Problem: Coupon not showing in admin**
**Solution:** 
- Refresh the page (Ctrl+F5)
- Check SQL migration was run successfully
- Verify Supabase connection in browser console

### **Problem: Customer can't apply coupon**
**Solution:**
- Check coupon status is "Active" in admin
- Verify code spelling (case-insensitive but must match)
- Check browser console for errors
- Ensure cart has items (can't apply to empty cart)

### **Problem: Discount not calculating**
**Solution:**
- Refresh cart page
- Clear coupon and reapply
- Check coupon type and value are correct
- Verify cart subtotal > 0

### **Problem: Changes not saving to Supabase**
**Solution:**
- Check browser console for errors
- Verify Supabase URL and API key in config
- Check Row Level Security policies allow insert/update
- Test with SQL query: `SELECT * FROM coupons;`

---

## Marketing Tips

### **Launch Campaigns:**

**New Product Launch:**
```
Code: LAUNCH50
Type: Percentage Off
Value: 50
Description: New product mega launch - 50% off!
Duration: 1 week
```

**Seasonal Sales:**
```
Code: SUMMER25
Type: Percentage Off
Value: 25
Description: Summer sale - 25% off all products
Duration: 3 months
```

**First-Time Buyer:**
```
Code: WELCOME20
Type: Percentage Off
Value: 20
Description: Welcome discount for new customers
Duration: Ongoing
```

**Minimum Order Promotions:**
```
Code: BIG100
Type: Flat Discount
Value: 100
Description: Rs. 100 off on orders above Rs. 500
Duration: 1 month
```

### **Distribution Channels:**

✅ Email newsletters  
✅ Social media posts (Instagram, Twitter)  
✅ Website banners  
✅ WhatsApp broadcast  
✅ SMS campaigns  
✅ YouTube video descriptions  

---

## Advanced Features (Future Enhancements)

🔜 **Expiration dates** - Auto-disable after set date  
🔜 **Usage limits** - Restrict to X uses per coupon  
🔜 **Minimum order value** - Apply only on orders above Rs. X  
🔜 **User-specific coupons** - One-time codes per customer  
🔜 **Product-specific discounts** - Apply only to certain products  
🔜 **Analytics dashboard** - Track coupon usage statistics  

---

## Support

If you encounter issues:

1. Check browser console for errors (F12 → Console tab)
2. Verify Supabase connection: `SELECT * FROM coupons;`
3. Test with default coupons: `SAVE10`, `SAVE20`, `FLAT50`
4. Clear browser cache and retry
5. Check SUPABASE_UPDATE.sql was run completely

---

## Summary

✅ Admin panel has new **Coupons** tab  
✅ Add/Edit/Delete coupons with instant Supabase sync  
✅ Customers validate coupons on cart page  
✅ Two discount types: Percentage and Flat amount  
✅ Active/Inactive status for campaign control  
✅ Real-time discount calculation  
✅ Complete database integration  

**Next Steps:**
1. ✅ Run SQL migration from `SUPABASE_UPDATE.sql`
2. ✅ Login to admin → Go to Coupons tab
3. ✅ Create your first coupon
4. ✅ Test on cart page
5. ✅ Launch your discount campaign! 🚀
