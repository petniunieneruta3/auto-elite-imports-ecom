
import { supabase } from '@/integrations/supabase/client';

export const addVolkswagenGolfGTE2016 = async () => {
  console.log('Starting to add Volkswagen Golf GTE 2016...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Volkswagen')
    .eq('model', 'Golf GTE 204 ch hybride WEBASTO ACC')
    .eq('year', 2016)
    .eq('price', 2000)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Volkswagen Golf GTE 2016 already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Volkswagen',
        model: 'Golf GTE 204 ch hybride WEBASTO ACC',
        year: 2016,
        price: 2000,
        mileage: 86500,
        fuel: 'Électricité + Essence',
        power: '224 Ch',
        transmission: 'Automatique',
        color: 'Blanc Pur',
        image_url: '/lovable-uploads/b6cf4ccc-7a22-4b64-a2fa-841917853ae2.png',
        badge: 'Elite',
        rating: 4.6,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Volkswagen Golf GTE 204 ch hybride avec équipements premium : WEBASTO, ACC (régulateur de vitesse adaptatif), avec rapport de condition détaillé. Véhicule hybride essence-électricité avec boîte automatique et kilométrage certifié 86 500 km.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Volkswagen Golf GTE 2016:', vehicleError);
      return;
    }

    console.log('Volkswagen Golf GTE 2016 added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/b6cf4ccc-7a22-4b64-a2fa-841917853ae2.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/53fa660c-73bd-4439-a61b-0f79d86eb9da.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/4f5c5d94-9070-4be5-a49c-b3da3de9b39e.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/6363126e-50a0-4d5d-9d8f-666de080ffd0.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/11d14f5c-7f47-46e9-8dc7-e4de5ecab57f.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/81af1284-bc3d-49cf-a6e7-39459b6dad73.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/c55795d5-60fa-4a63-b426-0ad6b58648ab.png',
        is_primary: false,
        display_order: 7
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/ae8955dc-afde-4190-a484-5896607db01e.png',
        is_primary: false,
        display_order: 8
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/b8c83bd5-2d2b-4a76-b2e7-f373f04b52dc.png',
        is_primary: false,
        display_order: 9
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/2e151e87-5776-4754-a19d-2195090f7476.png',
        is_primary: false,
        display_order: 10
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Volkswagen Golf GTE 2016:', imagesError);
    } else {
      console.log('All images added successfully for Volkswagen Golf GTE 2016');
    }

  } catch (error) {
    console.error('Error in addVolkswagenGolfGTE2016:', error);
  }
};
