
-- Supprimer tous les véhicules Mercedes GLC en double
-- On garde seulement le plus récent (celui avec le created_at le plus récent)
WITH duplicates AS (
  SELECT id, 
         ROW_NUMBER() OVER (
           PARTITION BY brand, model, year, mileage 
           ORDER BY created_at DESC
         ) as rn
  FROM vehicles 
  WHERE brand = 'Mercedes-Benz' 
    AND model = 'GLC 220 d Coupé 4-Matic PACK AMG'
)
DELETE FROM vehicles 
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);

-- Supprimer également les images associées aux véhicules supprimés
DELETE FROM vehicle_images 
WHERE vehicle_id NOT IN (SELECT id FROM vehicles);
