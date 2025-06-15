
import { supabase } from '@/integrations/supabase/client';

export const addBMWX3 = async () => {
  console.log('Starting to add BMW X3...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'BMW')
    .eq('model', 'X3')
    .eq('year', 2011)
    .eq('price', 4000)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('BMW X3 already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'BMW',
        model: 'X3',
        year: 2011,
        price: 4000,
        mileage: 102000,
        fuel: 'Diesel',
        power: '184 Ch',
        transmission: 'Automatique',
        color: 'Noir Métallisé',
        image_url: '/lovable-uploads/c20cdb97-ceb4-4d57-afaa-2ba95f07256f.png',
        badge: 'Elite',
        rating: 4.3,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'BMW X3 2.0 Diesel avec boîte automatique. SUV spacieux et confortable, équipé de nombreuses options. Véhicule avec kilométrage certifié et entretien régulier. Parfait pour les familles et les longs trajets.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding BMW X3:', vehicleError);
      return;
    }

    console.log('BMW X3 added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/c20cdb97-ceb4-4d57-afaa-2ba95f07256f.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/c30e7fec-c526-48e4-b1ff-ffa792de9131.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/655a06af-afd8-4713-bd03-8454238cd048.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/3c1b7383-6e75-490d-9ea4-f32a0a95179f.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/3647e5dc-e079-4ad0-92fb-ab835fb317fa.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/ff78508e-dcec-4c56-9eaf-c762d1d9cd06.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/26e4e999-864b-4859-bc8f-22247519f5ed.png',
        is_primary: false,
        display_order: 7
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/47dd692f-8a05-4297-aff1-0b5f92867079.png',
        is_primary: false,
        display_order: 8
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/f019be7d-fcf1-42e0-8b73-d1a86c188d11.png',
        is_primary: false,
        display_order: 9
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for BMW X3:', imagesError);
    } else {
      console.log('All images added successfully for BMW X3');
    }

  } catch (error) {
    console.error('Error in addBMWX3:', error);
  }
};
