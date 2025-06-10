
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Entdecken Sie unsere Premium-Auswahl an Gebrauchtwagen",
      subtitle: "Jedes Fahrzeug von unseren Experten inspiziert",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      cta: "Katalog entdecken"
    },
    {
      title: "Luxus trifft Vertrauen",
      subtitle: "24 Monate Garantie auf alle Fahrzeuge",
      image: "https://images.unsplash.com/photo-1563694983011-6f4d90358083?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      cta: "Mehr erfahren"
    },
    {
      title: "Sichere Lieferung europaweit",
      subtitle: "GPS-Tracking und Premium-Service inklusive",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      cta: "Lieferung verfolgen"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              {slides[currentSlide].subtitle}
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Button 
                size="lg"
                className="bg-luxury-gold hover:bg-luxury-dark-gold text-black font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/catalog')}
              >
                {slides[currentSlide].cta}
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg transition-all duration-300"
                onClick={() => navigate('/contact')}
              >
                Kontakt aufnehmen
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-luxury-gold' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Floating Animation Element */}
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 animate-float hidden lg:block">
        <div className="w-32 h-32 bg-luxury-gold/20 rounded-full blur-xl"></div>
      </div>
    </section>
  );
};

export default HeroBanner;
