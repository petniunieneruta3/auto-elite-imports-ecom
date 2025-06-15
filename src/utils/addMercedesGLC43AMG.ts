
import { supabase } from '@/integrations/supabase/client';

export const addMercedesGLC43AMG = async () => {
  console.log('Starting to add Mercedes GLC 43 AMG...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Mercedes-Benz')
    .eq('model', 'GLC 43 AMG')
    .eq('year', 2020)
    .eq('price', 14000)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Mercedes GLC 43 AMG already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Mercedes-Benz',
        model: 'GLC 43 AMG',
        year: 2020,
        price: 14000,
        mileage: 61999,
        fuel: 'Essence',
        power: '390 ch',
        transmission: 'Automatique',
        color: 'Noir Métallisé',
        image_url: '/lovable-uploads/0d0eeaf6-9949-4a04-8a70-49766c404e5f.png',
        badge: 'Elite',
        rating: 4.7,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Mercedes-Benz GLC 43 AMG 3.0L 390CH 4Matic avec équipement complet. Moteur V6 biturbo essence de 390 ch, boîte automatique 9G-Tronic, transmission intégrale 4Matic. Véhicule en excellent état avec 5 places et kilométrage certifié.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Mercedes GLC 43 AMG:', vehicleError);
      return;
    }

    console.log('Mercedes GLC 43 AMG added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/0d0eeaf6-9949-4a04-8a70-49766c404e5f.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/35796ebd-76c0-4e18-adcc-d751e11cc3e0.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/b643eda6-a8f4-4728-8a72-93fe8a71fa88.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/6aca1949-80af-4586-8551-b11151e5175f.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/40f04014-12e8-4270-a9db-fd7a47cb7a45.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/a72f9de5-4f15-417b-993d-01b025548b2d.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/57cced29-052e-4f23-9f33-81699d8ddcfb.png',
        is_primary: false,
        display_order: 7
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/f4793d18-0171-41f6-ae1c-0c8c6e48706b.png',
        is_primary: false,
        display_order: 8
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Mercedes GLC 43 AMG:', imagesError);
    } else {
      console.log('All images added successfully for Mercedes GLC 43 AMG');
    }

  } catch (error) {
    console.error('Error in addMercedesGLC43AMG:', error);
  }
};
