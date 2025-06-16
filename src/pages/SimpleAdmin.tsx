
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
    console.log('Fahrzeuge laden...');
    try {
      setError(null);
      setLoading(true);
      
      const { data, error: fetchError } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Supabase Antwort:', { data, error: fetchError });

      if (fetchError) {
        console.error('Supabase Fehler:', fetchError);
        throw new Error(fetchError.message);
      }
      
      console.log('Fahrzeuge geladen:', data?.length || 0);
      setVehicles(data || []);
    } catch (error) {
      console.error('Fehler beim Laden der Fahrzeuge:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
      setError(`Fehler beim Laden: ${errorMessage}`);
      toast({
        title: "Verbindungsfehler",
        description: "Fahrzeuge konnten nicht geladen werden. Überprüfen Sie Ihre Verbindung.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    console.log('Manuelle Aktualisierung ausgelöst');
    setRefreshLoading(true);
    await fetchVehicles();
    setRefreshLoading(false);
    toast({
      title: "Liste aktualisiert",
      description: "Die Fahrzeugliste wurde aktualisiert",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sind Sie sicher, dass Sie dieses Fahrzeug löschen möchten?')) {
      return;
    }

    console.log('Löschvorgang für Fahrzeug-ID gestartet:', id);
    
    try {
      setDeleteLoading(id);
      
      // Zuerst prüfen, ob das Fahrzeug existiert
      const { data: existingVehicle, error: checkError } = await supabase
        .from('vehicles')
        .select('id, brand, model')
        .eq('id', id)
        .single();

      console.log('Fahrzeugprüfungsergebnis:', { existingVehicle, checkError });

      if (checkError) {
        console.error('Fehler bei der Fahrzeugprüfung:', checkError);
        throw new Error(`Fahrzeug nicht gefunden: ${checkError.message}`);
      }

      // Jetzt das Fahrzeug löschen
      const { error: deleteError, data: deleteData } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id)
        .select();

      console.log('Löschvorgang Ergebnis:', { deleteError, deleteData });

      if (deleteError) {
        console.error('Löschfehler:', deleteError);
        throw new Error(`Löschfehler: ${deleteError.message}`);
      }

      // Optimistisch aus dem lokalen Zustand entfernen
      setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle.id !== id));

      console.log('Fahrzeug erfolgreich gelöscht, UI wird aktualisiert');

      toast({
        title: "Fahrzeug gelöscht",
        description: `${existingVehicle.brand} ${existingVehicle.model} wurde erfolgreich gelöscht`,
      });

    } catch (error) {
      console.error('Fehler beim Löschen:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
      toast({
        title: "Löschfehler",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    console.log('Bearbeiten-Button geklickt für Fahrzeug:', vehicle.id, vehicle.brand, vehicle.model);
    setEditingVehicle(vehicle);
    setShowForm(true);
    toast({
      title: "Bearbeitungsmodus",
      description: `Bearbeitung von ${vehicle.brand} ${vehicle.model}`,
    });
  };

  const handleAddNew = () => {
    console.log('Neues Fahrzeug hinzufügen Button geklickt');
    setEditingVehicle(null);
    setShowForm(true);
    toast({
      title: "Neues Fahrzeug",
      description: "Formular zum Hinzufügen eines neuen Fahrzeugs geöffnet",
    });
  };

  const handleFormClose = () => {
    console.log('Formular geschlossen, Fahrzeuge werden aktualisiert...');
    setShowForm(false);
    setEditingVehicle(null);
    // Immer nach dem Schließen des Formulars aktualisieren, um Datenkonsistenz zu gewährleisten
    fetchVehicles();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold mx-auto"></div>
          <p className="mt-4 text-luxury-gray">Lädt...</p>
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
              Fahrzeugverwaltung
            </h1>
            <p className="text-luxury-gray">
              Verwalten Sie die Fahrzeuge in Ihrem Katalog
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
                    'Erneut versuchen'
                  )}
                </Button>
              </div>
            )}
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Fahrzeugliste</CardTitle>
                  <CardDescription>
                    {vehicles.length} Fahrzeug(e) im Katalog
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleRefresh}
                    disabled={refreshLoading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${refreshLoading ? 'animate-spin' : ''}`} />
                    Aktualisieren
                  </Button>
                  <Button
                    onClick={handleAddNew}
                    className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Fahrzeug hinzufügen
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {vehicles.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Keine Fahrzeuge gefunden</p>
                  <Button
                    onClick={handleAddNew}
                    className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Erstes Fahrzeug hinzufügen
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bild</TableHead>
                        <TableHead>Fahrzeug</TableHead>
                        <TableHead>Jahr</TableHead>
                        <TableHead>Preis</TableHead>
                        <TableHead>Kilometerstand</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aktionen</TableHead>
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
