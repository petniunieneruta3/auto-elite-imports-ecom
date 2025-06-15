
import { supabase } from '@/integrations/supabase/client';

export const addMercedesCLA200AMG = async () => {
  console.log('Starting to add Mercedes CLA 200 AMG...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Mercedes-Benz')
    .eq('model', 'CLA 200 AMG')
    .eq('year', 2013)
    .eq('price', 4000)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Mercedes CLA 200 AMG already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Mercedes-Benz',
        model: 'CLA 200 AMG',
        year: 2013,
        price: 4000,
        mileage: 155000,
        fuel: 'Essence',
        power: '156 ch',
        transmission: 'Automatique',
        color: 'Gris Montagne Métallisé',
        image_url: '/lovable-uploads/4aec6dfb-90da-4ab9-b57d-4401b5a67b08.png',
        badge: 'Elite',
        rating: 4.5,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Mercedes-Benz CLA 200 AMG avec équipement complet incluant navigation et régulateur de vitesse. Moteur 1.6L essence de 156 ch, boîte automatique. Véhicule bien entretenu avec kilométrage certifié.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Mercedes CLA 200 AMG:', vehicleError);
      return;
    }

    console.log('Mercedes CLA 200 AMG added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/4aec6dfb-90da-4ab9-b57d-4401b5a67b08.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/b6454263-de75-4ba9-a449-0147f69ea127.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/cdd1146a-4eb7-46a0-863a-b3aa58c29d26.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/dbb4d9fc-dcfe-473e-925c-95545b768010.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/ea49159d-36e6-499d-94db-776e89d3304c.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/3fcbc678-f6be-4fe9-9bd6-29eabc3abcb8.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/f9132487-781f-452e-9aed-f0a2f013d932.png',
        is_primary: false,
        display_order: 7
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/b151e40d-4c63-4f11-bb2f-86a6ad710503.png',
        is_primary: false,
        display_order: 8
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/bc9d8c38-8cba-4ecb-bc48-683b896fe626.png',
        is_primary: false,
        display_order: 9
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Mercedes CLA 200 AMG:', imagesError);
    } else {
      console.log('All images added successfully for Mercedes CLA 200 AMG');
    }

  } catch (error) {
    console.error('Error in addMercedesCLA200AMG:', error);
  }
};
