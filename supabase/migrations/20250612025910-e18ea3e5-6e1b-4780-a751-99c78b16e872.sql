
-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create vehicles table
CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  mileage INTEGER NOT NULL,
  fuel TEXT NOT NULL,
  power TEXT NOT NULL,
  transmission TEXT,
  color TEXT,
  image_url TEXT,
  badge TEXT DEFAULT 'Elite',
  rating DECIMAL(2,1) DEFAULT 4.5,
  location TEXT DEFAULT 'Oranienburg',
  availability TEXT DEFAULT 'Sofort verfügbar',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Create function to check user roles (security definer to avoid RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Admins can view all roles" 
  ON public.user_roles 
  FOR SELECT 
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles" 
  ON public.user_roles 
  FOR ALL 
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for vehicles
CREATE POLICY "Everyone can view vehicles" 
  ON public.vehicles 
  FOR SELECT 
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage vehicles" 
  ON public.vehicles 
  FOR ALL 
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger function for profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$;

-- Create trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert some sample vehicles
INSERT INTO public.vehicles (brand, model, year, price, mileage, fuel, power, transmission, color, image_url, badge, rating, availability) VALUES
('BMW', 'M5 Competition', 2022, 89500.00, 15000, 'Benzin', '625 PS', 'Automatik', 'Schwarz Metallic', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Elite', 4.9, 'Sofort verfügbar'),
('Mercedes', 'AMG GT 63 S', 2023, 125900.00, 8500, 'Benzin', '630 PS', 'Automatik', 'Weiß Perleffekt', 'https://images.unsplash.com/photo-1563694983011-6f4d90358083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Collector', 5.0, 'Sofort verfügbar'),
('Porsche', '911 Turbo S', 2023, 198500.00, 5200, 'Benzin', '650 PS', 'PDK', 'Guards Rot', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Collector', 5.0, 'Reserviert'),
('Audi', 'RS6 Avant', 2022, 95800.00, 12000, 'Benzin', '600 PS', 'Tiptronic', 'Nardo Grau', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Elite', 4.8, 'Sofort verfügbar');
