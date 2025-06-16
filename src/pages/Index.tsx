
import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import AdvancedSearch from '@/components/AdvancedSearch';
import FeaturedVehicles from '@/components/FeaturedVehicles';
import PurchaseProcedure from '@/components/PurchaseProcedure';
import AdvantagesSection from '@/components/AdvantagesSection';
import TestimonialSection from '@/components/TestimonialSection';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';

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

const Index = () => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    brand: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    fuel: '',
    transmission: '',
    minMileage: '',
    maxMileage: ''
  });

  const handleSearch = (filters: SearchFilters) => {
    console.log('Search filters applied:', filters);
    setSearchFilters(filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroBanner />
      <AdvancedSearch onSearch={handleSearch} />
      <FeaturedVehicles searchFilters={searchFilters} />
      <PurchaseProcedure />
      <AdvantagesSection />
      <TestimonialSection />
      <Footer />
      <LanguageSelector />
    </div>
  );
};

export default Index;
