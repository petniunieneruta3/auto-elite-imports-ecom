
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import VehicleGrid from './VehicleGrid';

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
  mileage: number;
  fuel: string;
  power: string;
  transmission: string;
  color: string;
}

interface SearchFilters {
  brand: string;
  model: string;
  minPrice: string;
  maxPrice: string;
  minYear: string;
  maxYear: string;
  fuel: string;
  transmission: string;
  minMileage: string;
  maxMileage: string;
}

interface FeaturedVehiclesProps {
  searchFilters?: SearchFilters;
}

const FeaturedVehicles: React.FC<FeaturedVehiclesProps> = ({ searchFilters }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('FeaturedVehicles: Component mounted, fetching vehicles...');
    
    // Fetch vehicles directly without adding predefined ones
    fetchFeaturedVehicles();
    
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

  // Re-fetch when search filters change
  useEffect(() => {
    if (searchFilters) {
      fetchFeaturedVehicles();
    }
  }, [searchFilters]);

  const fetchFeaturedVehicles = async () => {
    try {
      console.log('FeaturedVehicles: Fetching featured vehicles with filters:', searchFilters);
      setLoading(true);
      
      let query = supabase
        .from('vehicles')
        .select('*');

      // Apply search filters if provided
      if (searchFilters) {
        console.log('FeaturedVehicles: Applying filters:', searchFilters);
        
        if (searchFilters.brand) {
          console.log(`FeaturedVehicles: Filtering by brand: ${searchFilters.brand}`);
          query = query.ilike('brand', `%${searchFilters.brand}%`);
        }
        if (searchFilters.model) {
          console.log(`FeaturedVehicles: Filtering by model: ${searchFilters.model}`);
          query = query.ilike('model', `%${searchFilters.model}%`);
        }
        if (searchFilters.fuel) {
          console.log(`FeaturedVehicles: Filtering by fuel: ${searchFilters.fuel}`);
          query = query.ilike('fuel', `%${searchFilters.fuel}%`);
        }
        if (searchFilters.transmission) {
          console.log(`FeaturedVehicles: Filtering by transmission: ${searchFilters.transmission}`);
          query = query.ilike('transmission', `%${searchFilters.transmission}%`);
        }
        if (searchFilters.minPrice) {
          query = query.gte('price', parseInt(searchFilters.minPrice));
        }
        if (searchFilters.maxPrice) {
          query = query.lte('price', parseInt(searchFilters.maxPrice));
        }
        if (searchFilters.minYear) {
          query = query.gte('year', parseInt(searchFilters.minYear));
        }
        if (searchFilters.maxYear) {
          query = query.lte('year', parseInt(searchFilters.maxYear));
        }
        if (searchFilters.minMileage) {
          query = query.gte('mileage', parseInt(searchFilters.minMileage));
        }
        if (searchFilters.maxMileage) {
          query = query.lte('mileage', parseInt(searchFilters.maxMileage));
        }
      }

      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('FeaturedVehicles: Error fetching vehicles:', error);
      } else {
        console.log('FeaturedVehicles: Vehicles fetched successfully:', data);
        console.log('FeaturedVehicles: Number of vehicles found:', data?.length);
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
          <p className="mt-4 text-luxury-gray">Fahrzeuge werden geladen...</p>
        </div>
      </section>
    );
  }

  const hasResults = vehicles.length > 0;
  const hasFilters = searchFilters && Object.values(searchFilters).some(filter => filter !== '');

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-luxury-black text-center mb-8">
          {hasFilters && !hasResults ? 'Keine Fahrzeuge gefunden' : 'Unsere Fahrzeuge'}
        </h2>
        
        {hasFilters && !hasResults ? (
          <div className="text-center py-12">
            <p className="text-luxury-gray text-lg mb-4">
              Leider konnten wir keine Fahrzeuge finden, die Ihren Suchkriterien entsprechen.
            </p>
            <p className="text-luxury-gray">
              Versuchen Sie, Ihre Filter anzupassen oder zurückzusetzen.
            </p>
          </div>
        ) : (
          <>
            {hasFilters && hasResults && (
              <p className="text-center text-luxury-gray mb-6">
                {vehicles.length} Fahrzeug{vehicles.length !== 1 ? 'e' : ''} gefunden
              </p>
            )}
            <VehicleGrid vehicles={vehicles} />
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedVehicles;
