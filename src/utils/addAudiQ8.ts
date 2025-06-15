
import { supabase } from '@/integrations/supabase/client';

export const addAudiQ8 = async () => {
  console.log('Adding Audi Q8 50 TDI quattro S-Line Sport plus...');
  
  try {
    // First, check if this exact vehicle already exists
    const { data: existingVehicles, error: checkError } = await supabase
      .from('vehicles')
      .select('id')
      .eq('brand', 'Audi')
      .eq('model', 'Q8 50 TDI quattro S-Line Sport plus')
      .eq('year', 2019)
      .eq('mileage', 105200);

    if (checkError) {
      console.error('Error checking existing vehicle:', checkError);
      return;
    }

    if (existingVehicles && existingVehicles.length > 0) {
      console.log('Audi Q8 50 TDI quattro S-Line Sport plus already exists, skipping...');
      return existingVehicles[0].id;
    }

    // Add the vehicle
    const vehicleData = {
      brand: 'Audi',
      model: 'Q8 50 TDI quattro S-Line Sport plus',
      year: 2019,
      price: 16000,
      mileage: 105200,
      fuel: 'Diesel',
      power: '286 CH',
      transmission: 'Automatique',
      color: 'Noir',
      image_url: '/lovable-uploads/4eb14343-c6bc-4b88-a097-10ae0d711ed7.png',
      badge: 'Collector',
      rating: 4.7,
      location: 'Oranienburg',
      availability: 'Sofort verfügbar',
      description: 'Audi Q8 50 TDI quattro S-Line Sport plus de 2019 avec moteur diesel de 286 CH et transmission automatique. Véhicule équipé caméra et finition TOP. Kilométrage certifié 105 200 km.'
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
        image_url: '/lovable-uploads/4eb14343-c6bc-4b88-a097-10ae0d711ed7.png',
        is_primary: true,
        display_order: 1,
        alt_text: 'Audi Q8 50 TDI quattro S-Line Sport plus - Vue avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/92765923-0897-4f2b-b57c-4595f05155b0.png',
        is_primary: false,
        display_order: 2,
        alt_text: 'Audi Q8 50 TDI quattro S-Line Sport plus - Vue arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/aa98e9c8-c3af-4fb1-ad04-93da95dcd891.png',
        is_primary: false,
        display_order: 3,
        alt_text: 'Audi Q8 50 TDI quattro S-Line Sport plus - Vue de profil'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/de93a529-e1da-4348-ac00-613057c4ef73.png',
        is_primary: false,
        display_order: 4,
        alt_text: 'Audi Q8 50 TDI quattro S-Line Sport plus - Intérieur avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/6518ad94-6013-4e40-b842-8d9dc14ad7db.png',
        is_primary: false,
        display_order: 5,
        alt_text: 'Audi Q8 50 TDI quattro S-Line Sport plus - Tableau de bord'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/9a831be5-88e6-4f53-8ecc-f8c11ad61453.png',
        is_primary: false,
        display_order: 6,
        alt_text: 'Audi Q8 50 TDI quattro S-Line Sport plus - Volant et compteurs'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/d55dda5b-c85b-4608-b6a3-894468903813.png',
        is_primary: false,
        display_order: 7,
        alt_text: 'Audi Q8 50 TDI quattro S-Line Sport plus - Vue arrière avec coffre ouvert'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/ac94c8ff-bbcc-4345-b029-df6cd76d5b22.png',
        is_primary: false,
        display_order: 8,
        alt_text: 'Audi Q8 50 TDI quattro S-Line Sport plus - Sièges arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/2962a352-63ea-489f-b628-8601c0bef86a.png',
        is_primary: false,
        display_order: 9,
        alt_text: 'Audi Q8 50 TDI quattro S-Line Sport plus - Banquette arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/6b7c82a1-6050-4927-b5e6-8f887555424e.png',
        is_primary: false,
        display_order: 10,
        alt_text: 'Audi Q8 50 TDI quattro S-Line Sport plus - Écran multimédia et caméra'
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
    console.error('Error in addAudiQ8:', error);
  }
};
