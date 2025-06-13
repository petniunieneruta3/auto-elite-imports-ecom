
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Share2, Star, ShoppingCart, Phone, Mail, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

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

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchVehicle(id);
    }
  }, [id]);

  const fetchVehicle = async (vehicleId: string) => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', vehicleId)
        .single();

      if (error) throw error;
      setVehicle(data);
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les détails du véhicule.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (vehicle) {
      addToCart({
        id: vehicle.id,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
        image_url: vehicle.image_url,
      });
      
      toast({
        title: "Ajouté au panier",
        description: `${vehicle.brand} ${vehicle.model} a été ajouté à votre panier.`,
      });
    }
  };

  const handleContact = () => {
    toast({
      title: "Contact",
      description: "Redirection vers la page de contact...",
    });
    navigate('/contact');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold mx-auto"></div>
          <p className="mt-4 text-luxury-gray">Chargement des détails...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-20 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-luxury-black mb-4">Véhicule non trouvé</h1>
            <Button onClick={() => navigate('/catalog')} className="bg-luxury-gold hover:bg-luxury-dark-gold text-black">
              Retour au catalogue
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Back Button */}
        <section className="py-4 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/catalog')}
              className="text-luxury-gray hover:text-luxury-black"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au catalogue
            </Button>
          </div>
        </section>

        {/* Vehicle Details */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image */}
              <div className="relative">
                <img 
                  src={vehicle.image_url} 
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-96 lg:h-full object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4">
                  <Badge 
                    className={`${
                      vehicle.badge === 'Collector' 
                        ? 'bg-luxury-gold text-black' 
                        : 'bg-luxury-black text-white'
                    } font-medium`}
                  >
                    {vehicle.badge}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button size="icon" variant="ghost" className="h-10 w-10 bg-white/80 hover:bg-white">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-10 w-10 bg-white/80 hover:bg-white">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-black/70 text-white px-3 py-2 rounded">
                  <Star className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
                  <span className="text-sm font-medium">{vehicle.rating}</span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-luxury-black mb-2">
                    {vehicle.brand} {vehicle.model}
                  </h1>
                  <p className="text-luxury-gray text-lg">{vehicle.year}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <MapPin className="h-4 w-4 text-luxury-gray" />
                    <span className="text-luxury-gray">{vehicle.location}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`mt-2 ${
                      vehicle.availability === 'Sofort verfügbar' 
                        ? 'border-green-500 text-green-600' 
                        : 'border-orange-500 text-orange-600'
                    }`}
                  >
                    {vehicle.availability}
                  </Badge>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-luxury-black mb-4">Caractéristiques</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-luxury-gray">Kilomètres:</span>
                        <p className="font-semibold">{vehicle.mileage.toLocaleString()} km</p>
                      </div>
                      <div>
                        <span className="font-medium text-luxury-gray">Carburant:</span>
                        <p className="font-semibold">{vehicle.fuel}</p>
                      </div>
                      <div>
                        <span className="font-medium text-luxury-gray">Puissance:</span>
                        <p className="font-semibold">{vehicle.power}</p>
                      </div>
                      <div>
                        <span className="font-medium text-luxury-gray">Transmission:</span>
                        <p className="font-semibold">{vehicle.transmission}</p>
                      </div>
                      <div>
                        <span className="font-medium text-luxury-gray">Couleur:</span>
                        <p className="font-semibold">{vehicle.color}</p>
                      </div>
                      <div>
                        <span className="font-medium text-luxury-gray">Année:</span>
                        <p className="font-semibold">{vehicle.year}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-luxury-black mb-4">Description</h3>
                    <p className="text-luxury-gray leading-relaxed">
                      {vehicle.description || `Magnifique ${vehicle.brand} ${vehicle.model} de ${vehicle.year} en excellent état. Ce véhicule premium combine performance, luxe et fiabilité pour une expérience de conduite exceptionnelle.`}
                    </p>
                  </CardContent>
                </Card>

                {/* Price and Actions */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-3xl font-bold text-luxury-black">
                          €{vehicle.price.toLocaleString()}
                        </span>
                        <p className="text-luxury-gray">Prix fixe, TTC</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button 
                        onClick={handleAddToCart}
                        className="w-full bg-luxury-gold hover:bg-luxury-dark-gold text-black font-semibold"
                        size="lg"
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Ajouter au panier
                      </Button>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          onClick={handleContact}
                          variant="outline"
                          className="border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-white"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Appeler
                        </Button>
                        <Button 
                          onClick={handleContact}
                          variant="outline"
                          className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VehicleDetail;
