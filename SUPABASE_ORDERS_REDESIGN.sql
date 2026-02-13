-- ============================================
-- COMPLETE ORDERS TABLE REDESIGN FOR RAZORPAY
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Drop the old orders table (WARNING: This deletes all existing orders!)
-- Comment this out if you want to keep old orders
DROP TABLE IF EXISTS orders CASCADE;

-- Step 2: Create new clean orders table for Razorpay
CREATE TABLE orders (
  -- Order identification
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE,
  
  -- Customer information
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  
  -- Razorpay payment details
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  
  -- Order details
  items JSONB NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  
  -- Payment information
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT DEFAULT 'Razorpay',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 3: Create indexes for better performance
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_razorpay_payment_id ON orders(razorpay_payment_id);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Step 4: Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies for public access

-- Allow anyone to INSERT orders (when customers checkout)
DROP POLICY IF EXISTS "Public can insert orders" ON orders;
CREATE POLICY "Public can insert orders" 
ON orders FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Allow anyone to SELECT orders (for admin panel and order history)
DROP POLICY IF EXISTS "Public can view orders" ON orders;
CREATE POLICY "Public can view orders" 
ON orders FOR SELECT 
TO anon, authenticated
USING (true);

-- Allow anyone to UPDATE orders (for payment status updates)
DROP POLICY IF EXISTS "Public can update orders" ON orders;
CREATE POLICY "Public can update orders" 
ON orders FOR UPDATE 
TO anon, authenticated
USING (true);

-- Step 6: Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Step 7: Verify the table structure
SELECT 
  column_name, 
  data_type, 
  column_default,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'orders'
ORDER BY ordinal_position;

-- ============================================
-- SUCCESS! Your orders table is now redesigned
-- ============================================
