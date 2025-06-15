
import { supabase } from '@/integrations/supabase/client';

export const addVolvoXC60 = async () => {
  console.log('Adding Volvo XC60 T8...');
  
  try {
    // First, check if this exact vehicle already exists
    const { data: existingVehicles, error: checkError } = await supabase
      .from('vehicles')
      .select('id')
      .eq('brand', 'Volvo')
      .eq('model', 'XC60 T8 AWD Inscription')
      .eq('year', 2018)
      .eq('mileage', 98300);

    if (checkError) {
      console.error('Error checking existing vehicle:', checkError);
      return;
    }

    if (existingVehicles && existingVehicles.length > 0) {
      console.log('Volvo XC60 T8 already exists, skipping...');
      return existingVehicles[0].id;
    }

    // Add the vehicle
    const vehicleData = {
      brand: 'Volvo',
      model: 'XC60 T8 AWD Inscription',
      year: 2018,
      price: 6000,
      mileage: 98300,
      fuel: 'Hybride Essence',
      power: '390 CV',
      transmission: 'Automatique',
      color: 'Noir',
      image_url: '/lovable-uploads/aedc566c-e7a3-42d7-ba88-72c93f14e6f7.png',
      badge: 'Elite',
      rating: 4.5,
      location: 'Oranienburg',
      availability: 'Sofort verfügbar',
      description: 'Volvo XC60 T8 AWD Inscription de 2018 avec équipements premium. Véhicule hybride essence avec transmission automatique et quatre roues motrices. ACC/Panorama/Keyless/HeadUp/Attelage inclus.'
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
        image_url: '/lovable-uploads/aedc566c-e7a3-42d7-ba88-72c93f14e6f7.png',
        is_primary: true,
        display_order: 1,
        alt_text: 'Volvo XC60 T8 - Vue avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/5cb763f2-bcac-49c0-9594-9b33bfa544bf.png',
        is_primary: false,
        display_order: 2,
        alt_text: 'Volvo XC60 T8 - Vue trois quarts avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/9296b23b-0b74-4f93-a6dd-54774eb1f853.png',
        is_primary: false,
        display_order: 3,
        alt_text: 'Volvo XC60 T8 - Vue arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/06b07947-bbd3-457d-af83-f9e18de0b1e9.png',
        is_primary: false,
        display_order: 4,
        alt_text: 'Volvo XC60 T8 - Intérieur arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/e1d88bd9-9734-4f35-8c42-6a4ab5b20733.png',
        is_primary: false,
        display_order: 5,
        alt_text: 'Volvo XC60 T8 - Intérieur avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/be729534-9ce0-4ccd-a686-86cccf8262d8.png',
        is_primary: false,
        display_order: 6,
        alt_text: 'Volvo XC60 T8 - Tableau de bord'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/3194ced5-7143-450e-8a2d-af8fb927fecc.png',
        is_primary: false,
        display_order: 7,
        alt_text: 'Volvo XC60 T8 - Volant et instrumentation'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/0b443c52-3844-4e2b-a215-d4de23bd29fe.png',
        is_primary: false,
        display_order: 8,
        alt_text: 'Volvo XC60 T8 - Vue profil'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/fd00f184-360b-403a-81b8-b9568d5dbaff.png',
        is_primary: false,
        display_order: 9,
        alt_text: 'Volvo XC60 T8 - Détail feu arrière'
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
    console.error('Error in addVolvoXC60:', error);
  }
};
