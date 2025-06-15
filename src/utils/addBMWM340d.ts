
import { supabase } from '@/integrations/supabase/client';

export const addBMWM340d = async () => {
  try {
    console.log('Adding BMW M340d...');
    
    // Check if vehicle already exists
    const { data: existing } = await supabase
      .from('vehicles')
      .select('id')
      .eq('brand', 'BMW')
      .eq('model', 'M340d DrAssPro Glas Key Kam')
      .single();

    if (existing) {
      console.log('BMW M340d already exists');
      return existing.id;
    }

    // Add the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'BMW',
        model: 'M340d DrAssPro Glas Key Kam',
        year: 2021,
        price: 8000,
        mileage: 75000,
        fuel: 'Diesel (compatible Biodiesel)',
        power: '250kW (340Ch Din)',
        transmission: 'Automatique',
        color: 'Gris Foncé Métal',
        image_url: '/lovable-uploads/c44f4e9e-0f1d-4a7a-9ad2-6c235a7dd029.png',
        badge: 'Elite',
        rating: 4.6,
        location: 'Oranienburg',
        availability: 'Sofort verfügbar',
        description: 'BMW M340d DrAssPro Glas Key Kam 250kW(340Ch Din) - Berline sportive diesel avec transmission automatique. Kilométrage certifié 75 000 km. Compatible Biodiesel. Édition allemande avec équipements premium.'
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding BMW M340d:', vehicleError);
      return null;
    }

    console.log('BMW M340d added successfully:', vehicle);

    // Add vehicle images to the gallery
    const vehicleImages = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/c44f4e9e-0f1d-4a7a-9ad2-6c235a7dd029.png',
        is_primary: true,
        display_order: 1,
        alt_text: 'BMW M340d - Vue avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/07d5fe01-d6d3-44df-885f-e47bbf054550.png',
        is_primary: false,
        display_order: 2,
        alt_text: 'BMW M340d - Vue arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/acdef76c-9459-4d47-bf3d-a746e5551b01.png',
        is_primary: false,
        display_order: 3,
        alt_text: 'BMW M340d - Vue arrière trois quarts'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/1588ef49-a11e-4aa9-9118-dab72803eb7c.png',
        is_primary: false,
        display_order: 4,
        alt_text: 'BMW M340d - Vue profil'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/f0980e47-83a7-497c-9c75-e6cf6ca408bb.png',
        is_primary: false,
        display_order: 5,
        alt_text: 'BMW M340d - Intérieur sièges arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/dc907cee-b10b-48d7-b1ae-598ffe153e9b.png',
        is_primary: false,
        display_order: 6,
        alt_text: 'BMW M340d - Sièges avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/5a366997-2e66-4c03-953f-1eba361ff150.png',
        is_primary: false,
        display_order: 7,
        alt_text: 'BMW M340d - Habitacle passager'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/12efdb7c-d60d-4098-8f4b-33cabb7a1df7.png',
        is_primary: false,
        display_order: 8,
        alt_text: 'BMW M340d - Tableau de bord et console centrale'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/2a2791f9-ec69-45ac-ae6c-77f6a911afb0.png',
        is_primary: false,
        display_order: 9,
        alt_text: 'BMW M340d - Poste de conduite'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/7e4fc988-7742-42ca-88c7-415445210002.png',
        is_primary: false,
        display_order: 10,
        alt_text: 'BMW M340d - Volant et tableau de bord'
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
    console.error('Error in addBMWM340d:', error);
    return null;
  }
};
