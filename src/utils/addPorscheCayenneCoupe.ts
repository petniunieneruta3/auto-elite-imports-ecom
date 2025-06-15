
import { supabase } from '@/integrations/supabase/client';

export const addPorscheCayenneCoupe = async () => {
  console.log('Starting to add Porsche Cayenne Coupé E-Hybrid...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Porsche')
    .eq('model', 'Cayenne Coupé E-Hybrid')
    .eq('year', 2018)
    .eq('price', 15000)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Porsche Cayenne Coupé E-Hybrid already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Porsche',
        model: 'Cayenne Coupé E-Hybrid',
        year: 2018,
        price: 15000,
        mileage: 99800,
        fuel: 'Hybride rechargeable',
        power: '476 CH',
        transmission: 'Automatique',
        color: 'Argent Métallisé',
        image_url: '/lovable-uploads/d34c273e-7f02-4584-a99a-6153ff3cbb2b.png',
        badge: 'Collector',
        rating: 4.8,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Porsche Cayenne Coupé 3.0 E-Hybrid Sportdesign avec motorisation hybride rechargeable de 476 ch. SUV coupé premium avec technologie hybride avancée, finition Sportdesign et équipements haut de gamme. Véhicule avec kilométrage certifié et historique d\'entretien suivi.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Porsche Cayenne Coupé E-Hybrid:', vehicleError);
      return;
    }

    console.log('Porsche Cayenne Coupé E-Hybrid added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/d34c273e-7f02-4584-a99a-6153ff3cbb2b.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/7d5c3875-b33c-44fc-9d4b-9c841e6373b5.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/3bb330be-401b-41aa-acb3-7c7f90a8195f.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/48ee2b85-b0f1-440f-8987-554f406b98a0.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/ab900fe1-7976-4a1d-8858-62526651fd7c.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/4bd5a772-adf9-4cde-be7c-4068c82dc14f.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/fbb78ff6-c939-4707-8537-2da9295e402e.png',
        is_primary: false,
        display_order: 7
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Porsche Cayenne Coupé E-Hybrid:', imagesError);
    } else {
      console.log('All images added successfully for Porsche Cayenne Coupé E-Hybrid');
    }

  } catch (error) {
    console.error('Error in addPorscheCayenneCoupe:', error);
  }
};
