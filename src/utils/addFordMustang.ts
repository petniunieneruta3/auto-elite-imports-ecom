
import { supabase } from '@/integrations/supabase/client';

export const addFordMustang = async () => {
  try {
    console.log('Adding Ford Mustang 2.3 EcoBoost...');
    
    // Check if vehicle already exists
    const { data: existingVehicle } = await supabase
      .from('vehicles')
      .select('id')
      .eq('brand', 'Ford')
      .eq('model', 'Mustang 2.3 EcoBoost')
      .eq('year', 2017)
      .single();

    if (existingVehicle) {
      console.log('Ford Mustang 2.3 EcoBoost already exists');
      return;
    }

    // Insert the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Ford',
        model: 'Mustang 2.3 EcoBoost',
        year: 2017,
        price: 12000,
        mileage: 85000,
        fuel: 'Essence',
        power: '317 ch',
        transmission: 'Boîte manuelle',
        color: 'Rouge avec bandes noires',
        description: 'Régulateur de vitesse • Cuir • Caméra de recul • DAB',
        image_url: '/lovable-uploads/0df0ccc3-d947-4216-9e12-e68bf5645d74.png',
        badge: 'Sport',
        rating: 4.6,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error inserting Ford Mustang:', vehicleError);
      return;
    }

    console.log('Ford Mustang 2.3 EcoBoost added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        image_url: '/lovable-uploads/0df0ccc3-d947-4216-9e12-e68bf5645d74.png',
        is_primary: true,
        display_order: 0,
        alt_text: 'Ford Mustang 2.3 EcoBoost - Vue de profil'
      },
      {
        image_url: '/lovable-uploads/3cb19967-2d42-4ebf-9302-a282e25ae020.png',
        is_primary: false,
        display_order: 1,
        alt_text: 'Ford Mustang 2.3 EcoBoost - Vue de face'
      },
      {
        image_url: '/lovable-uploads/a625fe78-f96a-4077-b5e0-e9020e45ae3e.png',
        is_primary: false,
        display_order: 2,
        alt_text: 'Ford Mustang 2.3 EcoBoost - Vue arrière'
      },
      {
        image_url: '/lovable-uploads/5c103301-240d-4a5d-8338-89e99170f21a.png',
        is_primary: false,
        display_order: 3,
        alt_text: 'Ford Mustang 2.3 EcoBoost - Intérieur avant'
      },
      {
        image_url: '/lovable-uploads/2e115c1e-2187-415b-8061-9ac910198d32.png',
        is_primary: false,
        display_order: 4,
        alt_text: 'Ford Mustang 2.3 EcoBoost - Tableau de bord'
      },
      {
        image_url: '/lovable-uploads/2ec22898-19c9-4d58-9eab-d72e8d0f3643.png',
        is_primary: false,
        display_order: 5,
        alt_text: 'Ford Mustang 2.3 EcoBoost - Sièges arrière'
      },
      {
        image_url: '/lovable-uploads/f1b5e7a6-0e68-44a7-8028-bf67dcba4875.png',
        is_primary: false,
        display_order: 6,
        alt_text: 'Ford Mustang 2.3 EcoBoost - Volant et tableau de bord'
      },
      {
        image_url: '/lovable-uploads/1d21db3e-09e8-4981-80e3-07b412c68dc7.png',
        is_primary: false,
        display_order: 7,
        alt_text: 'Ford Mustang 2.3 EcoBoost - Boîte manuelle'
      },
      {
        image_url: '/lovable-uploads/7fe439a9-0409-4227-8255-4627e2836f6e.png',
        is_primary: false,
        display_order: 8,
        alt_text: 'Ford Mustang 2.3 EcoBoost - Compteurs'
      },
      {
        image_url: '/lovable-uploads/c0c6dfbf-d580-4624-93df-0b04da31bb35.png',
        is_primary: false,
        display_order: 9,
        alt_text: 'Ford Mustang 2.3 EcoBoost - Coffre'
      }
    ];

    // Insert all images
    for (const imageData of images) {
      const { error: imageError } = await supabase
        .from('vehicle_images')
        .insert({
          vehicle_id: vehicle.id,
          ...imageData
        });

      if (imageError) {
        console.error('Error inserting image:', imageError);
      } else {
        console.log('Image added successfully:', imageData.alt_text);
      }
    }

    console.log('All images added successfully for Ford Mustang 2.3 EcoBoost');
    
  } catch (error) {
    console.error('Error in addFordMustang:', error);
  }
};
