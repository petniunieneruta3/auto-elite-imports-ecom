
import { supabase } from '@/integrations/supabase/client';

export const addAudiA3Sportback = async () => {
  console.log('Starting to add Audi A3 Sportback...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Audi')
    .eq('model', 'A3 Sportback 2.0 TDI quattro S-line BlackOptic')
    .eq('year', 2016)
    .eq('price', 6000)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Audi A3 Sportback already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Audi',
        model: 'A3 Sportback 2.0 TDI quattro S-line BlackOptic',
        year: 2016,
        price: 6000,
        mileage: 148799,
        fuel: 'Diesel',
        power: '185 CV',
        transmission: 'Automatique',
        color: 'Gris Métallisé',
        image_url: '/lovable-uploads/bc25f31f-1cb9-4bbd-850e-9a5f6a194a2f.png',
        badge: 'Elite',
        rating: 4.6,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Audi A3 Sportback 2.0 TDI quattro avec finition 3x S-line et pack BlackOptic. Véhicule avec toit panoramique, transmission intégrale quattro et moteur diesel performant de 185 CV. Intérieur S-line avec sellerie sportive et équipements haut de gamme. Véhicule avec kilométrage certifié et historique d\'entretien suivi.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Audi A3 Sportback:', vehicleError);
      return;
    }

    console.log('Audi A3 Sportback added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/bc25f31f-1cb9-4bbd-850e-9a5f6a194a2f.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/a62d4dc4-0d73-4c91-8cd6-f329a0d1ffe0.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/eaefcf34-f544-4410-9e57-70fe3da36b59.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/267cae64-5512-4967-8423-3ab215c14029.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/6df5d9ef-8331-4f6f-b97f-7c45fdfb6eba.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/159362bf-a334-4cc7-8689-6065bbdf7cc9.png',
        is_primary: false,
        display_order: 6
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Audi A3 Sportback:', imagesError);
    } else {
      console.log('All images added successfully for Audi A3 Sportback');
    }

  } catch (error) {
    console.error('Error in addAudiA3Sportback:', error);
  }
};
