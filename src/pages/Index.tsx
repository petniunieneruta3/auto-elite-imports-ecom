
import React from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import FeaturedVehicles from '@/components/FeaturedVehicles';
import TestimonialSection from '@/components/TestimonialSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroBanner />
        <FeaturedVehicles />
        <TestimonialSection />
        <AdvantagesSection />
      </main>
      <Footer />
      <LanguageSelector />
    </div>
  );
};

export default Index;
