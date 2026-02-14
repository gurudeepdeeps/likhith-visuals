-- ============================================
-- SUPABASE DATABASE UPDATE FOR RAZORPAY
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Add Razorpay payment fields to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT,
ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT,
ADD COLUMN IF NOT EXISTS razorpay_signature TEXT;

-- 2. Add old_price column to products table (for showing discounts)
ALTER TABLE products
ADD COLUMN IF NOT EXISTS old_price DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS download_url TEXT,
ADD COLUMN IF NOT EXISTS filter_tag TEXT DEFAULT 'regular' CHECK (filter_tag IN ('featured', 'newest', 'regular'));

-- 3. Update payment_method default for Razorpay
ALTER TABLE orders 
ALTER COLUMN payment_method SET DEFAULT 'Razorpay';

-- 4. Create coupons table for coupon code management
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

-- Add index for faster coupon lookups
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_status ON coupons(status);

-- ============================================
-- ROW LEVEL SECURITY (RLS) FOR COUPONS
-- ============================================

-- Enable RLS on coupons table
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active coupons only
CREATE POLICY "Allow public read active coupons" ON coupons
  FOR SELECT
  USING (status = 'active');

-- Allow public insert for admin (you may want to restrict this)
CREATE POLICY "Allow public insert coupons" ON coupons
  FOR INSERT
  WITH CHECK (true);

-- Allow public update for admin
CREATE POLICY "Allow public update coupons" ON coupons
  FOR UPDATE
  USING (true);

-- Allow public delete for admin
CREATE POLICY "Allow public delete coupons" ON coupons
  FOR DELETE
  USING (true);

-- ============================================
-- SEED DEFAULT COUPONS (OPTIONAL)
-- ============================================

INSERT INTO coupons (code, type, value, description, status)
VALUES 
  ('SAVE10', 'percent', 10, '10% off on all products', 'active'),
  ('SAVE20', 'percent', 20, '20% off on all products', 'active'),
  ('FLAT50', 'flat', 50, 'Rs. 50 flat discount', 'active')
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- VERIFICATION QUERIES (Run after above)
-- ============================================

-- Check orders table structure
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'orders'
ORDER BY ordinal_position;

-- Check products table structure
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'products'
ORDER BY ordinal_position;

-- Check coupons table structure
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'coupons'
ORDER BY ordinal_position;

-- List all active coupons
SELECT code, type, value, description, status 
FROM coupons 
WHERE status = 'active'
ORDER BY created_at DESC;
