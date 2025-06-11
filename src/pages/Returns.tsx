
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, Calendar, Shield, AlertCircle } from 'lucide-react';

const Returns = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-luxury-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Rückgabepolitik
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ihr Rückgaberecht und unsere Bedingungen
            </p>
          </div>
        </section>

        {/* Return Policy */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <Calendar className="h-8 w-8 text-sky-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">14 Tage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Rückgabefrist ab Lieferung</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <RotateCcw className="h-8 w-8 text-sky-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Vollerstattung</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">100% Kaufpreis zurück</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Shield className="h-8 w-8 text-sky-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Schutz</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Käuferschutz garantiert</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <AlertCircle className="h-8 w-8 text-sky-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Bedingungen</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Fahrzeug im Originalzustand</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Rückgabebedingungen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen den Kaufvertrag zu widerrufen.</p>
                  <p>Die Widerrufsfrist beträgt 14 Tage ab dem Tag der Fahrzeugübergabe.</p>
                  <p>Das Fahrzeug muss in dem Zustand zurückgegeben werden, in dem es übergeben wurde.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ausschlüsse</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Das Widerrufsrecht besteht nicht bei:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Fahrzeugen mit mehr als 500 km zusätzlicher Laufleistung</li>
                    <li>Beschädigungen, die nach der Übergabe entstanden sind</li>
                    <li>Fahrzeugen, die individuell angepasst wurden</li>
                    <li>Verschmutzungen oder Geruchsbelästigungen</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rückgabeabwicklung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>So läuft die Rückgabe ab:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Schriftliche Widerrufserklärung an uns senden</li>
                    <li>Terminvereinbarung für die Fahrzeugrückgabe</li>
                    <li>Begutachtung des Fahrzeugzustands</li>
                    <li>Erstattung des Kaufpreises binnen 14 Tagen</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Kontakt für Rückgaben</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p><strong>AUTO IMPORT EXPORT</strong></p>
                  <p>Germendorfer Dorfstraße 66<br />16515 Oranienburg, Deutschland</p>
                  <p>Telefon: +33774 072351<br />E-Mail: autoexport49@gmail.com</p>
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

export default Returns;
