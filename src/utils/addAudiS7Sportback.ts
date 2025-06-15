
import { supabase } from '@/integrations/supabase/client';

export const addAudiS7Sportback = async () => {
  console.log('Starting to add Audi S7 Sportback...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Audi')
    .eq('model', 'S7 Sportback')
    .eq('year', 2017)
    .eq('price', 6000)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Audi S7 Sportback already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Audi',
        model: 'S7 Sportback',
        year: 2017,
        price: 6000,
        mileage: 99800,
        fuel: 'Essence',
        power: '450 CH',
        transmission: 'Automatique',
        color: 'Noir Métallisé',
        image_url: '/lovable-uploads/b793d533-e633-4d35-8e7b-ea326814e84a.png',
        badge: 'Elite',
        rating: 4.9,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Audi S7 Sportback 4.0 TFSI quattro - Une berline sportive d\'exception avec moteur V8 biturbo de 450 CH. Véhicule essence avec boîte automatique et transmission intégrale quattro. Kilométrage certifié 99 800 km. Design élégant et performances exceptionnelles.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Audi S7 Sportback:', vehicleError);
      return;
    }

    console.log('Audi S7 Sportback added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/b793d533-e633-4d35-8e7b-ea326814e84a.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/568e5f30-36e3-49d2-8a86-e46ddad2ebdb.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/b9f39669-68e6-4785-ac34-287769318094.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/e61fb931-a53e-4794-8170-5830ec8a73e6.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/c7df7208-69f5-4de2-a71a-c7660343cf73.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/02ce8975-f75b-4784-8b7b-c110568aee86.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/1a6852a0-1cc6-4024-ae2a-650f6fbd34db.png',
        is_primary: false,
        display_order: 7
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/ba731a33-a5f2-4e44-8c7c-e783792aca43.png',
        is_primary: false,
        display_order: 8
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/a036cde6-80ec-4158-9f72-7f7288b1025c.png',
        is_primary: false,
        display_order: 9
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Audi S7 Sportback:', imagesError);
    } else {
      console.log('All images added successfully for Audi S7 Sportback');
    }

  } catch (error) {
    console.error('Error in addAudiS7Sportback:', error);
  }
};
