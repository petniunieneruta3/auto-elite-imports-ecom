
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VehicleImage {
  id: string;
  vehicle_id: string;
  image_url: string;
  is_primary: boolean;
  display_order: number;
  alt_text?: string;
}

export const useVehicleImages = (vehicleId?: string) => {
  const [images, setImages] = useState<VehicleImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [primaryImage, setPrimaryImage] = useState<string | null>(null);

  useEffect(() => {
    if (!vehicleId) {
      setLoading(false);
      return;
    }

    fetchImages(vehicleId);

    // Set up real-time subscription for image changes
    const channel = supabase
      .channel(`vehicle-images-${vehicleId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'vehicle_images',
          filter: `vehicle_id=eq.${vehicleId}`
        },
        () => {
          fetchImages(vehicleId);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [vehicleId]);

  const fetchImages = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('vehicle_images')
        .select('*')
        .eq('vehicle_id', id)
        .order('display_order', { ascending: true });

      if (error) throw error;

      setImages(data || []);
      
      // Set primary image
      const primary = data?.find(img => img.is_primary)?.image_url;
      setPrimaryImage(primary || data?.[0]?.image_url || null);
    } catch (error) {
      console.error('Error fetching vehicle images:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    images,
    primaryImage,
    loading,
    refetch: () => vehicleId && fetchImages(vehicleId)
  };
};
