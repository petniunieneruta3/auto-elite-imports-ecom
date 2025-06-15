
import { supabase } from '@/integrations/supabase/client';

export const addMercedesGLE350d = async () => {
  console.log('Starting to add Mercedes GLE 350d Coupé...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Mercedes-Benz')
    .eq('model', 'GLE 350d Coupé 4-Matic')
    .eq('year', 2018)
    .eq('price', 11000)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Mercedes GLE 350d Coupé already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Mercedes-Benz',
        model: 'GLE 350d Coupé 4-Matic',
        year: 2018,
        price: 11000,
        mileage: 69800,
        fuel: 'Diesel',
        power: '258 ch',
        transmission: 'Automatique',
        color: 'Gris Métallisé',
        image_url: '/lovable-uploads/c0f2ef34-c01e-4e8a-99a9-d81ceb43a03e.png',
        badge: 'Elite',
        rating: 4.6,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Mercedes-Benz GLE 350d Coupé 4-Matic Pack AMG Pack Night avec toit panoramique. Moteur diesel de 258 ch, boîte automatique, transmission intégrale 4Matic. Véhicule avec garantie 24 mois et kilométrage certifié. Pack AMG et Pack Night inclus.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Mercedes GLE 350d Coupé:', vehicleError);
      return;
    }

    console.log('Mercedes GLE 350d Coupé added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/c0f2ef34-c01e-4e8a-99a9-d81ceb43a03e.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/27972011-20a1-4d5d-be5f-066aa52e9315.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/38a7ac7c-5b3f-404d-861d-232a1d8cb419.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/1b5a8940-7261-4fcb-a627-312324f0a258.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/680ff020-47fb-4dbd-b313-b3749da30589.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/0412bc0f-a575-4965-9c7c-96a7e5f9bee0.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/74b863e4-9409-40be-ab4e-70212fb095f1.png',
        is_primary: false,
        display_order: 7
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Mercedes GLE 350d Coupé:', imagesError);
    } else {
      console.log('All images added successfully for Mercedes GLE 350d Coupé');
    }

  } catch (error) {
    console.error('Error in addMercedesGLE350d:', error);
  }
};
