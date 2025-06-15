
-- Enable realtime for the vehicles table
ALTER TABLE public.vehicles REPLICA IDENTITY FULL;

-- Add the vehicles table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.vehicles;
