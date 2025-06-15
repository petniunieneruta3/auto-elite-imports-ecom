
import { supabase } from '@/integrations/supabase/client';

export const addVolvoV90 = async () => {
  console.log('Adding Volvo V90 T8 AWD Inscription...');
  
  try {
    // First, check if this exact vehicle already exists
    const { data: existingVehicles, error: checkError } = await supabase
      .from('vehicles')
      .select('id')
      .eq('brand', 'Volvo')
      .eq('model', 'V90 T8 AWD Inscription')
      .eq('year', 2019)
      .eq('mileage', 151200);

    if (checkError) {
      console.error('Error checking existing vehicle:', checkError);
      return;
    }

    if (existingVehicles && existingVehicles.length > 0) {
      console.log('Volvo V90 T8 AWD Inscription already exists, skipping...');
      return existingVehicles[0].id;
    }

    // Add the vehicle
    const vehicleData = {
      brand: 'Volvo',
      model: 'V90 T8 AWD Inscription',
      year: 2019,
      price: 5700,
      mileage: 151200,
      fuel: 'Hybride Essence',
      power: '390 CV',
      transmission: 'Automatique',
      color: 'Noir',
      image_url: '/lovable-uploads/4f7c38ea-9b87-4fba-8dfe-f83045f3282f.png',
      badge: 'Elite',
      rating: 4.5,
      location: 'Oranienburg',
      availability: 'Sofort verfügbar',
      description: 'Volvo V90 T8 AWD Inscription de 2019 avec équipements premium. Véhicule hybride essence avec transmission automatique et quatre roues motrices. Kilométrage certifié 151 200 km.'
    };

    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert([vehicleData])
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding vehicle:', vehicleError);
      return;
    }

    console.log('Vehicle added successfully:', vehicle.id);

    // Add images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/4f7c38ea-9b87-4fba-8dfe-f83045f3282f.png',
        is_primary: true,
        display_order: 1,
        alt_text: 'Volvo V90 T8 AWD Inscription - Vue avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/dad4c304-54a7-4f9a-8d4f-f58440ccd56e.png',
        is_primary: false,
        display_order: 2,
        alt_text: 'Volvo V90 T8 AWD Inscription - Vue trois quarts arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/dd572fbd-f4bc-4a24-9046-d1ee3ae11566.png',
        is_primary: false,
        display_order: 3,
        alt_text: 'Volvo V90 T8 AWD Inscription - Vue arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/ff037505-cfa6-447a-aef7-a7e50282cb91.png',
        is_primary: false,
        display_order: 4,
        alt_text: 'Volvo V90 T8 AWD Inscription - Coffre'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/96ae8b13-2b98-4bca-9b9c-e90628ffa628.png',
        is_primary: false,
        display_order: 5,
        alt_text: 'Volvo V90 T8 AWD Inscription - Tableau de bord'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/02d979b1-9473-41fc-afae-215ee890c833.png',
        is_primary: false,
        display_order: 6,
        alt_text: 'Volvo V90 T8 AWD Inscription - Intérieur avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/75f57bb7-8f80-4aba-aee0-7fe3d81cbc04.png',
        is_primary: false,
        display_order: 7,
        alt_text: 'Volvo V90 T8 AWD Inscription - Détail avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/ec210038-62bb-4d42-9498-5d3b39160f32.png',
        is_primary: false,
        display_order: 8,
        alt_text: 'Volvo V90 T8 AWD Inscription - Console centrale'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/650d2b25-5d17-4d39-8566-6dc53b079e52.png',
        is_primary: false,
        display_order: 9,
        alt_text: 'Volvo V90 T8 AWD Inscription - Volant et instrumentation'
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding vehicle images:', imagesError);
      return;
    }

    console.log('Vehicle images added successfully');
    return vehicle.id;

  } catch (error) {
    console.error('Error in addVolvoV90:', error);
  }
};
