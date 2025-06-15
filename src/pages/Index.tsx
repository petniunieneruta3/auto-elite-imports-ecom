
import React from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import FeaturedVehicles from '@/components/FeaturedVehicles';
import AdvantagesSection from '@/components/AdvantagesSection';
import TestimonialSection from '@/components/TestimonialSection';
import Footer from '@/components/Footer';
import AddMercedesButton from '@/components/AddMercedesButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroBanner />
      
      {/* Temporary button to add the Mercedes */}
      <div className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AddMercedesButton />
        </div>
      </div>

      <FeaturedVehicles />
      <AdvantagesSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default Index;
