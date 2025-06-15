
import React from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import FeaturedVehicles from '@/components/FeaturedVehicles';
import AdvantagesSection from '@/components/AdvantagesSection';
import TestimonialSection from '@/components/TestimonialSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroBanner />
      <FeaturedVehicles />
      <AdvantagesSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default Index;
