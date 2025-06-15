
import { supabase } from '@/integrations/supabase/client';

export const addMercedesCLA = async () => {
  console.log('Adding Mercedes CLA 250 e...');
  
  try {
    // First, check if this exact vehicle already exists
    const { data: existingVehicles, error: checkError } = await supabase
      .from('vehicles')
      .select('id')
      .eq('brand', 'Mercedes-Benz')
      .eq('model', 'CLA 250 e 8G-DCT AMG LINE')
      .eq('year', 2022)
      .eq('mileage', 45837);

    if (checkError) {
      console.error('Error checking existing vehicle:', checkError);
      return;
    }

    if (existingVehicles && existingVehicles.length > 0) {
      console.log('Mercedes CLA 250 e already exists, skipping...');
      return existingVehicles[0].id;
    }

    // Add the vehicle
    const vehicleData = {
      brand: 'Mercedes-Benz',
      model: 'CLA 250 e 8G-DCT AMG LINE',
      year: 2022,
      price: 10000,
      mileage: 45837,
      fuel: 'Hybride',
      power: '8 ch',
      transmission: 'Automatique',
      color: 'Polar white',
      image_url: '/lovable-uploads/edbbaafd-5874-4226-b635-baa4a3de5a9a.png',
      badge: 'Elite',
      rating: 4.5,
      location: 'Oranienburg',
      availability: 'Sofort verfügbar',
      description: 'Mercedes CLA 250 e 8G-DCT AMG LINE de 2022 avec garantie 48 mois. Véhicule hybride avec transmission automatique et traction avant. Intérieur en tissu/simili-cuir/microfibre noir/anthracite.'
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
        image_url: '/lovable-uploads/edbbaafd-5874-4226-b635-baa4a3de5a9a.png',
        is_primary: true,
        display_order: 1,
        alt_text: 'Mercedes CLA 250 e - Vue avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/59cf6b60-61c4-49b5-91c7-4a9774ce21e4.png',
        is_primary: false,
        display_order: 2,
        alt_text: 'Mercedes CLA 250 e - Vue avant face'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/27de022d-ae58-460d-ba69-55eaa4df28f6.png',
        is_primary: false,
        display_order: 3,
        alt_text: 'Mercedes CLA 250 e - Vue arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/60645c3a-65fa-4c31-ba31-33d03d9cde78.png',
        is_primary: false,
        display_order: 4,
        alt_text: 'Mercedes CLA 250 e - Vue arrière trois quarts'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/324e09be-f07c-4968-9d83-960ab081dd6b.png',
        is_primary: false,
        display_order: 5,
        alt_text: 'Mercedes CLA 250 e - Vue profil'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/7b1ba0d2-34e6-4d13-bf9a-962f35ce97c4.png',
        is_primary: false,
        display_order: 6,
        alt_text: 'Mercedes CLA 250 e - Intérieur arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/ea577f50-0a84-4ba4-a22b-a1853f23884f.png',
        is_primary: false,
        display_order: 7,
        alt_text: 'Mercedes CLA 250 e - Intérieur tableau de bord'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/3c35df0d-a5a2-409d-91df-3bdbf0599615.png',
        is_primary: false,
        display_order: 8,
        alt_text: 'Mercedes CLA 250 e - Intérieur sièges avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/5624c3dc-358f-4041-8156-95219a55f411.png',
        is_primary: false,
        display_order: 9,
        alt_text: 'Mercedes CLA 250 e - Moteur'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/2a919246-a363-47dc-a323-042d35506a9a.png',
        is_primary: false,
        display_order: 10,
        alt_text: 'Mercedes CLA 250 e - Tableau de bord digital'
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
    console.error('Error in addMercedesCLA:', error);
  }
};
