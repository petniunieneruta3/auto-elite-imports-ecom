
import React from 'react';
import { Shield, Truck, Award, Clock, Phone, Star } from 'lucide-react';

const AdvantagesSection = () => {
  const advantages = [
    {
      icon: Shield,
      title: 'Qualität zertifiziert',
      description: '150-Punkte-Inspektion für jedes Fahrzeug',
      details: 'Jedes Fahrzeug durchläuft unsere strenge 150-Punkte-Qualitätsprüfung'
    },
    {
      icon: Award,
      title: 'Garantie 24 Monate',
      description: 'Umfassender Schutz für Ihren Kauf',
      details: 'Motor- und Getriebegarantie für 24 Monate, Elektronik für 12 Monate'
    },
    {
      icon: Truck,
      title: 'Sichere Lieferung',
      description: 'GPS-Tracking und versicherter Transport',
      details: 'Europaweit mit Echtzeit-GPS-Verfolgung und Vollversicherung'
    },
    {
      icon: Clock,
      title: 'Express Service',
      description: 'Schnelle Abwicklung in 24-48h',
      details: 'Von der Reservierung bis zur Lieferung - maximale Effizienz'
    },
    {
      icon: Phone,
      title: 'Support 24/7',
      description: 'Rund um die Uhr für Sie da',
      details: 'Technischer Support und Pannenhilfe jederzeit verfügbar'
    },
    {
      icon: Star,
      title: 'Premium Auswahl',
      description: 'Nur die besten Fahrzeuge',
      details: 'Handverlesen von unseren Fahrzeugexperten mit jahrelanger Erfahrung'
    }
  ];

  return (
    <section className="py-16 luxury-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Warum AUTO IMPORT EXPORT?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Vertrauen Sie auf unsere Expertise und genießen Sie Premium-Service 
            bei jedem Schritt Ihres Fahrzeugkaufs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div 
                key={index}
                className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-luxury-gold rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {advantage.title}
                  </h3>
                </div>
                <p className="text-gray-300 mb-3 font-medium">
                  {advantage.description}
                </p>
                <p className="text-gray-400 text-sm">
                  {advantage.details}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ihre Zufriedenheit ist unser Versprechen
            </h3>
            <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
              Mit über 10 Jahren Erfahrung im Automobilhandel garantieren wir Ihnen 
              nicht nur Premium-Fahrzeuge, sondern auch einen Service, der Ihre 
              Erwartungen übertrifft.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-luxury-gold mb-2">99%</div>
                <div className="text-gray-300">Kundenzufriedenheit</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-luxury-gold mb-2">48h</div>
                <div className="text-gray-300">Durchschnittliche Lieferzeit</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-luxury-gold mb-2">7 Tage</div>
                <div className="text-gray-300">Rückgaberecht</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
