
import { supabase } from '@/integrations/supabase/client';

export const addVolkswagenGolfRLine = async () => {
  console.log('Starting to add Volkswagen Golf R-Line...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Volkswagen')
    .eq('model', 'Golf R-Line')
    .eq('year', 2014)
    .eq('price', 2800)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Volkswagen Golf R-Line already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Volkswagen',
        model: 'Golf R-Line',
        year: 2014,
        price: 2800,
        mileage: 103000,
        fuel: 'Essence',
        power: '140 CH',
        transmission: 'Automatique',
        color: 'Bleu Métallisé',
        image_url: '/lovable-uploads/132837de-6cc1-44c3-9709-d31a152cebc4.png',
        badge: 'Elite',
        rating: 4.3,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Volkswagen Golf 1.4 R-Line DSG avec équipements sportifs. Berline compacte avec moteur essence 1.4L de 140 ch et boîte automatique DSG. Finition R-Line avec éléments sportifs, jantes alliage et intérieur premium. Véhicule avec kilométrage certifié et entretien régulier.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Volkswagen Golf R-Line:', vehicleError);
      return;
    }

    console.log('Volkswagen Golf R-Line added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/132837de-6cc1-44c3-9709-d31a152cebc4.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/3d43dd0b-6cd7-4342-92b8-63a0999becfb.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/a1674842-068d-47b6-8f09-1993c77c261d.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/39fd3907-0ba5-441f-a7c3-326b63161c0d.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/56a9fcc8-9b51-40f0-bf0c-9b93ee99e53e.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/13867c17-43cf-4d45-991c-abe681ccb141.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/b5e20e84-e810-4ae3-9ff1-fa7657a234e0.png',
        is_primary: false,
        display_order: 7
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/e6cc4129-8ac3-4f9d-a770-baaf7e0e775e.png',
        is_primary: false,
        display_order: 8
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/e393663d-cd65-445e-8b19-bd190a34d8ba.png',
        is_primary: false,
        display_order: 9
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/261436af-a48f-46e8-8f24-3a7b1b230940.png',
        is_primary: false,
        display_order: 10
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Volkswagen Golf R-Line:', imagesError);
    } else {
      console.log('All images added successfully for Volkswagen Golf R-Line');
    }

  } catch (error) {
    console.error('Error in addVolkswagenGolfRLine:', error);
  }
};
