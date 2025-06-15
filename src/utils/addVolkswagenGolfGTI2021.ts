
import { supabase } from '@/integrations/supabase/client';

export const addVolkswagenGolfGTI2021 = async () => {
  console.log('Starting to add Volkswagen Golf GTI 2021...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Volkswagen')
    .eq('model', 'Golf GTI')
    .eq('year', 2021)
    .eq('price', 6200)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Volkswagen Golf GTI 2021 already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Volkswagen',
        model: 'Golf GTI',
        year: 2021,
        price: 6200,
        mileage: 50750,
        fuel: 'Essence',
        power: '245 CV',
        transmission: 'Automatique',
        color: 'Gris Métallisé',
        image_url: '/lovable-uploads/9143eeca-9167-4028-9b1b-1815372e0244.png',
        badge: 'Elite',
        rating: 4.8,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Volkswagen Golf GTI 2.0 TSI DSG avec équipements premium : Pano, H&K, CarPlay, P Sensor, Keyless, PDC, Head Up, Cruise Adaptatif, UE ok, Krok, 5 Places, Alcantara, Isofix, Entretien ok, Xenon, Crochet, Clima, USB, Cam, Navi, Média, DAB+. Véhicule essence avec boîte automatique DSG et kilométrage certifié 50 750 km.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Volkswagen Golf GTI 2021:', vehicleError);
      return;
    }

    console.log('Volkswagen Golf GTI 2021 added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/9143eeca-9167-4028-9b1b-1815372e0244.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/e1e47691-bfd5-4daa-a3f3-af070651058e.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/cc080bc3-b8be-447d-9588-54cbd7e7b5ee.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/73ff2bbf-5495-4c04-bbf1-73ee2145ba9c.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/2de6e5fa-7c77-476b-ad52-b0bbf6ead73f.png',
        is_primary: false,
        display_order: 5
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Volkswagen Golf GTI 2021:', imagesError);
    } else {
      console.log('All images added successfully for Volkswagen Golf GTI 2021');
    }

  } catch (error) {
    console.error('Error in addVolkswagenGolfGTI2021:', error);
  }
};
