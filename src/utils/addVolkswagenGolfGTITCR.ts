
import { supabase } from '@/integrations/supabase/client';

export const addVolkswagenGolfGTITCR = async () => {
  console.log('Starting to add Volkswagen Golf GTI TCR...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Volkswagen')
    .eq('model', 'Golf GTI TCR')
    .eq('year', 2019)
    .eq('price', 3000)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Volkswagen Golf GTI TCR already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Volkswagen',
        model: 'Golf GTI TCR',
        year: 2019,
        price: 3000,
        mileage: 39000,
        fuel: 'Essence',
        power: '290 Ch',
        transmission: 'Automatique',
        color: 'Rouge Tornado',
        image_url: '/lovable-uploads/d6146992-c029-4e2b-8d99-aa144bbd7581.png',
        badge: 'Elite',
        rating: 4.7,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Volkswagen Golf GTI TCR 290 ch, édition sportive avec équipements premium et performances exceptionnelles. Véhicule essence avec boîte automatique et kilométrage certifié 39 000 km.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Volkswagen Golf GTI TCR:', vehicleError);
      return;
    }

    console.log('Volkswagen Golf GTI TCR added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/d6146992-c029-4e2b-8d99-aa144bbd7581.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/fc339931-f10a-4393-ba81-b118aa85d357.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/0ba93546-6969-4e35-8202-691e855e6c7b.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/553b2d7b-f7c4-431b-aca5-128d7fe8bdb7.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/fdb55976-2155-4afb-8ae3-db26312e3d38.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/6be121b1-b2be-464e-ae84-2dbdb53b953e.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/655fa08c-82a7-40e0-870b-a745c74e545e.png',
        is_primary: false,
        display_order: 7
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/8f4a26b2-b04c-4585-accd-05b82e4d9fe3.png',
        is_primary: false,
        display_order: 8
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/e20929de-7ba0-4efc-a578-c8a38068b487.png',
        is_primary: false,
        display_order: 9
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/f0d590cc-ea81-416e-8b9e-f87ecd07c26f.png',
        is_primary: false,
        display_order: 10
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Volkswagen Golf GTI TCR:', imagesError);
    } else {
      console.log('All images added successfully for Volkswagen Golf GTI TCR');
    }

  } catch (error) {
    console.error('Error in addVolkswagenGolfGTITCR:', error);
  }
};
