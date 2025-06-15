import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import VehicleGrid from './VehicleGrid';
import { addMercedesCLA } from '@/utils/addMercedesCLA';
import { addMercedesCLA200d } from '@/utils/addMercedesCLA200d';
import { addMercedesCLA200AMG } from '@/utils/addMercedesCLA200AMG';
import { addMercedesCLA200AMGLine } from '@/utils/addMercedesCLA200AMGLine';
import { addVolvoXC60 } from '@/utils/addVolvoXC60';
import { addVolvoV90 } from '@/utils/addVolvoV90';
import { addRenaultCaptur } from '@/utils/addRenaultCaptur';
import { addRenaultArkana } from '@/utils/addRenaultArkana';
import { addAudiQ8 } from '@/utils/addAudiQ8';
import { addAudiQ3 } from '@/utils/addAudiQ3';
import { addMercedesGLEAMG53 } from '@/utils/addMercedesGLEAMG53';
import { addFordMustang } from '@/utils/addFordMustang';
import { addMercedesG63AMG } from '@/utils/addMercedesG63AMG';
import { addMercedesGLC43AMG } from '@/utils/addMercedesGLC43AMG';
import { addMercedesGLE350d } from '@/utils/addMercedesGLE350d';
import { addVolkswagenGolfGTE } from '@/utils/addVolkswagenGolfGTE';
import { addBMWX3 } from '@/utils/addBMWX3';
import { addBMWX4 } from '@/utils/addBMWX4';
import { addMercedesGLA45SAMG } from '@/utils/addMercedesGLA45SAMG';
import { addCitroenC4 } from '@/utils/addCitroenC4';
import { addVolkswagenGolfRLine } from '@/utils/addVolkswagenGolfRLine';
import { addPorscheCayenneCoupe } from '@/utils/addPorscheCayenneCoupe';
import { addAudiA3Sportback } from '@/utils/addAudiA3Sportback';

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

const FeaturedVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('FeaturedVehicles: Component mounted, adding vehicles and fetching...');
    
    // Add vehicles if they don't exist, then fetch vehicles
    const initializeVehicles = async () => {
      await addMercedesCLA();
      await addMercedesCLA200d();
      await addMercedesCLA200AMG();
      await addMercedesCLA200AMGLine();
      await addVolvoXC60();
      await addVolvoV90();
      await addRenaultCaptur();
      await addRenaultArkana();
      await addAudiQ8();
      await addAudiQ3();
      await addMercedesGLEAMG53();
      await addFordMustang();
      await addMercedesG63AMG();
      await addMercedesGLC43AMG();
      await addMercedesGLE350d();
      await addVolkswagenGolfGTE();
      await addBMWX3();
      await addBMWX4();
      await addMercedesGLA45SAMG();
      await addCitroenC4();
      await addVolkswagenGolfRLine();
      await addPorscheCayenneCoupe();
      await addAudiA3Sportback();
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
        <VehicleGrid vehicles={vehicles} />
      </div>
    </section>
  );
};

export default FeaturedVehicles;
