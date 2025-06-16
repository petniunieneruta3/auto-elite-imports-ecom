
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search } from 'lucide-react';

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

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
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

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    const resetFilters: SearchFilters = {
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
    };
    setFilters(resetFilters);
    onSearch(resetFilters);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-luxury-black mb-4">
            Erweiterte Suche
          </h2>
          <p className="text-luxury-gray text-lg">
            Finden Sie Ihr perfektes Fahrzeug mit unseren detaillierten Suchfiltern
          </p>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Brand */}
              <div>
                <Label htmlFor="brand" className="text-sm font-medium text-gray-700 mb-2 block">
                  Marke
                </Label>
                <Select value={filters.brand} onValueChange={(value) => handleInputChange('brand', value || '')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Alle Marken" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
                    <SelectItem value="BMW">BMW</SelectItem>
                    <SelectItem value="Audi">Audi</SelectItem>
                    <SelectItem value="Volkswagen">Volkswagen</SelectItem>
                    <SelectItem value="Volvo">Volvo</SelectItem>
                    <SelectItem value="Renault">Renault</SelectItem>
                    <SelectItem value="Ford">Ford</SelectItem>
                    <SelectItem value="Porsche">Porsche</SelectItem>
                    <SelectItem value="Range Rover">Range Rover</SelectItem>
                    <SelectItem value="Citroën">Citroën</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Model */}
              <div>
                <Label htmlFor="model" className="text-sm font-medium text-gray-700 mb-2 block">
                  Modell
                </Label>
                <Input
                  id="model"
                  type="text"
                  placeholder="z.B. CLA, X5, A4"
                  value={filters.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                />
              </div>

              {/* Fuel Type */}
              <div>
                <Label htmlFor="fuel" className="text-sm font-medium text-gray-700 mb-2 block">
                  Kraftstoff
                </Label>
                <Select value={filters.fuel} onValueChange={(value) => handleInputChange('fuel', value || '')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Alle Kraftstoffe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Benzin">Benzin</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="Elektro">Elektro</SelectItem>
                    <SelectItem value="Plug-in Hybrid">Plug-in Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Transmission */}
              <div>
                <Label htmlFor="transmission" className="text-sm font-medium text-gray-700 mb-2 block">
                  Getriebe
                </Label>
                <Select value={filters.transmission} onValueChange={(value) => handleInputChange('transmission', value || '')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Alle Getriebe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Automatik">Automatik</SelectItem>
                    <SelectItem value="Manuell">Manuell</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Preis (€)
                </Label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Von"
                    value={filters.minPrice}
                    onChange={(e) => handleInputChange('minPrice', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Bis"
                    value={filters.maxPrice}
                    onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                  />
                </div>
              </div>

              {/* Year Range */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Baujahr
                </Label>
                <div className="flex space-x-2">
                  <Select value={filters.minYear} onValueChange={(value) => handleInputChange('minYear', value || '')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Von" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filters.maxYear} onValueChange={(value) => handleInputChange('maxYear', value || '')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Bis" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Mileage Range */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Kilometerstand
                </Label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Von km"
                    value={filters.minMileage}
                    onChange={(e) => handleInputChange('minMileage', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Bis km"
                    value={filters.maxMileage}
                    onChange={(e) => handleInputChange('maxMileage', e.target.value)}
                  />
                </div>
              </div>

              {/* Search Buttons */}
              <div className="flex flex-col space-y-2">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Aktionen
                </Label>
                <Button
                  onClick={handleSearch}
                  className="bg-luxury-gold hover:bg-luxury-dark-gold text-black font-medium flex items-center justify-center"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Suchen
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Zurücksetzen
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdvancedSearch;
