# Product Download Links Setup

## ⚠️ Important: Run This SQL First

If you already have products in your Supabase, you MUST run this SQL to add the new `download_url` column:

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase project: https://app.supabase.com
2. Click **SQL Editor** in the left sidebar
3. Click **New query**

### Step 2: Run This SQL

```sql
-- Add download_url column to products table
ALTER TABLE products
ADD COLUMN IF NOT EXISTS download_url TEXT;

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;
```

Click **Run** (or Ctrl+Enter).

## ✅ Now You Can Add Products

### In Admin Panel:

1. Go to `admin.html`
2. Click **Add Product** button
3. Fill in all fields:
   - **Product ID** (e.g., "gaming-presets")
   - **Title** (e.g., "Gaming Subtitle Presets")
   - **Price** (e.g., 99)
   - **Old Price** (optional, for discounts)
   - **Tag** (e.g., "SALE")
   - **Rating** (e.g., 4.9)
   - **Image URL** (paste URL or upload)
   - **Download URL (Google Drive)** ← NEW FIELD
   - **Description**
   - **Features** (one per line)

4. Click **Save Product**

### Getting Google Drive Links:

1. Upload your product file to Google Drive
2. Right-click the file → **Share**
3. Set to "Anyone with the link" → **Viewer**
4. Click **Copy link**
5. Paste it in the **Download URL (Google Drive)** field

Example: `https://drive.google.com/file/d/1ABC-xyz123/view?usp=sharing`

---

## 🎯 What Happens:

### When a customer buys:
1. ✅ Order is saved (paid status)
2. ✅ Confirmation email is sent
3. ✅ **Download link appears in the email**
4. ✅ Success page shows clickable download link
5. ✅ Admin panel tracks order status

### If payment is pending:
- Email shows: "_Download links will be sent after confirmation_"
- Success page shows: "_Payment pending. Download links will appear after confirmation_"

---

## 🔧 Troubleshooting

### "Failed to save product" error:

**Cause:** The `products` table is missing the `download_url` column.

**Fix:** Run the SQL from Step 2 above.

### Download links not showing:

**Make sure:**
- ✅ You ran the SQL migration
- ✅ You filled in the **Download URL (Google Drive)** field
- ✅ The Google Drive link is publicly accessible (set to "Anyone with link")
- ✅ Payment status is `paid`

### Browser Console Shows Errors:

Open browser console (F12) and check for red errors. Screenshot the error and the URL you're trying to save.

---

## ✨ Tips

- **Test Before Launch:** Buy one product yourself to verify download links work
- **Multiple Products:** You can assign different Google Drive links to different products
- **Update Anytime:** Edit a product to change its download link
- **Private Files:** Google Drive links must be shared "Anyone with link" - your customers cannot access other files in your drive

---

## Need Help?

If products still won't save after running the SQL:

1. Check **browser console** (F12) for error messages
2. Check **Supabase** → **SQL Editor** → Run: `SELECT * FROM products LIMIT 1;` to verify table exists
3. Check if Supabase credentials are correct in `script.js` (lines 22-23)

