
import { supabase } from '@/integrations/supabase/client';

export const addAudiQ3 = async () => {
  console.log('Starting to add Audi Q3...');
  
  // Check if this specific vehicle already exists
  const { data: existingVehicle, error: checkError } = await supabase
    .from('vehicles')
    .select('id')
    .eq('brand', 'Audi')
    .eq('model', 'Q3')
    .eq('year', 2015)
    .eq('price', 5500)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing vehicle:', checkError);
    return;
  }

  if (existingVehicle) {
    console.log('Audi Q3 already exists, skipping...');
    return;
  }

  try {
    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Audi',
        model: 'Q3',
        year: 2015,
        price: 5500,
        mileage: 97000,
        fuel: 'Diesel',
        power: '140 Ch',
        transmission: 'Automatique',
        color: 'Blanc Glacier Métallisé',
        image_url: '/lovable-uploads/271f6c68-7e1e-425d-b8e8-8d7588d94e00.png',
        badge: 'Elite',
        rating: 4.4,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Audi Q3 2.0 TDI S-Line Quattro avec boîte S-Tronic. SUV compact premium équipé de la transmission intégrale Quattro, finition S-Line sportive. Véhicule avec kilométrage certifié et entretien Audi. Équipements haut de gamme et conduite dynamique.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Audi Q3:', vehicleError);
      return;
    }

    console.log('Audi Q3 added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/271f6c68-7e1e-425d-b8e8-8d7588d94e00.png',
        is_primary: true,
        display_order: 1
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/27c13801-2953-4bc6-890e-922f3c3026c2.png',
        is_primary: false,
        display_order: 2
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/3b4bcaed-eb42-4c71-9759-00b8f730a139.png',
        is_primary: false,
        display_order: 3
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/6dc0151c-99f1-44c3-a824-4465c1c6787a.png',
        is_primary: false,
        display_order: 4
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/1fee1f41-4b53-4265-b4df-8fa94d5a93cb.png',
        is_primary: false,
        display_order: 5
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/942accd6-85c4-4e36-a965-da9bb8255aab.png',
        is_primary: false,
        display_order: 6
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/c345c15b-0cca-4475-a07e-b476035e55aa.png',
        is_primary: false,
        display_order: 7
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/8b82eb64-93e1-48e1-b6e2-c3d1680d06de.png',
        is_primary: false,
        display_order: 8
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/24d3b37e-2b6a-44cd-aeba-732d24826fc2.png',
        is_primary: false,
        display_order: 9
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Audi Q3:', imagesError);
    } else {
      console.log('All images added successfully for Audi Q3');
    }

  } catch (error) {
    console.error('Error in addAudiQ3:', error);
  }
};
