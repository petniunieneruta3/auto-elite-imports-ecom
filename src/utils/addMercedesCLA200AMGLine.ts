
import { supabase } from '@/integrations/supabase/client';

export const addMercedesCLA200AMGLine = async () => {
  console.log('Starting to add Mercedes CLA 200 AMG-Line...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Mercedes-Benz')
    .eq('model', 'CLA 200 AMG-Line')
    .eq('year', 2017)
    .eq('price', 6800)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Mercedes CLA 200 AMG-Line already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Mercedes-Benz',
        model: 'CLA 200 AMG-Line',
        year: 2017,
        price: 6800,
        mileage: 77000,
        fuel: 'Essence',
        power: '156 CH',
        transmission: 'Automatique',
        color: 'Noir Cosmos',
        image_url: '/lovable-uploads/965b9381-6f7d-4d66-ba92-11db4a8b1e9c.png',
        badge: 'Elite',
        rating: 4.6,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Mercedes-Benz CLA 200 AMG-Line avec finition sportive. Coupé 4 portes élégant équipé du moteur essence 1.6L turbo de 156 ch et boîte automatique. Véhicule avec kilométrage certifié et historique complet. Design dynamique avec pack AMG-Line et équipements de série complets.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Mercedes CLA 200 AMG-Line:', vehicleError);
      return;
    }

    console.log('Mercedes CLA 200 AMG-Line added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/965b9381-6f7d-4d66-ba92-11db4a8b1e9c.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/f89fd3c5-6bd9-47a3-8ff2-96828bbf4fbc.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/54be9d85-6d09-4274-a3aa-8a669d44b7b8.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/5cd0ae0e-6b47-4577-88ce-ada8f238b4fd.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/2d03e25b-7244-48c4-97c8-bfe02897bee2.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/36a81e4a-2197-4c62-b3cd-81e9b050b6e6.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/48ae60cf-fab7-4d36-b4c8-88433d9a79c6.png',
        is_primary: false,
        display_order: 7
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/63ff32e6-43a8-418b-a142-7a4af53a7d63.png',
        is_primary: false,
        display_order: 8
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Mercedes CLA 200 AMG-Line:', imagesError);
    } else {
      console.log('All images added successfully for Mercedes CLA 200 AMG-Line');
    }

  } catch (error) {
    console.error('Error in addMercedesCLA200AMGLine:', error);
  }
};
