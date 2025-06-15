
import { supabase } from '@/integrations/supabase/client';

export const addMercedesCLA200d = async () => {
  console.log('Adding Mercedes-Benz CLA 200d AMG+Edition-1...');
  
  try {
    // First, check if this exact vehicle already exists
    const { data: existingVehicles, error: checkError } = await supabase
      .from('vehicles')
      .select('id')
      .eq('brand', 'Mercedes-Benz')
      .eq('model', 'CLA 200d AMG+Edition-1')
      .eq('year', 2019)
      .eq('mileage', 87400);

    if (checkError) {
      console.error('Error checking existing vehicle:', checkError);
      return;
    }

    if (existingVehicles && existingVehicles.length > 0) {
      console.log('Mercedes-Benz CLA 200d AMG+Edition-1 already exists, skipping...');
      return existingVehicles[0].id;
    }

    // Add the vehicle
    const vehicleData = {
      brand: 'Mercedes-Benz',
      model: 'CLA 200d AMG+Edition-1',
      year: 2019,
      price: 6000,
      mileage: 87400,
      fuel: 'Diesel',
      power: '136 CH',
      transmission: 'Automatique',
      color: 'Blanc',
      image_url: '/lovable-uploads/70358e1c-d3ca-4904-9d14-971e7539d651.png',
      badge: 'Collector',
      rating: 4.6,
      location: 'Oranienburg',
      availability: 'Sofort verfügbar',
      description: 'Mercedes-Benz CLA 200d AMG+Edition-1 de 2019 avec moteur diesel de 136 CH et transmission automatique. Véhicule avec équipements LED, cuir, panorama F1 et PDC. Kilométrage certifié 87 400 km.'
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
        image_url: '/lovable-uploads/70358e1c-d3ca-4904-9d14-971e7539d651.png',
        is_primary: true,
        display_order: 1,
        alt_text: 'Mercedes-Benz CLA 200d AMG+Edition-1 - Vue avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/c2b6277f-d995-4151-9138-688518637cf3.png',
        is_primary: false,
        display_order: 2,
        alt_text: 'Mercedes-Benz CLA 200d AMG+Edition-1 - Vue de profil'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/b3ef814d-a10a-423d-8c78-a9c7468859a0.png',
        is_primary: false,
        display_order: 3,
        alt_text: 'Mercedes-Benz CLA 200d AMG+Edition-1 - Vue arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/88abf15b-e5c8-4594-ac6b-4f93a69f477e.png',
        is_primary: false,
        display_order: 4,
        alt_text: 'Mercedes-Benz CLA 200d AMG+Edition-1 - Vue trois quarts arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/58533dd5-2a38-45e7-8f0b-659567bd558b.png',
        is_primary: false,
        display_order: 5,
        alt_text: 'Mercedes-Benz CLA 200d AMG+Edition-1 - Intérieur avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/69187642-094b-40fe-964d-fec5a73904d1.png',
        is_primary: false,
        display_order: 6,
        alt_text: 'Mercedes-Benz CLA 200d AMG+Edition-1 - Toit ouvrant panoramique'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/ce595e1d-f270-4d01-ae84-4e566874e464.png',
        is_primary: false,
        display_order: 7,
        alt_text: 'Mercedes-Benz CLA 200d AMG+Edition-1 - Sièges avant en cuir'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/24e5f045-89c1-4593-ae29-b09c3ef11e4f.png',
        is_primary: false,
        display_order: 8,
        alt_text: 'Mercedes-Benz CLA 200d AMG+Edition-1 - Siège conducteur en cuir'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/1c89bd58-02a2-4873-84e0-ffae3c11a2b6.png',
        is_primary: false,
        display_order: 9,
        alt_text: 'Mercedes-Benz CLA 200d AMG+Edition-1 - Banquette arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/e43d0603-9e6f-404c-b221-bc8925086c5b.png',
        is_primary: false,
        display_order: 10,
        alt_text: 'Mercedes-Benz CLA 200d AMG+Edition-1 - Coffre'
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
    console.error('Error in addMercedesCLA200d:', error);
  }
};
