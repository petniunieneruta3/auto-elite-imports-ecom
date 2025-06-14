
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SimpleVehicleForm from '@/components/SimpleVehicleForm';

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

const SimpleAdmin = () => {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les véhicules",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Véhicule supprimé",
        description: "Le véhicule a été supprimé avec succès",
      });

      fetchVehicles();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le véhicule",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingVehicle(null);
    fetchVehicles();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold mx-auto"></div>
          <p className="mt-4 text-luxury-gray">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-luxury-black mb-2">
              Administration des Véhicules
            </h1>
            <p className="text-luxury-gray">
              Gérez les véhicules de votre catalogue
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Liste des Véhicules</CardTitle>
                  <CardDescription>
                    {vehicles.length} véhicule(s) dans le catalogue
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un véhicule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Véhicule</TableHead>
                      <TableHead>Année</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Kilométrage</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell>
                          <img
                            src={vehicle.image_url}
                            alt={`${vehicle.brand} ${vehicle.model}`}
                            className="w-16 h-12 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {vehicle.brand} {vehicle.model}
                            </div>
                            <div className="text-sm text-gray-500">
                              {vehicle.color}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{vehicle.year}</TableCell>
                        <TableCell>€{vehicle.price.toLocaleString()}</TableCell>
                        <TableCell>{vehicle.mileage.toLocaleString()} km</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            vehicle.availability === 'Sofort verfügbar'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {vehicle.availability}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(vehicle)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(vehicle.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {showForm && (
        <SimpleVehicleForm
          vehicle={editingVehicle}
          onClose={handleFormClose}
        />
      )}

      <Footer />
    </div>
  );
};

export default SimpleAdmin;
