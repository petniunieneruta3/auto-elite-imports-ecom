
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import VehicleCard from './VehicleCard';

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

interface VehicleGridProps {
  vehicles: Vehicle[];
}

const VehicleGrid: React.FC<VehicleGridProps> = ({ vehicles }) => {
  const [displayedVehicles, setDisplayedVehicles] = useState<Vehicle[]>([]);
  const [showCount, setShowCount] = useState(8);
  const [hasMore, setHasMore] = useState(false);

  // Update displayed vehicles when vehicles or showCount changes
  useEffect(() => {
    const vehiclesToShow = vehicles.slice(0, showCount);
    setDisplayedVehicles(vehiclesToShow);
    setHasMore(vehicles.length > showCount);
  }, [vehicles, showCount]);

  const handleShowMore = () => {
    setShowCount(50); // Show all 50 vehicles when clicked
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={handleShowMore}
            className="bg-luxury-gold hover:bg-luxury-dark-gold text-black font-medium px-8 py-3 transition-all duration-300"
          >
            Voir plus de véhicules
          </Button>
        </div>
      )}
    </>
  );
};

export default VehicleGrid;
