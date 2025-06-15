
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { addMercedesGLC } from '@/utils/addMercedesGLC';

const AddMercedesButton = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAddVehicle = async () => {
    setLoading(true);
    try {
      const result = await addMercedesGLC();
      
      if (result.success) {
        toast({
          title: "Véhicule ajouté",
          description: "La Mercedes-Benz GLC a été ajoutée avec succès au catalogue",
        });
      } else {
        throw new Error('Failed to add vehicle');
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le véhicule au catalogue",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAddVehicle}
      disabled={loading}
      className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
    >
      {loading ? 'Ajout en cours...' : 'Ajouter Mercedes GLC au catalogue'}
    </Button>
  );
};

export default AddMercedesButton;
