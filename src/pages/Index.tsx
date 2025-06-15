
import React from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import FeaturedVehicles from '@/components/FeaturedVehicles';
import PurchaseProcedure from '@/components/PurchaseProcedure';
import AdvantagesSection from '@/components/AdvantagesSection';
import TestimonialSection from '@/components/TestimonialSection';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroBanner />
      <FeaturedVehicles />
      <PurchaseProcedure />
      <AdvantagesSection />
      <TestimonialSection />
      <Footer />
      <LanguageSelector />
    </div>
  );
};

export default Index;
