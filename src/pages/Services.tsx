
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star, Shield, Truck, Settings, Users } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <CheckCircle className="h-8 w-8 text-luxury-gold" />,
      title: "Fahrzeuginspektion",
      description: "Professionelle Begutachtung aller Fahrzeuge durch zertifizierte Experten",
      features: ["Technische Prüfung", "Qualitätskontrolle", "Dokumentation"]
    },
    {
      icon: <Shield className="h-8 w-8 text-luxury-gold" />,
      title: "Garantie & Gewährleistung",
      description: "Umfassende Garantien für Ihren Seelenfrieden",
      features: ["12 Monate Garantie", "Rückgaberecht", "24/7 Support"]
    },
    {
      icon: <Truck className="h-8 w-8 text-luxury-gold" />,
      title: "Lieferung",
      description: "Sicherer Transport Ihres Fahrzeugs bis vor Ihre Haustür",
      features: ["Europaweit", "Versichert", "Termingerecht"]
    },
    {
      icon: <Settings className="h-8 w-8 text-luxury-gold" />,
      title: "Finanzierung",
      description: "Flexible Finanzierungsoptionen für jeden Bedarf",
      features: ["Leasing", "Kredit", "Ratenzahlung"]
    },
    {
      icon: <Users className="h-8 w-8 text-luxury-gold" />,
      title: "Beratung",
      description: "Persönliche Beratung von unseren Fahrzeugexperten",
      features: ["Kostenlos", "Unverbindlich", "Kompetent"]
    },
    {
      icon: <Star className="h-8 w-8 text-luxury-gold" />,
      title: "After-Sales Service",
      description: "Kontinuierlicher Service auch nach dem Kauf",
      features: ["Wartung", "Reparaturen", "Originalteile"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-luxury-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Unsere Dienstleistungen
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Professionelle Services rund um Ihren Traumwagen
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl text-luxury-black">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-luxury-gray mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center justify-center text-sm text-luxury-gray">
                          <CheckCircle className="h-4 w-4 text-luxury-gold mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-luxury-black text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Bereit für Ihren Traumwagen?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Kontaktieren Sie uns für eine persönliche Beratung
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
              >
                Jetzt beraten lassen
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Katalog ansehen
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <LanguageSelector />
    </div>
  );
};

export default Services;
