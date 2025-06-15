
import { supabase } from '@/integrations/supabase/client';

export const addRangeRoverEvoque2021 = async () => {
  console.log('Starting to add Range Rover Evoque 2021...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Land Rover')
    .eq('model', 'Range Rover Evoque Hybrid')
    .eq('year', 2021)
    .eq('price', 10000)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Range Rover Evoque 2021 already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Land Rover',
        model: 'Range Rover Evoque Hybrid',
        year: 2021,
        price: 10000,
        mileage: 26500,
        fuel: 'Hybride',
        power: '249 CH',
        transmission: 'Automatique',
        color: 'Gris Métallisé',
        image_url: '/lovable-uploads/50974085-36eb-4e29-9f47-60ab9657dc7b.png',
        badge: 'Elite',
        rating: 4.7,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Land Rover Range Rover Evoque Hybrid 2021 avec motorisation essence + électrique. SUV compact premium avec une puissance de 249 CH développant des performances exceptionnelles tout en restant écologique. Véhicule élégant en gris métallisé avec intérieur cuir premium et nombreux équipements de série. Kilométrage certifié de 26,500 km. Garantie de 24 mois incluse. Boîte automatique et design moderne.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Range Rover Evoque 2021:', vehicleError);
      return;
    }

    console.log('Range Rover Evoque 2021 added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/50974085-36eb-4e29-9f47-60ab9657dc7b.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/9421a5b7-1cb8-4a47-9cb5-eb138c6dd312.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/4c38703f-fd4e-4dd8-a7a5-395308507a9b.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/923db804-bcdd-47a3-8e14-8d4deb86c8ed.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/99e0c5e3-e84f-4073-a9c6-2bcc79be594c.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/cc6ec46f-cb49-4725-a656-fdf5878864b5.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/c0c32dbe-7292-42ec-910f-7eec20c66319.png',
        is_primary: false,
        display_order: 7
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/1ea09b78-8e2a-4887-8005-1560b65f9366.png',
        is_primary: false,
        display_order: 8
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Range Rover Evoque 2021:', imagesError);
    } else {
      console.log('All images added successfully for Range Rover Evoque 2021');
    }

  } catch (error) {
    console.error('Error in addRangeRoverEvoque2021:', error);
  }
};
