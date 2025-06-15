
import { supabase } from '@/integrations/supabase/client';

export const addMercedesGLA45SAMG = async () => {
  console.log('Starting to add Mercedes GLA 45 S AMG...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Mercedes-Benz')
    .eq('model', 'GLA 45 S AMG')
    .eq('year', 2021)
    .eq('price', 15000)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Mercedes GLA 45 S AMG already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Mercedes-Benz',
        model: 'GLA 45 S AMG',
        year: 2021,
        price: 15000,
        mileage: 98870,
        fuel: 'Essence',
        power: '421 CH',
        transmission: 'Automatique',
        color: 'Gris Magno (Mat)',
        image_url: '/lovable-uploads/cca4af40-d741-40e3-a10f-3405eb93cf81.png',
        badge: 'Collector',
        rating: 4.8,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Mercedes-Benz GLA 45 S AMG 4Matic avec finition exclusive MAGNO (mat). SUV compact haute performance équipé du moteur AMG 2.0L turbo de 421 ch, transmission intégrale 4MATIC et boîte automatique AMG Speedshift DCT 8G. Véhicule avec kilométrage certifié et historique complet. Performance exceptionnelle et design exclusif.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Mercedes GLA 45 S AMG:', vehicleError);
      return;
    }

    console.log('Mercedes GLA 45 S AMG added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/cca4af40-d741-40e3-a10f-3405eb93cf81.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/9a9f474e-04a4-4544-9862-9f0eb920754c.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/02f1acc1-ca5e-4190-b3da-c86afab7d5c3.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/d7ff52b6-e870-40f4-bddb-3934e60ec2f3.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/a67ca56c-5032-408c-bfc9-db957c30bd19.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/06bd938c-ae88-4e09-8227-22b18ce604b0.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/9ae064d4-5e8b-47b8-8ac2-10e5fab0c632.png',
        is_primary: false,
        display_order: 7
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/a73b1b2d-4310-4432-a293-7c8ff9928a02.png',
        is_primary: false,
        display_order: 8
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/13e0dd7a-a24e-4f11-9006-aec4418215d4.png',
        is_primary: false,
        display_order: 9
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/81b938eb-e707-4e60-98ff-3b4344fa4062.png',
        is_primary: false,
        display_order: 10
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Mercedes GLA 45 S AMG:', imagesError);
    } else {
      console.log('All images added successfully for Mercedes GLA 45 S AMG');
    }

  } catch (error) {
    console.error('Error in addMercedesGLA45SAMG:', error);
  }
};
