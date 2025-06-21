
-- Supprimer les doublons de véhicules en gardant le plus récent pour chaque combinaison unique
WITH duplicates AS (
  SELECT id, 
         ROW_NUMBER() OVER (
           PARTITION BY brand, model, year, mileage, price 
           ORDER BY created_at DESC
         ) as rn
  FROM vehicles
)
DELETE FROM vehicle_images 
WHERE vehicle_id IN (
  SELECT id FROM duplicates WHERE rn > 1
);

-- Supprimer les véhicules en double (garder seulement le plus récent)
WITH duplicates AS (
  SELECT id, 
         ROW_NUMBER() OVER (
           PARTITION BY brand, model, year, mileage, price 
           ORDER BY created_at DESC
         ) as rn
  FROM vehicles
)
DELETE FROM vehicles 
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);
