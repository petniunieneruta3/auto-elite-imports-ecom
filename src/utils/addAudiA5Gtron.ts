
import { supabase } from '@/integrations/supabase/client';

export const addAudiA5Gtron = async () => {
  console.log('Adding Audi A5 40 g-tron S-line...');
  
  try {
    // Check if this vehicle already exists
    const { data: existingVehicle } = await supabase
      .from('vehicles')
      .select('id')
      .eq('brand', 'Audi')
      .eq('model', 'A5 40 g-tron S-line')
      .eq('year', 2020)
      .single();

    if (existingVehicle) {
      console.log('Audi A5 40 g-tron S-line already exists');
      return;
    }

    // Insert the vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert({
        brand: 'Audi',
        model: 'A5 40 g-tron S-line',
        year: 2020,
        price: 5500,
        mileage: 37561,
        fuel: 'Gaz naturel',
        power: '125 kW (170 ch)',
        transmission: 'Automatique',
        color: 'Gris métallique effet perle Daytona',
        image_url: '/lovable-uploads/02cb803e-6493-4f97-aed3-1cbca1df8879.png',
        badge: 'Elite',
        rating: 4.3,
        location: 'Oranienburg',
        availability: 'Auf Bestellung verfügbar',
        description: `Audi A5 40 g-tron S-line LED KAMERA AHK TEMPOMAT

État : Voiture d'occasion, sans accident
Catégorie : Salon
Numéro de véhicule : 072128
Origine : Édition allemande
Capacité moteur : 1.984 cm³
Type d'entraînement : Moteur à combustion interne
Nombre de places : 5
Nombre de portes : 4/5
Classe d'émission : Euro 6
Plaque environnementale : 4 (Vert)
Première immatriculation : 05/2020
Nombre de propriétaires : 2

Équipements :
• Climatisation automatique 3 zones
• Capteurs de stationnement avant/arrière avec caméra
• Airbags avant, latéraux et autres
• Design intérieur : Alcantara, Gris
• Poids : 1.650 kg
• 4 cylindres

Disponible uniquement sur commande.`
      })
      .select()
      .single();

    if (vehicleError) {
      console.error('Error adding Audi A5 40 g-tron S-line:', vehicleError);
      return;
    }

    console.log('Audi A5 40 g-tron S-line added successfully:', vehicle);

    // Add vehicle images to the gallery
    const images = [
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/02cb803e-6493-4f97-aed3-1cbca1df8879.png',
        is_primary: true,
        display_order: 1,
        alt_text: 'Audi A5 40 g-tron S-line - Vue avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/a264ab5b-932c-4479-8d3d-8398bcb87d1f.png',
        is_primary: false,
        display_order: 2,
        alt_text: 'Audi A5 40 g-tron S-line - Vue arrière'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/1dae0cc7-df79-4a12-bc0c-b06dd1d09cdb.png',
        is_primary: false,
        display_order: 3,
        alt_text: 'Audi A5 40 g-tron S-line - Vue de profil'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/6310fe4b-7af0-40b8-9970-258297996cb3.png',
        is_primary: false,
        display_order: 4,
        alt_text: 'Audi A5 40 g-tron S-line - Intérieur avant'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/712ef407-2ff6-4342-a687-06c5a83e7132.png',
        is_primary: false,
        display_order: 5,
        alt_text: 'Audi A5 40 g-tron S-line - Tableau de bord'
      },
      {
        vehicle_id: vehicle.id,
        image_url: '/lovable-uploads/ba36942b-8cc5-4e27-b4cd-07ba7522d11c.png',
        is_primary: false,
        display_order: 6,
        alt_text: 'Audi A5 40 g-tron S-line - Compteur kilométrique'
      }
    ];

    const { error: imagesError } = await supabase
      .from('vehicle_images')
      .insert(images);

    if (imagesError) {
      console.error('Error adding images for Audi A5 40 g-tron S-line:', imagesError);
    } else {
      console.log('Images added successfully for Audi A5 40 g-tron S-line');
    }

  } catch (error) {
    console.error('Error in addAudiA5Gtron:', error);
  }
};
