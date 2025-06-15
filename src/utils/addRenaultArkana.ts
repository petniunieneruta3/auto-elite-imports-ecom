
import { supabase } from '@/integrations/supabase/client';

export const addRenaultArkana = async () => {
  console.log('Adding Renault Arkana I...');
  
  try {
    // First, check if this exact vehicle already exists
    const { data: existingVehicles, error: checkError } = await supabase
      .from('vehicles')
      .select('id')
      .eq('brand', 'Renault')
      .eq('model', 'Arkana I')
      .eq('year', 2021)
      .eq('mileage', 17459);

    if (checkError) {
      console.error('Error checking existing vehicle:', checkError);
      return;
    }

    if (existingVehicles && existingVehicles.length > 0) {
      console.log('Renault Arkana I already exists, skipping...');
      return existingVehicles[0].id;
    }

    // Add the vehicle
    const vehicleData = {
      brand: 'Renault',
      model: 'Arkana I',
      year: 2021,
      price: 10500,
      mileage: 17459,
      fuel: 'Essence',
      power: '150 CH',
      transmission: 'Variateur de vitesse',
      color: 'Noir',
      image_url: '/lovable-uploads/be256a2f-2bd4-4462-9dea-994132820cb2.png',
      badge: 'Elite',
      rating: 4.4,
      location: 'Oranienburg',
      availability: 'Sofort verfügbar',
      description: 'Renault Arkana I de 2021 avec moteur 1,3L essence de 150 CH et transmission à variateur de vitesse. SUV 5 portes noir avec garantie 24 ans. Kilométrage certifié 17 459 km.'
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
        image_url: '/lovable-uploads/be256a2f-2bd4-4462-9dea-994132820cb2.png',
        is_primary: true,
        display_order: 1,
        alt_text: 'Renault Arkana I - Vue avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/325c3598-373e-4f38-8f55-ceb62bda617b.png',
        is_primary: false,
        display_order: 2,
        alt_text: 'Renault Arkana I - Vue trois quarts avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/f490b8ec-dd5a-49b3-89f4-63a437d126d6.png',
        is_primary: false,
        display_order: 3,
        alt_text: 'Renault Arkana I - Vue arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/1f2f6bad-70dd-42ba-a7a9-cd7a3d8e312b.png',
        is_primary: false,
        display_order: 4,
        alt_text: 'Renault Arkana I - Vue trois quarts arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/ffc2c2d5-c130-4994-a1d4-75344171f673.png',
        is_primary: false,
        display_order: 5,
        alt_text: 'Renault Arkana I - Vue de profil'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/a69f6757-df9d-4e9b-820e-db1bf45a2480.png',
        is_primary: false,
        display_order: 6,
        alt_text: 'Renault Arkana I - Intérieur avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/06c7eb9b-ef9d-4b50-a8a1-280b92101ed8.png',
        is_primary: false,
        display_order: 7,
        alt_text: 'Renault Arkana I - Tableau de bord'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/0608f88a-67c9-40fd-af16-5b95d56b02ba.png',
        is_primary: false,
        display_order: 8,
        alt_text: 'Renault Arkana I - Banquette arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/8bedc0b8-9614-4115-8135-a5c23fd45df1.png',
        is_primary: false,
        display_order: 9,
        alt_text: 'Renault Arkana I - Sièges arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/5161d03b-94e1-498d-8855-e32b3845af97.png',
        is_primary: false,
        display_order: 10,
        alt_text: 'Renault Arkana I - Jante'
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
    console.error('Error in addRenaultArkana:', error);
  }
};
