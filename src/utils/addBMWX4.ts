
import { supabase } from '@/integrations/supabase/client';

export const addBMWX4 = async () => {
  console.log('Starting to add BMW X4...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'BMW')
    .eq('model', 'X4')
    .eq('year', 2016)
    .eq('price', 12000)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('BMW X4 already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'BMW',
        model: 'X4',
        year: 2016,
        price: 12000,
        mileage: 100000,
        fuel: 'Diesel',
        power: '190 CV',
        transmission: 'Automatique',
        color: 'Blanc Alpin Métallisé',
        image_url: '/lovable-uploads/0eb79335-550c-48bb-b3f9-30a955b713ae.png',
        badge: 'Elite',
        rating: 4.6,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'BMW X4 20D xDrive M-Sport avec caméra de recul. SUV coupé premium équipé de la transmission intégrale xDrive, finition M-Sport et nombreux équipements. Véhicule avec kilométrage certifié et entretien BMW. Design sportif et performances exceptionnelles.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding BMW X4:', vehicleError);
      return;
    }

    console.log('BMW X4 added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/0eb79335-550c-48bb-b3f9-30a955b713ae.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/2fa08eaf-a901-4bed-b553-54534768a3e4.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/61c4f6b9-4c82-4187-98a3-906f7bcd2eab.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/65819d80-f66f-487e-a8cd-893ba3f84994.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/99ae588a-72ae-49b8-ac4b-adfa8ee1b13d.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/0c63a0bc-2b48-4c04-a68e-fcd2e8ff89a6.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/1b189215-3764-4341-bec3-c1aaf7de6c9b.png',
        is_primary: false,
        display_order: 7
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/bc338245-3455-4d7a-ad34-f1f7d94d5802.png',
        is_primary: false,
        display_order: 8
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/48d7891d-078a-4f5b-8947-a125eac67667.png',
        is_primary: false,
        display_order: 9
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/1084ec56-714d-4038-b2af-91cbdc5ca54c.png',
        is_primary: false,
        display_order: 10
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for BMW X4:', imagesError);
    } else {
      console.log('All images added successfully for BMW X4');
    }

  } catch (error) {
    console.error('Error in addBMWX4:', error);
  }
};
