import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VehicleGrid from '@/components/VehicleGrid';
import LanguageSelector from '@/components/LanguageSelector';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Grid3X3, List, Heart, Eye, Star } from 'lucide-react';

const Catalog = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const vehicles = [
    {
      id: 1,
      brand: 'BMW',
      model: 'M5 Competition',
      year: 2022,
      price: '89.500',
      mileage: '15.000',
      fuel: 'Benzin',
      power: '625 PS',
      transmission: 'Automatik',
      color: 'Schwarz Metallic',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Elite',
      rating: 4.9,
      location: 'Oranienburg',
      availability: 'Sofort verfügbar'
    },
    {
      id: 2,
      brand: 'Mercedes',
      model: 'AMG GT 63 S',
      year: 2023,
      price: '125.900',
      mileage: '8.500',
      fuel: 'Benzin',
      power: '630 PS',
      transmission: 'Automatik',
      color: 'Weiß Perleffekt',
      image: 'https://images.unsplash.com/photo-1563694983011-6f4d90358083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Collector',
      rating: 5.0,
      location: 'Oranienburg',
      availability: 'Sofort verfügbar'
    },
    {
      id: 3,
      brand: 'Porsche',
      model: '911 Turbo S',
      year: 2023,
      price: '198.500',
      mileage: '5.200',
      fuel: 'Benzin',
      power: '650 PS',
      transmission: 'PDK',
      color: 'Guards Rot',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Collector',
      rating: 5.0,
      location: 'Oranienburg',
      availability: 'Reserviert'
    },
    {
      id: 4,
      brand: 'Audi',
      model: 'RS6 Avant',
      year: 2022,
      price: '95.800',
      mileage: '12.000',
      fuel: 'Benzin',
      power: '600 PS',
      transmission: 'Tiptronic',
      color: 'Nardo Grau',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Elite',
      rating: 4.8,
      location: 'Oranienburg',
      availability: 'Sofort verfügbar'
    },
    {
      id: 5,
      brand: 'McLaren',
      model: '720S',
      year: 2021,
      price: '245.000',
      mileage: '7.800',
      fuel: 'Benzin',
      power: '720 PS',
      transmission: 'Automatik',
      color: 'Papaya Orange',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Collector',
      rating: 5.0,
      location: 'Oranienburg',
      availability: 'Sofort verfügbar'
    },
    {
      id: 6,
      brand: 'Lamborghini',
      model: 'Huracán EVO',
      year: 2022,
      price: '189.900',
      mileage: '9.500',
      fuel: 'Benzin',
      power: '640 PS',
      transmission: 'Automatik',
      color: 'Verde Mantis',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Collector',
      rating: 4.9,
      location: 'Oranienburg',
      availability: 'Sofort verfügbar'
    }
  ];

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-luxury-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Katalog Premium-Fahrzeuge
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Entdecken Sie unsere exklusive Sammlung handverlesener Luxusfahrzeuge, 
              jedes von unseren Experten inspiziert und zertifiziert.
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
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Marke" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="mercedes">Mercedes</SelectItem>
                    <SelectItem value="porsche">Porsche</SelectItem>
                    <SelectItem value="audi">Audi</SelectItem>
                    <SelectItem value="mclaren">McLaren</SelectItem>
                    <SelectItem value="lamborghini">Lamborghini</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Preisbereich" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50000">Bis 50.000€</SelectItem>
                    <SelectItem value="50000-100000">50.000€ - 100.000€</SelectItem>
                    <SelectItem value="100000-200000">100.000€ - 200.000€</SelectItem>
                    <SelectItem value="200000+">Über 200.000€</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Niveau" />
                  </SelectTrigger>
                  <SelectContent>
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
                      src={vehicle.image} 
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
                      }`}
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
                      <Button size="icon" variant="ghost" className="h-8 w-8 bg-white/80 hover:bg-white">
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
                      <h3 className="font-bold text-lg text-luxury-black">
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
                        {vehicle.mileage} km
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
                          €{vehicle.price}
                        </span>
                        <p className="text-xs text-luxury-gray">Festpreis</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-white"
                        >
                          Vergleichen
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-luxury-gold hover:bg-luxury-dark-gold text-black transition-all duration-300"
                        >
                          Details
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
      <LanguageSelector />
    </div>
  );
};

export default Catalog;
