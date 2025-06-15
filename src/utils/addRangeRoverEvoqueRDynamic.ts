
import { supabase } from '@/integrations/supabase/client';

export const addRangeRoverEvoqueRDynamic = async () => {
  console.log('Starting to add Range Rover Evoque R-Dynamic SE...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Land Rover')
    .eq('model', 'Range Rover Evoque 2.0 150hp AWD R-Dynamic SE')
    .eq('year', 2019)
    .eq('price', 10000)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Range Rover Evoque R-Dynamic SE already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Land Rover',
        model: 'Range Rover Evoque 2.0 150hp AWD R-Dynamic SE',
        year: 2019,
        price: 10000,
        mileage: 36885,
        fuel: 'Diesel',
        power: '150 CV',
        transmission: 'Automatique',
        color: 'Gris Métallisé',
        image_url: '/lovable-uploads/872dfe93-72f9-4b39-844f-6f87c0112cc6.png',
        badge: 'Elite',
        rating: 4.6,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Land Rover Range Rover Evoque 2.0 150hp AWD R-Dynamic SE avec transmission automatique et traction intégrale. SUV premium de 2019 avec motorisation diesel de 150 CV développant une puissance exceptionnelle. Véhicule élégant en gris métallisé avec intérieur cuir premium, équipé de nombreux équipements de série. Kilométrage certifié de 36,885 km. Emissions CO2 : 149 g/km. Nombre de places : 5.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Range Rover Evoque R-Dynamic SE:', vehicleError);
      return;
    }

    console.log('Range Rover Evoque R-Dynamic SE added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/872dfe93-72f9-4b39-844f-6f87c0112cc6.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/9f49b90e-b8ca-4a37-9cd5-1fd038d65b97.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/742789a7-6a75-4df3-ba78-afeeec374746.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/7a83c721-46ce-4203-859f-8f48e91838b6.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/01fde1a0-ae76-4be2-bf87-ba3a9bf80db5.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/c31af5d4-81e6-4975-97d2-4492dac43998.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/90975ae4-45e8-4515-af94-1e8e5a5e0c1b.png',
        is_primary: false,
        display_order: 7
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/c8684825-6389-47fa-99c4-b144e0a3bc70.png',
        is_primary: false,
        display_order: 8
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/44777eec-f8ec-4078-9763-3faa6c97a4d5.png',
        is_primary: false,
        display_order: 9
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/16cb1d0f-770e-4391-91a7-74065a18622d.png',
        is_primary: false,
        display_order: 10
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Range Rover Evoque R-Dynamic SE:', imagesError);
    } else {
      console.log('All images added successfully for Range Rover Evoque R-Dynamic SE');
    }

  } catch (error) {
    console.error('Error in addRangeRoverEvoqueRDynamic:', error);
  }
};
