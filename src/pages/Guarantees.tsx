import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, Clock, FileText } from 'lucide-react';

const Guarantees = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        <section className="bg-luxury-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Unsere Garantien
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Wir bieten umfassende Garantien, damit Sie mit Vertrauen und Sicherheit kaufen können.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Garantiekarte 1 */}
              <Card className="shadow-lg border-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-2xl font-bold">
                    <Shield className="mr-2 h-6 w-6 text-luxury-gold inline-block align-middle" />
                    Umfassende Garantie
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Unsere umfassende Garantie deckt Material- und Herstellungsfehler für bis zu 24 Monate ab Kaufdatum ab.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4">
                    <li>Motor und Getriebe</li>
                    <li>Elektrische Komponenten</li>
                    <li>Klimaanlage</li>
                    <li>Bremsanlage</li>
                  </ul>
                  <Badge className="bg-green-100 text-green-800 font-semibold py-1 px-2 rounded-full">
                    <CheckCircle className="mr-1 h-4 w-4 inline-block align-middle" />
                    Inklusive
                  </Badge>
                </CardContent>
              </Card>

              {/* Garantiekarte 2 */}
              <Card className="shadow-lg border-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-2xl font-bold">
                    <Clock className="mr-2 h-6 w-6 text-luxury-gold inline-block align-middle" />
                    Schnelle Reparatur
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Im Garantiefall garantieren wir eine schnelle und effiziente Reparatur, um Ihre Ausfallzeiten zu minimieren.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4">
                    <li>Bevorzugte Terminplanung</li>
                    <li>Express-Service</li>
                    <li>Qualifizierte Techniker</li>
                  </ul>
                  <Badge className="bg-blue-100 text-blue-800 font-semibold py-1 px-2 rounded-full">
                    <CheckCircle className="mr-1 h-4 w-4 inline-block align-middle" />
                    Schnelle Bearbeitung
                  </Badge>
                </CardContent>
              </Card>

              {/* Garantiekarte 3 */}
              <Card className="shadow-lg border-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-2xl font-bold">
                    <FileText className="mr-2 h-6 w-6 text-luxury-gold inline-block align-middle" />
                    Transparente Bedingungen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Unsere Garantiebedingungen sind klar und verständlich, ohne versteckte Klauseln oder unerwartete Kosten.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4">
                    <li>Einfache Antragsstellung</li>
                    <li>Detaillierte Dokumentation</li>
                    <li>Persönliche Beratung</li>
                  </ul>
                  <Badge className="bg-purple-100 text-purple-800 font-semibold py-1 px-2 rounded-full">
                    <CheckCircle className="mr-1 h-4 w-4 inline-block align-middle" />
                    Klar und deutlich
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center">
                  Häufig gestellte Fragen
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Was deckt die Garantie ab?
                  </h3>
                  <p>
                    Unsere Garantie deckt Material- und Herstellungsfehler an Ihrem Fahrzeug ab.
                    Ausgenommen sind Verschleißteile und Schäden durch unsachgemäße Behandlung.
                  </p>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Wie lange ist die Garantie gültig?
                  </h3>
                  <p>
                    Die Garantie ist für 12 oder 24 Monate gültig, abhängig von der gewählten Option.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Wie kann ich einen Garantieanspruch geltend machen?
                  </h3>
                  <p>
                    Im Garantiefall kontaktieren Sie bitte unseren Kundenservice. Wir werden den
                    weiteren Ablauf mit Ihnen abstimmen.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
      <LanguageSelector />
    </div>
  );
};

export default Guarantees;
