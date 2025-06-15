import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Heart, Eye, Star, Grid3X3, List, ShoppingCart } from 'lucide-react';
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

const CatalogReal = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [brandFilter, setBrandFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [badgeFilter, setBadgeFilter] = useState('');
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    fetchVehicles();
    
    // Set up real-time subscription for vehicle changes
    const channel = supabase
      .channel('catalog-vehicles-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'vehicles'
        },
        (payload) => {
          console.log('Vehicle change detected in catalog:', payload);
          // Refresh the vehicles list when any change occurs
          fetchVehicles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (vehicle: Vehicle) => {
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
  };

  const handleViewDetails = (vehicleId: string) => {
    navigate(`/vehicle/${vehicleId}`);
  };

  const handleCompare = (vehicle: Vehicle) => {
    toast({
      title: "Comparaison",
      description: `${vehicle.brand} ${vehicle.model} ajouté à la comparaison.`,
    });
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBrand = !brandFilter || brandFilter === 'all' || vehicle.brand.toLowerCase() === brandFilter;
    
    const matchesPrice = !priceFilter || priceFilter === 'all' || (() => {
      const price = vehicle.price;
      switch (priceFilter) {
        case '0-50000': return price <= 50000;
        case '50000-100000': return price > 50000 && price <= 100000;
        case '100000-200000': return price > 100000 && price <= 200000;
        case '200000+': return price > 200000;
        default: return true;
      }
    })();
    
    const matchesBadge = !badgeFilter || badgeFilter === 'all' || vehicle.badge.toLowerCase() === badgeFilter;
    
    return matchesSearch && matchesBrand && matchesPrice && matchesBadge;
  });

  const uniqueBrands = Array.from(new Set(vehicles.map(v => v.brand)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold mx-auto"></div>
          <p className="mt-4 text-luxury-gray">Chargement du catalogue...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-luxury-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Fahrzeug-Katalog
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Erkunden Sie unsere exklusive Kollektion, jedes Fahrzeug von unseren Experten inspiziert.
            </p>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Marke oder Modell suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4 items-center">
                <Select value={brandFilter} onValueChange={setBrandFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Marke" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les marques</SelectItem>
                    {uniqueBrands.map(brand => (
                      <SelectItem key={brand} value={brand.toLowerCase()}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Preisbereich" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les prix</SelectItem>
                    <SelectItem value="0-50000">Bis 50.000€</SelectItem>
                    <SelectItem value="50000-100000">50.000€ - 100.000€</SelectItem>
                    <SelectItem value="100000-200000">100.000€ - 200.000€</SelectItem>
                    <SelectItem value="200000+">Über 200.000€</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={badgeFilter} onValueChange={setBadgeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les niveaux</SelectItem>
                    <SelectItem value="elite">Elite</SelectItem>
                    <SelectItem value="collector">Collector</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              {filteredVehicles.length} Fahrzeuge gefunden
            </div>
          </div>
        </section>

        {/* Vehicle Grid */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }>
              {filteredVehicles.map((vehicle) => (
                <Card key={vehicle.id} className={`group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}>
                  <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}`}>
                    <img 
                      src={vehicle.image_url} 
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className={`object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer ${
                        viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
                      }`}
                      onClick={() => handleViewDetails(vehicle.id)}
                    />
                    <div className="absolute top-3 left-3">
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
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8 bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 bg-white/80 hover:bg-white"
                        onClick={() => handleViewDetails(vehicle.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded">
                      <Star className="h-3 w-3 fill-luxury-gold text-luxury-gold" />
                      <span className="text-xs font-medium">{vehicle.rating}</span>
                    </div>
                  </div>
                  
                  <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="mb-3">
                      <h3 
                        className="font-bold text-lg text-luxury-black cursor-pointer hover:text-luxury-gold transition-colors"
                        onClick={() => handleViewDetails(vehicle.id)}
                      >
                        {vehicle.brand} {vehicle.model}
                      </h3>
                      <p className="text-luxury-gray text-sm">{vehicle.year} • {vehicle.location}</p>
                      <Badge 
                        variant="outline" 
                        className={`mt-1 text-xs ${
                          vehicle.availability === 'Sofort verfügbar' 
                            ? 'border-green-500 text-green-600' 
                            : 'border-orange-500 text-orange-600'
                        }`}
                      >
                        {vehicle.availability}
                      </Badge>
                    </div>
                    
                    <div className={`gap-2 mb-4 text-xs text-luxury-gray ${
                      viewMode === 'list' ? 'grid grid-cols-4' : 'grid grid-cols-2'
                    }`}>
                      <div>
                        <span className="font-medium">Kilometerstand:</span>
                        <br />
                        {vehicle.mileage.toLocaleString()} km
                      </div>
                      <div>
                        <span className="font-medium">Kraftstoff:</span>
                        <br />
                        {vehicle.fuel}
                      </div>
                      <div>
                        <span className="font-medium">Leistung:</span>
                        <br />
                        {vehicle.power}
                      </div>
                      <div>
                        <span className="font-medium">Getriebe:</span>
                        <br />
                        {vehicle.transmission}
                      </div>
                      {viewMode === 'list' && (
                        <div className="col-span-4">
                          <span className="font-medium">Farbe:</span> {vehicle.color}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-luxury-black">
                          €{vehicle.price.toLocaleString()}
                        </span>
                        <p className="text-xs text-luxury-gray">Festpreis</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-white"
                          onClick={() => handleCompare(vehicle)}
                        >
                          Vergleichen
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleViewDetails(vehicle.id)}
                          variant="outline"
                          className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black transition-all duration-300"
                        >
                          Détails
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleAddToCart(vehicle)}
                          className="bg-luxury-gold hover:bg-luxury-dark-gold text-black transition-all duration-300"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Panier
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CatalogReal;
