
-- Create a table for vehicle images/gallery
CREATE TABLE public.vehicle_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for better performance
CREATE INDEX idx_vehicle_images_vehicle_id ON public.vehicle_images(vehicle_id);
CREATE INDEX idx_vehicle_images_primary ON public.vehicle_images(vehicle_id, is_primary) WHERE is_primary = true;

-- Enable realtime for the vehicle_images table
ALTER TABLE public.vehicle_images REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.vehicle_images;

-- Migrate existing image_url data from vehicles table to vehicle_images table
INSERT INTO public.vehicle_images (vehicle_id, image_url, is_primary, display_order)
SELECT id, image_url, true, 0 
FROM public.vehicles 
WHERE image_url IS NOT NULL AND image_url != '';

-- Add some sample gallery images for existing vehicles
INSERT INTO public.vehicle_images (vehicle_id, image_url, is_primary, display_order)
SELECT 
  v.id,
  CASE 
    WHEN v.brand = 'BMW' THEN 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN v.brand = 'Mercedes' THEN 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN v.brand = 'Porsche' THEN 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN v.brand = 'Audi' THEN 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ELSE 'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  END,
  false,
  1
FROM public.vehicles v;

INSERT INTO public.vehicle_images (vehicle_id, image_url, is_primary, display_order)
SELECT 
  v.id,
  CASE 
    WHEN v.brand = 'BMW' THEN 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN v.brand = 'Mercedes' THEN 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN v.brand = 'Porsche' THEN 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN v.brand = 'Audi' THEN 'https://images.unsplash.com/photo-1549399592-835c1c77d36d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ELSE 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  END,
  false,
  2
FROM public.vehicles v;
