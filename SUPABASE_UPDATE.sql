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
