import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, AlertCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SimpleVehicleForm from '@/components/SimpleVehicleForm';
import LanguageSelector from '@/components/LanguageSelector';

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
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    console.log('Fetching vehicles...');
    try {
      setError(null);
      setLoading(true);
      
      const { data, error: fetchError } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Supabase response:', { data, error: fetchError });

      if (fetchError) {
        console.error('Supabase error:', fetchError);
        throw new Error(fetchError.message);
      }
      
      console.log('Vehicles fetched:', data?.length || 0);
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      setError(`Erreur lors du chargement: ${errorMessage}`);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de charger les véhicules. Vérifiez votre connexion.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    console.log('Manual refresh triggered');
    setRefreshLoading(true);
    await fetchVehicles();
    setRefreshLoading(false);
    toast({
      title: "Liste actualisée",
      description: "La liste des véhicules a été mise à jour",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      return;
    }

    console.log('Starting deletion for vehicle ID:', id);
    
    try {
      setDeleteLoading(id);
      
      // First, let's check if the vehicle exists
      const { data: existingVehicle, error: checkError } = await supabase
        .from('vehicles')
        .select('id, brand, model')
        .eq('id', id)
        .single();

      console.log('Vehicle check result:', { existingVehicle, checkError });

      if (checkError) {
        console.error('Error checking vehicle:', checkError);
        throw new Error(`Véhicule non trouvé: ${checkError.message}`);
      }

      // Now delete the vehicle
      const { error: deleteError, data: deleteData } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id)
        .select();

      console.log('Delete operation result:', { deleteError, deleteData });

      if (deleteError) {
        console.error('Delete error:', deleteError);
        throw new Error(`Erreur de suppression: ${deleteError.message}`);
      }

      // Optimistically remove from local state immediately
      setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle.id !== id));

      console.log('Vehicle deleted successfully, updating UI');

      toast({
        title: "Véhicule supprimé",
        description: `${existingVehicle.brand} ${existingVehicle.model} a été supprimé avec succès`,
      });

    } catch (error) {
      console.error('Error during deletion:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      toast({
        title: "Erreur de suppression",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    console.log('Edit button clicked for vehicle:', vehicle.id, vehicle.brand, vehicle.model);
    setEditingVehicle(vehicle);
    setShowForm(true);
    toast({
      title: "Mode modification",
      description: `Modification de ${vehicle.brand} ${vehicle.model}`,
    });
  };

  const handleAddNew = () => {
    console.log('Add new vehicle button clicked');
    setEditingVehicle(null);
    setShowForm(true);
    toast({
      title: "Nouveau véhicule",
      description: "Formulaire d'ajout d'un nouveau véhicule ouvert",
    });
  };

  const handleFormClose = () => {
    console.log('Form closed, refreshing vehicles...');
    setShowForm(false);
    setEditingVehicle(null);
    // Always refresh after form closes to ensure data consistency
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
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-luxury-black mb-2">
              Administration des Véhicules
            </h1>
            <p className="text-luxury-gray">
              Gérez les véhicules de votre catalogue
            </p>
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-700">{error}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshLoading}
                  className="ml-auto"
                >
                  {refreshLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                  ) : (
                    'Réessayer'
                  )}
                </Button>
              </div>
            )}
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
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleRefresh}
                    disabled={refreshLoading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${refreshLoading ? 'animate-spin' : ''}`} />
                    Actualiser
                  </Button>
                  <Button
                    onClick={handleAddNew}
                    className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un véhicule
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {vehicles.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Aucun véhicule trouvé</p>
                  <Button
                    onClick={handleAddNew}
                    className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter le premier véhicule
                  </Button>
                </div>
              ) : (
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
                              src={vehicle.image_url || '/placeholder.svg'}
                              alt={`${vehicle.brand} ${vehicle.model}`}
                              className="w-16 h-12 object-cover rounded"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder.svg';
                              }}
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
                          <TableCell>€{vehicle.price?.toLocaleString() || 'N/A'}</TableCell>
                          <TableCell>{vehicle.mileage?.toLocaleString() || 'N/A'} km</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              vehicle.availability === 'Sofort verfügbar'
                                ? 'bg-green-100 text-green-800'
                                : vehicle.availability === 'Reserviert'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-red-100 text-red-800'
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
                                disabled={deleteLoading === vehicle.id}
                                className="hover:bg-blue-50 hover:border-blue-200"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(vehicle.id)}
                                disabled={deleteLoading === vehicle.id}
                                className="hover:bg-red-50 hover:border-red-200"
                              >
                                {deleteLoading === vehicle.id ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
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
      <LanguageSelector />
    </div>
  );
};

export default SimpleAdmin;
