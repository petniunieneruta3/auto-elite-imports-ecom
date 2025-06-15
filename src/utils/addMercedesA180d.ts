
import { supabase } from '@/integrations/supabase/client';

export const addMercedesA180d = async () => {
  console.log('Starting to add Mercedes-Benz Classe A A180d...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Mercedes-Benz')
    .eq('model', 'Classe A A180d Panoramique')
    .eq('year', 2019)
    .eq('price', 6900)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Mercedes-Benz Classe A A180d already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Mercedes-Benz',
        model: 'Classe A A180d Panoramique',
        year: 2019,
        price: 6900,
        mileage: 59942,
        fuel: 'Diesel',
        power: '116 CH',
        transmission: 'Automatique',
        color: 'Jaune',
        image_url: '/lovable-uploads/2f3f5337-819c-4c2e-9c57-1b7131965b5c.png',
        badge: 'Premium',
        rating: 4.7,
        location: 'Paris',
        availability: 'Sofort verfügbar',
        description: 'Mercedes-Benz Classe A A180d avec toit panoramique et éclairage d\'ambiance. Motorisation diesel de 116 ch avec boîte automatique. Véhicule récent de 2019 en excellent état avec kilométrage certifié de 59,942 km. Légalisation comprise dans le prix.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Mercedes-Benz Classe A A180d:', vehicleError);
      return;
    }

    console.log('Mercedes-Benz Classe A A180d added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/2f3f5337-819c-4c2e-9c57-1b7131965b5c.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/92e522d2-ed92-44dd-afd8-e8985840d367.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/0dcdbb53-cb8b-45f8-8f6a-e09f8fe5eae8.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/b325b40b-3262-4161-95d0-cae059f7d1ec.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/244d4251-3404-4f4c-ad68-064d7ed93386.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/f20c842d-903f-4657-8d8f-0cbd0530d773.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/e4f978a5-e958-4c8d-bedf-97588e41c9f4.png',
        is_primary: false,
        display_order: 7
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Mercedes-Benz Classe A A180d:', imagesError);
    } else {
      console.log('All images added successfully for Mercedes-Benz Classe A A180d');
    }

  } catch (error) {
    console.error('Error in addMercedesA180d:', error);
  }
};
