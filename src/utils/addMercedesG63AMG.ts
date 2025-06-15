
import { supabase } from '@/integrations/supabase/client';

export const addMercedesG63AMG = async () => {
  try {
    console.log('Adding Mercedes G63 AMG...');
    
    // Check if vehicle already exists
    const { data: existingVehicle } = await supabase
      .from('vehicles')
      .select('id')
      .eq('brand', 'Mercedes-Benz')
      .eq('model', 'G63 AMG')
      .eq('year', 2014)
      .single();

    if (existingVehicle) {
      console.log('Mercedes G63 AMG already exists');
      return;
    }

    // Insert the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Mercedes-Benz',
        model: 'G63 AMG',
        year: 2014,
        price: 32000,
        mileage: 100000,
        fuel: 'Essence',
        power: '544 ch',
        transmission: 'Boîte automatique',
        color: 'Blanc avec intérieur Orange Brabus',
        description: 'V8 Biturbo 5.5L • Intérieur full Brabus 800 Orange • Harman Kardon • Caméra de recul • Assistance correction trajectoire • Bluetooth • Navigation • Premier propriétaire • Suivi Mercedes • Jamais accidenté • Dossier factures complet',
        image_url: '/lovable-uploads/940cd412-4c16-4f53-b753-81e79a2ef87f.png',
        badge: 'Collector',
        rating: 4.8,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error inserting Mercedes G63 AMG:', vehicleError);
      return;
    }

    console.log('Mercedes G63 AMG added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        image_url: '/lovable-uploads/940cd412-4c16-4f53-b753-81e79a2ef87f.png',
        is_primary: true,
        display_order: 0,
        alt_text: 'Mercedes G63 AMG - Vue de face'
      },
      {
        image_url: '/lovable-uploads/cf023233-9ad3-464a-8cc8-0d36823efd02.png',
        is_primary: false,
        display_order: 1,
        alt_text: 'Mercedes G63 AMG - Vue arrière'
      },
      {
        image_url: '/lovable-uploads/486939a4-0fe6-4ef4-af8c-6806673a68f3.png',
        is_primary: false,
        display_order: 2,
        alt_text: 'Mercedes G63 AMG - Vue de profil'
      },
      {
        image_url: '/lovable-uploads/b88981dc-3e38-4811-abce-e02e14f78349.png',
        is_primary: false,
        display_order: 3,
        alt_text: 'Mercedes G63 AMG - Intérieur Brabus Orange'
      },
      {
        image_url: '/lovable-uploads/a9ed89a7-a572-4d18-b6a0-b43917580afc.png',
        is_primary: false,
        display_order: 4,
        alt_text: 'Mercedes G63 AMG - Sièges arrière Brabus'
      },
      {
        image_url: '/lovable-uploads/62601db2-1210-4a99-a4f7-5e89fe4eb087.png',
        is_primary: false,
        display_order: 5,
        alt_text: 'Mercedes G63 AMG - Sièges arrière et écrans'
      },
      {
        image_url: '/lovable-uploads/6fa1f4e7-5b53-4edc-a72d-b133784d5ea0.png',
        is_primary: false,
        display_order: 6,
        alt_text: 'Mercedes G63 AMG - Tableau de bord AMG'
      },
      {
        image_url: '/lovable-uploads/9032d04e-139e-4676-8b4d-8c7846886c84.png',
        is_primary: false,
        display_order: 7,
        alt_text: 'Mercedes G63 AMG - Volant Brabus'
      },
      {
        image_url: '/lovable-uploads/76602369-6e52-4ee4-baa5-70ae10d59ab6.png',
        is_primary: false,
        display_order: 8,
        alt_text: 'Mercedes G63 AMG - Détail Brabus latéral'
      },
      {
        image_url: '/lovable-uploads/c0ddc5ae-8a93-4a03-b6e3-489ca38b2636.png',
        is_primary: false,
        display_order: 9,
        alt_text: 'Mercedes G63 AMG - Vue latérale complète'
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

    console.log('All images added successfully for Mercedes G63 AMG');
    
  } catch (error) {
    console.error('Error in addMercedesG63AMG:', error);
  }
};
