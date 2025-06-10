
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Eye, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeaturedVehicles = () => {
  const navigate = useNavigate();

  const featuredCars = [
    {
      id: 1,
      brand: 'BMW',
      model: 'M5 Competition',
      year: 2022,
      price: '89.500',
      mileage: '15.000',
      fuel: 'Benzin',
      power: '625 PS',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Elite',
      rating: 4.9,
      location: 'Oranienburg'
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
      image: 'https://images.unsplash.com/photo-1563694983011-6f4d90358083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Collector',
      rating: 5.0,
      location: 'Oranienburg'
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
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Collector',
      rating: 5.0,
      location: 'Oranienburg'
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
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Elite',
      rating: 4.8,
      location: 'Oranienburg'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-luxury-black mb-4">
            Unsere besten Angebote
          </h2>
          <p className="text-lg text-luxury-gray max-w-2xl mx-auto">
            Entdecken Sie unsere handverlesene Kollektion von Premium-Fahrzeugen, 
            jedes einzelne von unseren Experten sorgfältig inspiziert und zertifiziert.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <Card key={car.id} className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
              <div className="relative">
                <img 
                  src={car.image} 
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge 
                    className={`${
                      car.badge === 'Collector' 
                        ? 'bg-luxury-gold text-black' 
                        : 'bg-luxury-black text-white'
                    } font-medium`}
                  >
                    {car.badge}
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
                  <span className="text-xs font-medium">{car.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-bold text-lg text-luxury-black">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-luxury-gray text-sm">{car.year} • {car.location}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-luxury-gray">
                  <div>
                    <span className="font-medium">Kilometerstand:</span>
                    <br />
                    {car.mileage} km
                  </div>
                  <div>
                    <span className="font-medium">Kraftstoff:</span>
                    <br />
                    {car.fuel}
                  </div>
                  <div>
                    <span className="font-medium">Leistung:</span>
                    <br />
                    {car.power}
                  </div>
                  <div>
                    <span className="font-medium">Verfügbar:</span>
                    <br />
                    Sofort
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-luxury-black">
                      €{car.price}
                    </span>
                    <p className="text-xs text-luxury-gray">Festpreis</p>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-luxury-black hover:bg-luxury-gold hover:text-black transition-all duration-300"
                    onClick={() => navigate(`/vehicle/${car.id}`)}
                  >
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-white px-8 py-3 font-semibold"
            onClick={() => navigate('/catalog')}
          >
            Ver Catálogo Completo
          </Button>
          <p className="text-sm text-luxury-gray mt-2">
            Erkunden Sie unsere Premium-Kollektion, jedes Fahrzeug von unseren Experten inspiziert.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
