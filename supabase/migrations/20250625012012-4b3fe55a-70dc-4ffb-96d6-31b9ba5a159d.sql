
-- Create storage bucket for payment proofs
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-proofs', 'payment-proofs', true);

-- Create RLS policy to allow anyone to upload payment proofs
CREATE POLICY "Allow upload of payment proofs" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'payment-proofs');

-- Create RLS policy to allow reading payment proofs
CREATE POLICY "Allow reading payment proofs" ON storage.objects
FOR SELECT USING (bucket_id = 'payment-proofs');

-- Create table to store order information with payment proof reference
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_info JSONB NOT NULL,
  payment_type TEXT NOT NULL,
  payment_amount NUMERIC NOT NULL,
  total_amount NUMERIC NOT NULL,
  order_summary TEXT NOT NULL,
  special_requests TEXT,
  payment_proof_url TEXT,
  payment_proof_filename TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on orders table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow reading all orders (for admin purposes)
CREATE POLICY "Allow reading all orders" ON public.orders
FOR SELECT USING (true);

-- Create policy to allow inserting orders
CREATE POLICY "Allow inserting orders" ON public.orders
FOR INSERT WITH CHECK (true);
