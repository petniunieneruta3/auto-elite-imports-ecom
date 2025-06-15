import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useVehicleImages } from '@/hooks/useVehicleImages';
import { addMercedesCLA } from '@/utils/addMercedesCLA';
import { addMercedesCLA200d } from '@/utils/addMercedesCLA200d';
import { addVolvoXC60 } from '@/utils/addVolvoXC60';
import { addVolvoV90 } from '@/utils/addVolvoV90';
import { addRenaultCaptur } from '@/utils/addRenaultCaptur';
import { addRenaultArkana } from '@/utils/addRenaultArkana';
import { addAudiQ8 } from '@/utils/addAudiQ8';

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

const VehicleCard: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
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

const FeaturedVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('FeaturedVehicles: Component mounted, adding vehicles and fetching...');
    
    // Add vehicles if they don't exist, then fetch vehicles
    const initializeVehicles = async () => {
      await addMercedesCLA();
      await addMercedesCLA200d();
      await addVolvoXC60();
      await addVolvoV90();
      await addRenaultCaptur();
      await addRenaultArkana();
      await addAudiQ8();
      fetchFeaturedVehicles();
    };
    
    initializeVehicles();
    
    const channel = supabase
      .channel('vehicles')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'vehicles' },
        (payload) => {
          console.log('Change received!', payload);
          fetchFeaturedVehicles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchFeaturedVehicles = async () => {
    try {
      console.log('FeaturedVehicles: Fetching featured vehicles...');
      setLoading(true);
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('FeaturedVehicles: Error fetching vehicles:', error);
      } else {
        console.log('FeaturedVehicles: Vehicles fetched successfully:', data);
        setVehicles(data || []);
      }
    } catch (error) {
      console.error('FeaturedVehicles: Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold mx-auto"></div>
          <p className="mt-4 text-luxury-gray">Chargement des véhicules...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-luxury-black text-center mb-8">
          Nos Véhicules Vedettes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
