
import { supabase } from '@/integrations/supabase/client';

export const addRenaultCaptur = async () => {
  console.log('Adding Renault Captur E-TECH PHEV...');
  
  try {
    // First, check if this exact vehicle already exists
    const { data: existingVehicles, error: checkError } = await supabase
      .from('vehicles')
      .select('id')
      .eq('brand', 'Renault')
      .eq('model', 'Captur E-TECH PHEV 160CV Intense')
      .eq('year', 2021)
      .eq('mileage', 49109);

    if (checkError) {
      console.error('Error checking existing vehicle:', checkError);
      return;
    }

    if (existingVehicles && existingVehicles.length > 0) {
      console.log('Renault Captur E-TECH PHEV already exists, skipping...');
      return existingVehicles[0].id;
    }

    // Add the vehicle
    const vehicleData = {
      brand: 'Renault',
      model: 'Captur E-TECH PHEV 160CV Intense',
      year: 2021,
      price: 5000,
      mileage: 49109,
      fuel: 'Électrique + Essence',
      power: '160 CH',
      transmission: 'Automatique',
      color: 'Gris',
      image_url: '/lovable-uploads/0abc93fd-ca14-4f2f-b2d6-fd5b83c1d7c0.png',
      badge: 'Eco',
      rating: 4.3,
      location: 'Oranienburg',
      availability: 'Sofort verfügbar',
      description: 'Renault Captur E-TECH PHEV 160CV Intense de 2021 avec équipements BOSE, caméra, navigation et ACC. Véhicule hybride rechargeable avec transmission automatique. Kilométrage certifié 49 109 km.'
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
        image_url: '/lovable-uploads/0abc93fd-ca14-4f2f-b2d6-fd5b83c1d7c0.png',
        is_primary: true,
        display_order: 1,
        alt_text: 'Renault Captur E-TECH PHEV - Vue avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/008ac7d3-5f89-4aa2-840b-9dc5ea5e2f3e.png',
        is_primary: false,
        display_order: 2,
        alt_text: 'Renault Captur E-TECH PHEV - Détail arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/56bda508-6c3c-49f6-807b-fa51c35023e8.png',
        is_primary: false,
        display_order: 3,
        alt_text: 'Renault Captur E-TECH PHEV - Vue arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/5cc3d18e-d750-45a6-9c6c-549dc75a63b8.png',
        is_primary: false,
        display_order: 4,
        alt_text: 'Renault Captur E-TECH PHEV - Vue de profil'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/a03c08ff-bec2-437d-87ab-f34537128116.png',
        is_primary: false,
        display_order: 5,
        alt_text: 'Renault Captur E-TECH PHEV - Vue trois quarts'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/27ec60e7-b1ca-4183-9523-26989b4215c6.png',
        is_primary: false,
        display_order: 6,
        alt_text: 'Renault Captur E-TECH PHEV - Volant et tableau de bord'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/83c252bb-ead6-47c4-90d9-fcda1c437f2c.png',
        is_primary: false,
        display_order: 7,
        alt_text: 'Renault Captur E-TECH PHEV - Instrumentation'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/cb4ebc88-2431-4dae-845e-83e1bd71b8f1.png',
        is_primary: false,
        display_order: 8,
        alt_text: 'Renault Captur E-TECH PHEV - Intérieur avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/bcb69d65-0a04-41aa-91d2-a6eb8c0c806a.png',
        is_primary: false,
        display_order: 9,
        alt_text: 'Renault Captur E-TECH PHEV - Banquette arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/5faf5156-918e-4c01-aaec-3f639f6360bc.png',
        is_primary: false,
        display_order: 10,
        alt_text: 'Renault Captur E-TECH PHEV - Coffre'
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
    console.error('Error in addRenaultCaptur:', error);
  }
};
