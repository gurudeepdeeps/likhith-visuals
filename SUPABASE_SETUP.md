# Simple Supabase Backend Setup

> **⚠️ ALREADY HAVE TABLES?** If you already created the tables before, run the SQL in **SUPABASE_UPDATE.sql** to add the new Razorpay fields and old_price column!

## What You'll Get:
✅ Orders stored in cloud database (never lost)  
✅ Products stored in cloud (sync across devices)  
✅ Admin panel works from any device  
✅ Keep Telegram & Email notifications  
✅ Simple and clean - no complex features  

---

## Step 1: Create Supabase Project (5 minutes)

1. Go to https://supabase.com
2. Click **"Start your project"**
3. Sign up with GitHub or email
4. Click **"New Project"**
5. Fill in:
   - **Name:** Likhith-Orders (or anything you want)
   - **Database Password:** Choose a strong password (save it!)
   - **Region:** Choose closest to you (e.g., Mumbai/Singapore)
6. Click **"Create new project"**
7. Wait 2-3 minutes for project to be ready

---

## Step 2: Create Database Tables (5 minutes)

Once project is ready:

1. Go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy and paste this SQL:

```sql
-- Orders Table
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  transaction_id TEXT,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  items JSONB,
  total_amount DECIMAL(10,2),
  discount DECIMAL(10,2) DEFAULT 0,
  payment_status TEXT DEFAULT 'pending',
  payment_method TEXT DEFAULT 'Razorpay',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products Table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  old_price DECIMAL(10,2),
  download_url TEXT,
  image TEXT,
  tag TEXT,
  rating DECIMAL(2,1),
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (required for public access)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public INSERT for orders (when customers place orders)
CREATE POLICY "Allow public insert orders" ON orders
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow public SELECT for orders (for admin to view)
CREATE POLICY "Allow public select orders" ON orders
  FOR SELECT TO anon
  USING (true);

-- Allow public access to products
CREATE POLICY "Allow public select products" ON products
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "Allow public insert products" ON products
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update products" ON products
  FOR UPDATE TO anon
  USING (true);

CREATE POLICY "Allow public delete products" ON products
  FOR DELETE TO anon
  USING (true);
```

4. Click **"Run"** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

---

## Step 3: Get Your Supabase Credentials

1. Go to **Project Settings** (gear icon in left sidebar)
2. Click **"API"** section
3. Copy these two values:

**Project URL:** `https://xxxxxxxxxxxxx.supabase.co`  
**anon public key:** Long string starting with `eyJ...`

Save both somewhere safe!

---

## Step 4: Create Storage Bucket for Product Images

1. In Supabase, go to **Storage**
2. Click **"Create bucket"**
3. Name it: `product-images`
4. Set it to **Public**
5. Click **Create bucket**

This allows your website to upload and serve product images.

### Step 4B: Allow Public Uploads (Required)

Run this SQL in Supabase **SQL Editor** to allow image uploads from your site:

```sql
-- Allow public uploads to product-images bucket
CREATE POLICY "Public upload product images" ON storage.objects
  FOR INSERT TO anon
  WITH CHECK (bucket_id = 'product-images');

-- Allow public read from product-images bucket
CREATE POLICY "Public read product images" ON storage.objects
  FOR SELECT TO anon
  USING (bucket_id = 'product-images');
```

If you already created policies, just make sure they allow `INSERT` and `SELECT` for the `product-images` bucket.

---

## Step 5: Update Your Website Code

I'll update script.js to use these credentials. Just paste your:
- Supabase URL
- Supabase anon key

Into the chat, and I'll integrate everything!

---

## What Will Happen:

### When Customer Places Order:
1. ✅ Order saved to Supabase database
2. ✅ Order saved to localStorage (backup)
3. ✅ Customer gets email receipt
4. ✅ You get admin email
5. ✅ You get Telegram notification

### In Admin Panel:
1. ✅ View all orders from Supabase (from any device)
2. ✅ View all products from Supabase
3. ✅ Add/edit/delete products (synced to cloud)
4. ✅ Export orders to CSV

### Offline Fallback:
- If internet is down, orders save to localStorage
- When internet is back, they'll be synced

---

## Free Tier Usage:

With your expected volume:
- **~100 orders/month** = Less than 1 MB storage used
- **~10 products** = Few KB storage
- **You'll use less than 1% of free tier limits!**

---

## Ready?

Once you complete Steps 1-3 above, send me:
1. Your Supabase URL
2. Your anon public key

And I'll integrate it into your website! 🚀
