import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Car, 
  Shield, 
  Wrench, 
  Truck, 
  FileText, 
  Users,
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: 'Fahrzeugbeschaffung',
      description: 'Wir helfen Ihnen, Ihr Traumauto zu finden und zu beschaffen, egal wo es sich befindet.',
      icon: Car,
    },
    {
      title: 'Garantie',
      description: 'Wir bieten umfassende Garantiepakete, um Ihnen Sicherheit und Schutz zu bieten.',
      icon: Shield,
    },
    {
      title: 'Wartung und Reparatur',
      description: 'Unsere erfahrenen Techniker kümmern sich um alle Ihre Wartungs- und Reparaturbedürfnisse.',
      icon: Wrench,
    },
    {
      title: 'Transport und Lieferung',
      description: 'Wir bieten sichere und zuverlässige Transport- und Lieferdienste für Ihr Fahrzeug.',
      icon: Truck,
    },
    {
      title: 'Dokumentation und Zulassung',
      description: 'Wir unterstützen Sie bei allen notwendigen Dokumenten und Zulassungsverfahren.',
      icon: FileText,
    },
    {
      title: 'Persönliche Beratung',
      description: 'Unser Team steht Ihnen mit persönlicher Beratung und Unterstützung zur Seite.',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-luxury-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Unsere Dienstleistungen
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Entdecken Sie unser umfassendes Angebot an Dienstleistungen rund um Ihr Fahrzeug.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <service.icon className="h-5 w-5 text-luxury-gold" />
                      <span className="text-lg font-semibold text-luxury-black">{service.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-luxury-black text-center mb-8">
              Warum Uns Wählen?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-luxury-black mb-2">
                  Expertise und Erfahrung
                </h3>
                <p className="text-gray-600">
                  Wir verfügen über jahrelange Erfahrung im Automobilbereich und bieten Ihnen fundierte Beratung und erstklassigen Service.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-luxury-black mb-2">
                  Qualität und Zuverlässigkeit
                </h3>
                <p className="text-gray-600">
                  Wir legen Wert auf höchste Qualität und Zuverlässigkeit bei allen unseren Dienstleistungen.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-luxury-black mb-2">
                  Persönliche Betreuung
                </h3>
                <p className="text-gray-600">
                  Wir nehmen uns Zeit für Ihre individuellen Bedürfnisse und bieten Ihnen eine persönliche Betreuung.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-luxury-black mb-2">
                  Umfassendes Angebot
                </h3>
                <p className="text-gray-600">
                  Von der Fahrzeugbeschaffung bis zur Wartung bieten wir Ihnen ein umfassendes Angebot an Dienstleistungen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-luxury-gold py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-luxury-black mb-4">
              Interesse geweckt?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Kontaktieren Sie uns noch heute für eine persönliche Beratung.
            </p>
            <Button className="bg-luxury-black hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-md transition-all duration-300">
              Beratung anfordern
            </Button>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-luxury-black text-center mb-8">
              Kontaktieren Sie Uns
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-luxury-gold" />
                    <span className="text-lg font-semibold text-luxury-black">Telefon</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">+33774 072351</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-luxury-gold" />
                    <span className="text-lg font-semibold text-luxury-black">E-Mail</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">autoexport49@gmail.com</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-luxury-gold" />
                    <span className="text-lg font-semibold text-luxury-black">Online-Anfrage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">24/7 Online-Support</p>
                </CardContent>
              </Card>
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
