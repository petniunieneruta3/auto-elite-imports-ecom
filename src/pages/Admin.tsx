
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import VehicleForm from '@/components/VehicleForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Car, 
  Users, 
  FileText, 
  Settings, 
  Trash2, 
  Edit,
  Plus,
  Eye,
  BarChart3
} from 'lucide-react';

interface Vehicle {
  id: string;
  created_at: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  image_url: string;
  badge: string;
  rating: number;
  location: string;
  availability: string;
  mileage: number;
  fuel: string;
  power: string;
  transmission: string;
  color: string;
  description: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [profiles, setProfiles] = useState([]);
  const [activeTab, setActiveTab] = useState("vehicles");
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isVehicleFormOpen, setIsVehicleFormOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/auth');
    } else {
      fetchVehicles();
      fetchProfiles();
    }
  }, [user, isAdmin, navigate]);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Fehler beim Laden der Fahrzeuge:", error);
      } else {
        setVehicles(data || []);
      }
    } catch (error) {
      console.error("Fehler beim Laden der Fahrzeuge:", error);
    }
  };

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) {
        console.error("Fehler beim Laden der Profile:", error);
      } else {
        setProfiles(data || []);
      }
    } catch (error) {
      console.error("Fehler beim Laden der Profile:", error);
    }
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', vehicleId);

      if (error) {
        console.error("Fehler beim Löschen des Fahrzeugs:", error);
        toast({
          title: "Fehler",
          description: "Fahrzeug konnte nicht gelöscht werden.",
          variant: "destructive",
        });
      } else {
        setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
        toast({
          title: "Erfolg",
          description: "Fahrzeug erfolgreich gelöscht.",
        });
      }
    } catch (error) {
      console.error("Fehler beim Löschen des Fahrzeugs:", error);
      toast({
        title: "Fehler",
        description: "Fahrzeug konnte nicht gelöscht werden.",
        variant: "destructive",
      });
    }
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsVehicleFormOpen(true);
  };

  const handleOpenVehicleForm = () => {
    setEditingVehicle(null);
    setIsVehicleFormOpen(true);
  };

  const handleCloseVehicleForm = () => {
    setIsVehicleFormOpen(false);
    setEditingVehicle(null);
    fetchVehicles();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
                <Badge variant="secondary">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Zugang
                </Badge>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={activeTab} className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="vehicles" onClick={() => setActiveTab("vehicles")}>
                      <Car className="h-4 w-4 mr-2" />
                      Fahrzeuge
                    </TabsTrigger>
                    <TabsTrigger value="users" onClick={() => setActiveTab("users")}>
                      <Users className="h-4 w-4 mr-2" />
                      Benutzer
                    </TabsTrigger>
                    <TabsTrigger value="reports" onClick={() => setActiveTab("reports")}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Berichte
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="vehicles" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <CardTitle>Fahrzeugverwaltung</CardTitle>
                      <Button onClick={handleOpenVehicleForm}>
                        <Plus className="h-4 w-4 mr-2" />
                        Fahrzeug hinzufügen
                      </Button>
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {vehicles.map((vehicle) => (
                        <Card key={vehicle.id} className="shadow-md">
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              {vehicle.brand} {vehicle.model}
                              <Badge variant="outline">{vehicle.badge}</Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <img
                              src={vehicle.image_url}
                              alt={`${vehicle.brand} ${vehicle.model}`}
                              className="w-full h-48 object-cover mb-4 rounded-md"
                            />
                            <p className="text-gray-600">Jahr: {vehicle.year}</p>
                            <p className="text-gray-600">Preis: €{vehicle.price}</p>
                            <div className="flex justify-end space-x-2 mt-4">
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => handleEditVehicle(vehicle)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Bearbeiten
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteVehicle(vehicle.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Löschen
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="users" className="space-y-4">
                    <CardTitle>Benutzerverwaltung</CardTitle>
                    <ul>
                      {profiles.map((profile: any) => (
                        <li key={profile.id} className="py-2 border-b border-gray-200">
                          {profile.email}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="reports" className="space-y-4">
                    <CardTitle>Berichte und Analysen</CardTitle>
                    <p>Demnächst verfügbar...</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
      <LanguageSelector />
      
      {isVehicleFormOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative max-w-3xl mx-auto my-20 bg-white rounded-md shadow-lg">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-2xl font-bold">
                  {editingVehicle ? "Fahrzeug bearbeiten" : "Fahrzeug hinzufügen"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <VehicleForm
                  vehicle={editingVehicle}
                  onClose={handleCloseVehicleForm}
                  onVehicleUpdated={fetchVehicles}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
