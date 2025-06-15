
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useVehicleImages } from '@/hooks/useVehicleImages';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  image_url: string;
  badge: string;
  rating: number;
  location: string;
  availability: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const navigate = useNavigate();
  const { primaryImage } = useVehicleImages(vehicle.id);

  const handleViewDetails = () => {
    navigate(`/vehicle/${vehicle.id}`);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
      <div className="relative">
        <img
          src={primaryImage || vehicle.image_url}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
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
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 bg-white/80 hover:bg-white">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded">
          <Star className="h-3 w-3 fill-luxury-gold text-luxury-gold" />
          <span className="text-xs font-medium">{vehicle.rating}</span>
        </div>
      </div>
      <CardContent className="p-4">
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
        <Button
          onClick={handleViewDetails}
          className="w-full mt-4 bg-luxury-gold hover:bg-luxury-dark-gold text-black transition-all duration-300"
        >
          Voir détails
        </Button>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
