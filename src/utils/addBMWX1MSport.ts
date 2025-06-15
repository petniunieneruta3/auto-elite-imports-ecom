
import { supabase } from '@/integrations/supabase/client';

export const addBMWX1MSport = async () => {
  console.log('Starting to add BMW X1 M-Sport...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'BMW')
    .eq('model', 'X1 2.0 18d M-Sport X-Drive')
    .eq('year', 2012)
    .eq('price', 4000)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('BMW X1 M-Sport already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'BMW',
        model: 'X1 2.0 18d M-Sport X-Drive',
        year: 2012,
        price: 4000,
        mileage: 149900,
        fuel: 'Diesel',
        power: '143 CV',
        transmission: 'Automatique',
        color: 'Blanc Alpin Métallisé',
        image_url: '/lovable-uploads/f874ebda-e456-42cd-b962-ddbc01771880.png',
        badge: 'M-Sport',
        rating: 4.6,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'BMW X1 2.0 18d M-Sport X-Drive avec facelift et équipements premium. SUV compact de 2012 avec motorisation diesel 143 CV, transmission automatique et traction intégrale X-Drive. Équipé de nombreuses options : toit panoramique, système audio Harman Kardon, keyless, cuir/alcantara, cruise control, HUD, aide au stationnement PDC, crochet d\'attelage, entretien à jour, éclairage LED, xénon, navigation, capteurs de recul, système média DAB+. Kilométrage certifié de 149,900 km. Nombre de places : 5 avec système Isofix.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding BMW X1 M-Sport:', vehicleError);
      return;
    }

    console.log('BMW X1 M-Sport added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/f874ebda-e456-42cd-b962-ddbc01771880.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/c8750894-de5e-4ea2-9b74-b00f58b97861.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/fc68dbea-53ad-400e-a6c4-129f9d1fb32d.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/61f7e933-39ba-4d81-ac2d-cc4773032b7b.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/96166d35-cc25-416a-a7ea-655c83c8a390.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/867177db-4559-4ac0-96b6-257b4c780ce0.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/0f79adb5-f84d-4933-b2c6-641ad89c04f6.png',
        is_primary: false,
        display_order: 7
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for BMW X1 M-Sport:', imagesError);
    } else {
      console.log('All images added successfully for BMW X1 M-Sport');
    }

  } catch (error) {
    console.error('Error in addBMWX1MSport:', error);
  }
};
