
import { supabase } from '@/integrations/supabase/client';

export const addFordMondeoHybrid = async () => {
  console.log('Starting to add Ford Mondeo Hybrid...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Ford')
    .eq('model', 'Mondeo Hybrid 2.0')
    .eq('year', 2015)
    .eq('price', 2200)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Ford Mondeo Hybrid already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Ford',
        model: 'Mondeo Hybrid 2.0',
        year: 2015,
        price: 2200,
        mileage: 43921,
        fuel: 'Hybride (Essence + Électricité)',
        power: '187 CH',
        transmission: 'Automatique',
        color: 'Rouge Métallisé',
        image_url: '/lovable-uploads/95011341-2b91-4e92-8109-f387834f8dba.png',
        badge: 'Elite',
        rating: 4.4,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Ford Mondeo Hybrid 2.0 avec motorisation hybride essence-électricité développant 187 ch. Véhicule économique et écologique avec transmission automatique et faible kilométrage certifié de 43 921 km. Intérieur spacieux et confortable avec équipements modernes et tableau de bord digital.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Ford Mondeo Hybrid:', vehicleError);
      return;
    }

    console.log('Ford Mondeo Hybrid added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/95011341-2b91-4e92-8109-f387834f8dba.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/78e55b12-a515-412d-95c8-5727f47bec82.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/e1df2da0-7b5d-4078-a577-a63b50f30790.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/4359cd60-edb2-4459-a6ab-d2cba345177e.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/b2fdce05-7749-48d7-8028-2fca3e6fecb9.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/e062c2dc-4c10-42e9-84e9-105c766bcef0.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/4c03e3bc-af08-4959-b556-79254137c7c0.png',
        is_primary: false,
        display_order: 7
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/a3f11ee6-ae1d-4707-81e1-2396155f100e.png',
        is_primary: false,
        display_order: 8
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/314771a3-5447-42e8-8bbc-b35c7258af69.png',
        is_primary: false,
        display_order: 9
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/c947b956-b738-4799-98de-23e3bdd93953.png',
        is_primary: false,
        display_order: 10
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Ford Mondeo Hybrid:', imagesError);
    } else {
      console.log('All images added successfully for Ford Mondeo Hybrid');
    }

  } catch (error) {
    console.error('Error in addFordMondeoHybrid:', error);
  }
};
