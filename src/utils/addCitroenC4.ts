
import { supabase } from '@/integrations/supabase/client';

export const addCitroenC4 = async () => {
  console.log('Starting to add Citroën C4...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Citroën')
    .eq('model', 'C4')
    .eq('year', 2015)
    .eq('price', 2300)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Citroën C4 already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Citroën',
        model: 'C4',
        year: 2015,
        price: 2300,
        mileage: 157685,
        fuel: 'Essence',
        power: '131 CH',
        transmission: 'Automatique',
        color: 'Blanc Perle Nacré',
        image_url: '/lovable-uploads/afa31483-5677-409b-9255-118d2b3199ba.png',
        badge: 'Elite',
        rating: 4.2,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Citroën C4 1.2 PureTech avec équipements de confort. Berline compacte économique équipée du moteur essence 1.2L PureTech de 131 ch et boîte automatique. Véhicule avec kilométrage certifié et entretien régulier. Idéal pour un usage quotidien avec confort et économie.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Citroën C4:', vehicleError);
      return;
    }

    console.log('Citroën C4 added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/afa31483-5677-409b-9255-118d2b3199ba.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/1d611fe2-71c7-48ce-9d58-80e7ccdbf63f.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/c56b4d55-404c-42c1-828d-68a9a20befd7.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/e550f44f-e90e-4088-a03c-73091ae69e57.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/3fb837db-22b3-47a1-a21f-2c33323a6f40.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/cee7cdb9-f6ee-464c-a855-2e725ddc0413.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/21178540-b239-45ca-932f-087ce289e1f0.png',
        is_primary: false,
        display_order: 7
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Citroën C4:', imagesError);
    } else {
      console.log('All images added successfully for Citroën C4');
    }

  } catch (error) {
    console.error('Error in addCitroenC4:', error);
  }
};
