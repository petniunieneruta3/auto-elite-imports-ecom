
import { supabase } from '@/integrations/supabase/client';

export const addRangeRoverEvoque = async () => {
  console.log('Starting to add Range Rover Evoque...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Land Rover')
    .eq('model', 'Range Rover Evoque 2.0 TD4 180')
    .eq('year', 2015)
    .eq('price', 8000)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Range Rover Evoque already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Land Rover',
        model: 'Range Rover Evoque 2.0 TD4 180',
        year: 2015,
        price: 8000,
        mileage: 132000,
        fuel: 'Diesel',
        power: '180 CH',
        transmission: 'Automatique',
        color: 'Blanc',
        image_url: '/lovable-uploads/dfbe7641-678f-43a6-b9a6-174ef14b3623.png',
        badge: 'Elite',
        rating: 4.3,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Land Rover Range Rover Evoque 2.0 TD4 180 avec toit ouvrant panoramique. SUV compact premium avec motorisation diesel développant 180 ch. Véhicule élégant en couleur blanche avec intérieur cuir noir, équipé d\'une boîte automatique et de nombreux équipements de confort. Emissions CO2 : 125 g/km.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Range Rover Evoque:', vehicleError);
      return;
    }

    console.log('Range Rover Evoque added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/dfbe7641-678f-43a6-b9a6-174ef14b3623.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/727cbeba-242b-4cd7-aa6c-3943bfc86ee1.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/3e3d0087-6d55-4b4b-8a13-22eec8b309de.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/2c83f43b-6af3-4093-9281-394b0f9c3e00.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/6e97a4e9-657b-4b62-bb2c-817eb4df375b.png',
        is_primary: false,
        display_order: 5
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Range Rover Evoque:', imagesError);
    } else {
      console.log('All images added successfully for Range Rover Evoque');
    }

  } catch (error) {
    console.error('Error in addRangeRoverEvoque:', error);
  }
};
