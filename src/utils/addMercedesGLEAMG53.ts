
import { supabase } from '@/integrations/supabase/client';

export const addMercedesGLEAMG53 = async () => {
  try {
    console.log('Adding Mercedes-Benz GLE AMG 53 4MATIC Coupé...');
    
    // Check if vehicle already exists
    const { data: existingVehicle } = await supabase
      .from('vehicles')
      .select('id')
      .eq('brand', 'Mercedes-Benz')
      .eq('model', 'GLE AMG 53 4MATIC Coupé')
      .eq('year', 2021)
      .single();

    if (existingVehicle) {
      console.log('Mercedes-Benz GLE AMG 53 4MATIC Coupé already exists');
      return;
    }

    // Insert the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Mercedes-Benz',
        model: 'GLE AMG 53 4MATIC Coupé',
        year: 2021,
        price: 35000,
        mileage: 55000,
        fuel: 'Hybride (Électrique + Essence)',
        power: '457 ch',
        transmission: 'Boîte automatique',
        color: 'Gris Métallisé',
        description: 'Importation allemande • Garantie 24 mois',
        image_url: '/lovable-uploads/41982d01-cc70-4620-94bf-5b4cbadf2ab6.png',
        badge: 'Elite',
        rating: 4.8,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error inserting Mercedes-Benz GLE AMG 53:', vehicleError);
      return;
    }

    console.log('Mercedes-Benz GLE AMG 53 4MATIC Coupé added successfully:', vehicle);

    // Add all images to the gallery
    const images = [
      {
        image_url: '/lovable-uploads/41982d01-cc70-4620-94bf-5b4cbadf2ab6.png',
        is_primary: true,
        display_order: 0,
        alt_text: 'Mercedes-Benz GLE AMG 53 4MATIC Coupé - Vue de face'
      },
      {
        image_url: '/lovable-uploads/f682fce8-4781-445c-9985-164f875469b9.png',
        is_primary: false,
        display_order: 1,
        alt_text: 'Mercedes-Benz GLE AMG 53 4MATIC Coupé - Vue de profil'
      },
      {
        image_url: '/lovable-uploads/0ae8c894-2e41-434b-b3aa-a179c73ddcc4.png',
        is_primary: false,
        display_order: 2,
        alt_text: 'Mercedes-Benz GLE AMG 53 4MATIC Coupé - Vue latérale'
      },
      {
        image_url: '/lovable-uploads/5dd98e16-fb8d-45a4-b97f-5062945514dd.png',
        is_primary: false,
        display_order: 3,
        alt_text: 'Mercedes-Benz GLE AMG 53 4MATIC Coupé - Vue arrière'
      },
      {
        image_url: '/lovable-uploads/bc26753b-93a7-45be-a4af-352e1e065001.png',
        is_primary: false,
        display_order: 4,
        alt_text: 'Mercedes-Benz GLE AMG 53 4MATIC Coupé - Tableau de bord'
      },
      {
        image_url: '/lovable-uploads/007a06ca-5ded-471c-8106-438bb9836d56.png',
        is_primary: false,
        display_order: 5,
        alt_text: 'Mercedes-Benz GLE AMG 53 4MATIC Coupé - Intérieur avant'
      },
      {
        image_url: '/lovable-uploads/a2f9fe41-e311-4948-87c3-a02829c284f2.png',
        is_primary: false,
        display_order: 6,
        alt_text: 'Mercedes-Benz GLE AMG 53 4MATIC Coupé - Sièges avant'
      },
      {
        image_url: '/lovable-uploads/c9e057a3-9067-463f-8e26-84c3184358f2.png',
        is_primary: false,
        display_order: 7,
        alt_text: 'Mercedes-Benz GLE AMG 53 4MATIC Coupé - Sièges arrière'
      },
      {
        image_url: '/lovable-uploads/b52ea048-7fbb-4d6d-a58c-c5537a71341c.png',
        is_primary: false,
        display_order: 8,
        alt_text: 'Mercedes-Benz GLE AMG 53 4MATIC Coupé - Coffre'
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

    console.log('All images added successfully for Mercedes-Benz GLE AMG 53 4MATIC Coupé');
    
  } catch (error) {
    console.error('Error in addMercedesGLEAMG53:', error);
  }
};
