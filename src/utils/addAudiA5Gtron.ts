
import { supabase } from '@/integrations/supabase/client';

export const addAudiA5Gtron = async () => {
  try {
    console.log('Adding Audi A5 40 g-tron S-line...');
    
    // Check if vehicle already exists
    const { data: existing } = await supabase
      .from('vehicles')
      .select('id')
      .eq('brand', 'Audi')
      .eq('model', 'A5 40 g-tron S-line')
      .single();

    if (existing) {
      console.log('Audi A5 40 g-tron S-line already exists');
      return existing.id;
    }

    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Audi',
        model: 'A5 40 g-tron S-line',
        year: 2020,
        price: 5500,
        mileage: 37561,
        fuel: 'G-tron (CNG)',
        power: '170 PS',
        transmission: 'Automatique',
        color: 'Gris Métal',
        image_url: '/lovable-uploads/2fbfa535-080a-412b-9f5c-d35954d23a57.png',
        badge: 'Elite',
        rating: 4.3,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'Audi A5 40 g-tron S-line LED KAMERA AHK TEMPOMAT - État du véhicule : Voiture d\'occasion, sans accident. Catégorie : Salon. Fahrzeugnummer: 072128. Original : édition allemande.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Audi A5:', vehicleError);
      return null;
    }

    console.log('Audi A5 40 g-tron S-line added successfully:', vehicle);

    // Add vehicle images to the gallery
    const vehicleImages = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/2fbfa535-080a-412b-9f5c-d35954d23a57.png',
        is_primary: true,
        display_order: 1,
        alt_text: 'Audi A5 40 g-tron S-line - Vue avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/80ca24a7-ec1f-4a2c-ab7f-c1d6a754a632.png',
        is_primary: false,
        display_order: 2,
        alt_text: 'Audi A5 40 g-tron S-line - Vue arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/39e250a3-8ecb-404e-a87e-8d4c50c59ada.png',
        is_primary: false,
        display_order: 3,
        alt_text: 'Audi A5 40 g-tron S-line - Vue profil'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/72ca78d9-f010-4294-a4b3-b8fc8e001902.png',
        is_primary: false,
        display_order: 4,
        alt_text: 'Audi A5 40 g-tron S-line - Intérieur sièges'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/374eb23f-ef0f-4a5e-8a3b-e1ce6d7af24a.png',
        is_primary: false,
        display_order: 5,
        alt_text: 'Audi A5 40 g-tron S-line - Tableau de bord'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/ec0f9922-8ede-4dec-995c-7cabe8e60f38.png',
        is_primary: false,
        display_order: 6,
        alt_text: 'Audi A5 40 g-tron S-line - Compteur kilométrique'
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(vehicleImages);

    if (imagesError) {
      console.error('Error adding vehicle images:', imagesError);
    } else {
      console.log('Vehicle images added successfully');
    }

    return vehicle.id;
  } catch (error) {
    console.error('Error in addAudiA5Gtron:', error);
    return null;
  }
};
