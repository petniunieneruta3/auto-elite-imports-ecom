
-- Supprimer les images associées aux véhicules d'abord (pour éviter les contraintes de clés étrangères)
DELETE FROM vehicle_images 
WHERE vehicle_id IN (
  SELECT id FROM vehicles 
  WHERE (brand = 'BMW' AND model LIKE '%M5 Competition%')
     OR (brand = 'Audi' AND model LIKE '%RS6 Avant%')
     OR (brand = 'Mercedes' AND model LIKE '%AMG GT 63 S%')
     OR (brand = 'Porsche' AND model LIKE '%911 Turbo S%')
);

-- Supprimer les véhicules de la table vehicles
DELETE FROM vehicles 
WHERE (brand = 'BMW' AND model LIKE '%M5 Competition%')
   OR (brand = 'Audi' AND model LIKE '%RS6 Avant%')
   OR (brand = 'Mercedes' AND model LIKE '%AMG GT 63 S%')
   OR (brand = 'Porsche' AND model LIKE '%911 Turbo S%');
