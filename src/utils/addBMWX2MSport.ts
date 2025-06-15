
import { supabase } from '@/integrations/supabase/client';

export const addBMWX2MSport = async () => {
  console.log('Starting to add BMW X2 M-Sport...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'BMW')
    .eq('model', 'X2 190 CV M-Sport 4x4')
    .eq('year', 2019)
    .eq('price', 5000)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('BMW X2 M-Sport already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'BMW',
        model: 'X2 190 CV M-Sport 4x4',
        year: 2019,
        price: 5000,
        mileage: 74900,
        fuel: 'Diesel',
        power: '190 CV',
        transmission: 'Automatique',
        color: 'Doré Métallisé',
        image_url: '/lovable-uploads/c63cf11a-1cfb-4430-836e-91b2c3837609.png',
        badge: 'M-Sport',
        rating: 4.7,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'BMW X2 190 CV M-Sport avec transmission automatique et traction intégrale 4x4. SUV compact premium de 2019 avec motorisation diesel de 190 CV développant une puissance exceptionnelle. Véhicule sportif en doré métallisé avec pack M-Sport, équipé de nombreux équipements de série. Kilométrage certifié de 74,900 km. Test Auto NAF effectué. Nombre de places : 5.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding BMW X2 M-Sport:', vehicleError);
      return;
    }

    console.log('BMW X2 M-Sport added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/c63cf11a-1cfb-4430-836e-91b2c3837609.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/b32aa0e4-7483-47cc-9f09-63ffaa14036d.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/e1f4afd8-d55f-4e66-a6f3-8e34aa7fe65e.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/e84d49d6-e5d3-4c12-9840-23adbbb96558.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/558a3813-2b30-48af-9845-970a3af8da45.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/bd36ccab-ba4e-422d-9e2f-8a0c29530be2.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/a605d5ad-44fc-4caf-9b6a-756c4b61e7ed.png',
        is_primary: false,
        display_order: 7
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/d4096d4e-dd9a-4664-90ab-6ea846cce541.png',
        is_primary: false,
        display_order: 8
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/12d315e1-034d-4568-aa1c-acb60ea1c2bd.png',
        is_primary: false,
        display_order: 9
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/06cae5cc-dc0d-4c53-8ccb-8ec0615f53d6.png',
        is_primary: false,
        display_order: 10
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for BMW X2 M-Sport:', imagesError);
    } else {
      console.log('All images added successfully for BMW X2 M-Sport');
    }

  } catch (error) {
    console.error('Error in addBMWX2MSport:', error);
  }
};
