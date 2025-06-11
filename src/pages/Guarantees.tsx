
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle, Clock, FileText } from 'lucide-react';

const Guarantees = () => {
  const guaranteeTypes = [
    {
      icon: <Shield className="h-8 w-8 text-sky-500" />,
      title: "Motorgarantie",
      duration: "12 Monate",
      description: "Vollständige Abdeckung aller Motorkomponenten gegen Defekte"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-sky-500" />,
      title: "Getriebe & Antrieb",
      duration: "12 Monate", 
      description: "Schutz für Getriebe, Kupplung und Antriebskomponenten"
    },
    {
      icon: <Clock className="h-8 w-8 text-sky-500" />,
      title: "Elektronik",
      duration: "6 Monate",
      description: "Garantie auf elektronische Systeme und Steuergeräte"
    },
    {
      icon: <FileText className="h-8 w-8 text-sky-500" />,
      title: "Karosserie",
      duration: "6 Monate",
      description: "Schutz vor versteckten Karosserieschäden"
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
              Garantien & Gewährleistung
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ihr Schutz und unsere Qualitätsversprechen
            </p>
          </div>
        </section>

        {/* Guarantee Types */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {guaranteeTypes.map((guarantee, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {guarantee.icon}
                    </div>
                    <CardTitle className="text-lg">{guarantee.title}</CardTitle>
                    <p className="text-sky-500 font-semibold">{guarantee.duration}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{guarantee.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Terms & Conditions */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Garantiebedingungen</h2>
            
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Geltungsbereich</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Unsere Garantie gilt für alle von uns verkauften Gebrauchtwagen ab dem Kaufdatum.</p>
                  <p>Die Garantie deckt unvorhergesehene Defekte an den versicherten Komponenten ab.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ausschlüsse</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Von der Garantie ausgeschlossen sind:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Verschleißteile (Bremsen, Reifen, Batterien)</li>
                    <li>Schäden durch unsachgemäße Behandlung</li>
                    <li>Schäden durch Unfälle oder höhere Gewalt</li>
                    <li>Kosmetische Mängel</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Geltendmachung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Im Garantiefall kontaktieren Sie uns unverzüglich:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Telefon: +33774 072351</li>
                    <li>E-Mail: autoexport49@gmail.com</li>
                    <li>Reparaturen nur in autorisierten Werkstätten</li>
                  </ul>
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

export default Guarantees;
