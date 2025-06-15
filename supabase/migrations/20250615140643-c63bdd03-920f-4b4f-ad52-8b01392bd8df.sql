
-- Enable RLS on vehicles table if not already enabled
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access to vehicles
CREATE POLICY "Allow public read access to vehicles" 
ON public.vehicles 
FOR SELECT 
USING (true);

-- Create a policy to allow public insert access to vehicles (for demo purposes)
CREATE POLICY "Allow public insert access to vehicles" 
ON public.vehicles 
FOR INSERT 
WITH CHECK (true);

-- Enable RLS on vehicle_images table if not already enabled
ALTER TABLE public.vehicle_images ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access to vehicle images
CREATE POLICY "Allow public read access to vehicle_images" 
ON public.vehicle_images 
FOR SELECT 
USING (true);

-- Create a policy to allow public insert access to vehicle images (for demo purposes)
CREATE POLICY "Allow public insert access to vehicle_images" 
ON public.vehicle_images 
FOR INSERT 
WITH CHECK (true);
