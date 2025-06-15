
import { supabase } from '@/integrations/supabase/client';

export const addVolkswagenGolfGTE = async () => {
  console.log('Starting to add Volkswagen Golf GTE...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Volkswagen')
    .eq('model', 'Golf GTE')
    .eq('year', 2019)
    .eq('price', 3000)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Volkswagen Golf GTE already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Volkswagen',
        model: 'Golf GTE',
        year: 2019,
        price: 3000,
        mileage: 79400,
        fuel: 'Essence+Électrique',
        power: '258 Ch',
        transmission: 'Automatique DSG',
        color: 'Gris Métallisé',
        image_url: '/lovable-uploads/c63d2e56-d53b-4c9b-843d-e2e5aee38e8d.png',
        badge: 'Elite',
        rating: 4.7,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Volkswagen Golf GTE 1.4 hybride rechargeable avec boîte DSG automatique. Équipé de nombreuses options : Keyless, ACC, LED, Webasto, attelage, caméra de recul, navigation, DAB+. Véhicule avec kilométrage certifié et toutes les options premium.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Volkswagen Golf GTE:', vehicleError);
      return;
    }

    console.log('Volkswagen Golf GTE added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/c63d2e56-d53b-4c9b-843d-e2e5aee38e8d.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/de4a885f-ca66-4e16-901c-43dec13b05af.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/1a9df696-84cc-4f43-89a3-b945db48a7f1.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/5c017f19-df1f-4e8c-8538-4e0b3f533bb2.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/6d829efb-921b-4b8d-9789-d86043e0f026.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/df61ecd5-6263-47b2-a9c0-51b08f967643.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/12dd7134-1a2d-4975-90e0-9f3f18a0f91c.png',
        is_primary: false,
        display_order: 7
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/26a9e797-6e78-407b-b3ac-9a2ceea0fc95.png',
        is_primary: false,
        display_order: 8
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Volkswagen Golf GTE:', imagesError);
    } else {
      console.log('All images added successfully for Volkswagen Golf GTE');
    }

  } catch (error) {
    console.error('Error in addVolkswagenGolfGTE:', error);
  }
};
