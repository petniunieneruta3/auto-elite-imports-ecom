
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface VehicleImage {
  id: string;
  image_url: string;
  alt_text?: string;
  is_primary: boolean;
  display_order: number;
}

interface VehicleImageGalleryProps {
  images: VehicleImage[];
  vehicleName: string;
}

const VehicleImageGallery = ({ images, vehicleName }: VehicleImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
        <p className="text-gray-500">Aucune image disponible</p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[currentImageIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative">
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative cursor-pointer group">
              <img
                src={currentImage.image_url}
                alt={currentImage.alt_text || `${vehicleName} - Image ${currentImageIndex + 1}`}
                className="w-full h-96 lg:h-full object-cover rounded-lg group-hover:brightness-95 transition-all"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all rounded-lg flex items-center justify-center">
                <Maximize2 className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0">
            <img
              src={currentImage.image_url}
              alt={currentImage.alt_text || `${vehicleName} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
            />
          </DialogContent>
        </Dialog>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-20 h-16 rounded border-2 overflow-hidden transition-all ${
                index === currentImageIndex
                  ? 'border-luxury-gold'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <img
                src={image.image_url}
                alt={`${vehicleName} - Miniature ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleImageGallery;
