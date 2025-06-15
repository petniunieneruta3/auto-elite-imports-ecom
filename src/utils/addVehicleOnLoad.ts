
import { supabase } from '@/integrations/supabase/client';

export const addMercedesGLCIfNotExists = async () => {
  try {
    console.log('Checking if Mercedes GLC already exists...');
    
    // Check if this specific vehicle already exists
    const { data: existingVehicle, error: checkError } = await supabase
      .from('vehicles')
      .select('id')
      .eq('brand', 'Mercedes-Benz')
      .eq('model', 'GLC 220 d Coupé 4-Matic PACK AMG')
      .eq('year', 2018)
      .eq('mileage', 92696)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking for existing vehicle:', checkError);
      return;
    }

    if (existingVehicle) {
      console.log('Mercedes GLC already exists, skipping...');
      return;
    }

    console.log('Adding Mercedes GLC to database...');
    
    // Add the vehicle
    const { data: vehicleData, error: vehicleError } = await supabase
      .from('vehicles')
      .insert([{
        brand: 'Mercedes-Benz',
        model: 'GLC 220 d Coupé 4-Matic PACK AMG',
        year: 2018,
        price: 13000,
        mileage: 92696,
        fuel: 'Diesel',
        power: '170 CH',
        transmission: 'Automatique',
        color: 'Bleu Foncé',
        image_url: '/lovable-uploads/7bc0664f-d468-4159-b451-ba0ee9ef5e93.png',
        badge: 'Elite',
        rating: 4.7,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Mercedes-Benz GLC 220 d Coupé 4-Matic PACK AMG de 2018 en excellent état. Véhicule certifié avec 92.696 km, jamais accidenté avec certificat Car-pass. Garantie de 18 mois incluse. Motorisation diesel de 170 CH avec boîte automatique et transmission intégrale 4-Matic.'
      }])
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding vehicle:', vehicleError);
      return;
    }

    console.log('Vehicle added successfully:', vehicleData);

    // Add all the images to the vehicle_images table
    const images = [
      {
        vehicle_id: vehicleData.id,
        image_url: '/lovable-uploads/7bc0664f-d468-4159-b451-ba0ee9ef5e93.png',
        is_primary: true,
        display_order: 1,
        alt_text: 'Mercedes-Benz GLC 220 d Coupé - Vue de face'
      },
      {
        vehicle_id: vehicleData.id,
        image_url: '/lovable-uploads/fadb352c-c2e8-4df8-bf42-f07094c14e01.png',
        is_primary: false,
        display_order: 2,
        alt_text: 'Mercedes-Benz GLC 220 d Coupé - Vue de profil'
      },
      {
        vehicle_id: vehicleData.id,
        image_url: '/lovable-uploads/727ed15e-b920-40a3-9679-49111715d753.png',
        is_primary: false,
        display_order: 3,
        alt_text: 'Mercedes-Benz GLC 220 d Coupé - Vue arrière trois-quarts'
      },
      {
        vehicle_id: vehicleData.id,
        image_url: '/lovable-uploads/93b87cf6-17f5-463b-9493-4c839aad58e9.png',
        is_primary: false,
        display_order: 4,
        alt_text: 'Mercedes-Benz GLC 220 d Coupé - Vue arrière'
      },
      {
        vehicle_id: vehicleData.id,
        image_url: '/lovable-uploads/f1efbf43-e05d-4f98-98e6-126858f146bf.png',
        is_primary: false,
        display_order: 5,
        alt_text: 'Mercedes-Benz GLC 220 d Coupé - Vue arrière détaillée'
      },
      {
        vehicle_id: vehicleData.id,
        image_url: '/lovable-uploads/c77f4d95-95fe-4cee-945c-d9f6dc5b0902.png',
        is_primary: false,
        display_order: 6,
        alt_text: 'Mercedes-Benz GLC 220 d Coupé - Intérieur tableau de bord'
      },
      {
        vehicle_id: vehicleData.id,
        image_url: '/lovable-uploads/2cbe7d6b-4e47-426b-91c0-8363ff4de482.png',
        is_primary: false,
        display_order: 7,
        alt_text: 'Mercedes-Benz GLC 220 d Coupé - Compteur kilométrique'
      },
      {
        vehicle_id: vehicleData.id,
        image_url: '/lovable-uploads/a04f6a17-070f-4592-8460-39797acb1c24.png',
        is_primary: false,
        display_order: 8,
        alt_text: 'Mercedes-Benz GLC 220 d Coupé - Console centrale'
      },
      {
        vehicle_id: vehicleData.id,
        image_url: '/lovable-uploads/6647fbdd-6dbc-46f7-a476-8f844b7ba3ac.png',
        is_primary: false,
        display_order: 9,
        alt_text: 'Mercedes-Benz GLC 220 d Coupé - Sièges avant'
      },
      {
        vehicle_id: vehicleData.id,
        image_url: '/lovable-uploads/0c45fd49-934b-4daa-a394-fa15cde27d3e.png',
        is_primary: false,
        display_order: 10,
        alt_text: 'Mercedes-Benz GLC 220 d Coupé - Sièges arrière'
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images:', imagesError);
      return;
    }

    console.log('Mercedes GLC and images added successfully to catalog');
  } catch (error) {
    console.error('Error in addMercedesGLCIfNotExists:', error);
  }
};
