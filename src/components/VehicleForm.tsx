
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  power: string;
  transmission: string;
  color: string;
  image_url: string;
  badge: string;
  rating: number;
  location: string;
  availability: string;
  description: string;
}

interface VehicleFormProps {
  vehicle?: Vehicle | null;
  onClose: () => void;
}

const VehicleForm = ({ vehicle, onClose }: VehicleFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brand: vehicle?.brand || '',
    model: vehicle?.model || '',
    year: vehicle?.year || new Date().getFullYear(),
    price: vehicle?.price || 0,
    mileage: vehicle?.mileage || 0,
    fuel: vehicle?.fuel || 'Benzin',
    power: vehicle?.power || '',
    transmission: vehicle?.transmission || 'Automatik',
    color: vehicle?.color || '',
    image_url: vehicle?.image_url || '',
    badge: vehicle?.badge || 'Elite',
    rating: vehicle?.rating || 4.5,
    location: vehicle?.location || 'Oranienburg',
    availability: vehicle?.availability || 'Sofort verfügbar',
    description: vehicle?.description || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (vehicle) {
        // Update existing vehicle
        const { error } = await supabase
          .from('vehicles')
          .update(formData)
          .eq('id', vehicle.id);

        if (error) throw error;

        toast({
          title: "Véhicule modifié",
          description: "Le véhicule a été modifié avec succès",
        });
      } else {
        // Create new vehicle
        const { error } = await supabase
          .from('vehicles')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Véhicule ajouté",
          description: "Le véhicule a été ajouté avec succès",
        });
      }

      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: vehicle 
          ? "Impossible de modifier le véhicule"
          : "Impossible d'ajouter le véhicule",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {vehicle ? 'Modifier le véhicule' : 'Ajouter un véhicule'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand">Marque</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => handleChange('brand', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="model">Modèle</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => handleChange('model', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="year">Année</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleChange('year', parseInt(e.target.value))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Prix (€)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="mileage">Kilométrage</Label>
                <Input
                  id="mileage"
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => handleChange('mileage', parseInt(e.target.value))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="fuel">Carburant</Label>
                <Select value={formData.fuel} onValueChange={(value) => handleChange('fuel', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Benzin">Benzin</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Elektro">Elektro</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="power">Puissance</Label>
                <Input
                  id="power"
                  value={formData.power}
                  onChange={(e) => handleChange('power', e.target.value)}
                  placeholder="625 PS"
                  required
                />
              </div>
              <div>
                <Label htmlFor="transmission">Transmission</Label>
                <Select value={formData.transmission} onValueChange={(value) => handleChange('transmission', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Automatik">Automatik</SelectItem>
                    <SelectItem value="Manuel">Manuel</SelectItem>
                    <SelectItem value="PDK">PDK</SelectItem>
                    <SelectItem value="Tiptronic">Tiptronic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="color">Couleur</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => handleChange('color', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="badge">Niveau</Label>
                <Select value={formData.badge} onValueChange={(value) => handleChange('badge', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Elite">Elite</SelectItem>
                    <SelectItem value="Collector">Collector</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rating">Note</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => handleChange('rating', parseFloat(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="availability">Disponibilité</Label>
                <Select value={formData.availability} onValueChange={(value) => handleChange('availability', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sofort verfügbar">Sofort verfügbar</SelectItem>
                    <SelectItem value="Reserviert">Reserviert</SelectItem>
                    <SelectItem value="Verkauft">Verkauft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="image_url">URL de l'image</Label>
              <Input
                id="image_url"
                type="url"
                value={formData.image_url}
                onChange={(e) => handleChange('image_url', e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
                placeholder="Description détaillée du véhicule..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button
                type="submit"
                className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                disabled={loading}
              >
                {loading 
                  ? 'Enregistrement...' 
                  : vehicle ? 'Modifier' : 'Ajouter'
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleForm;
