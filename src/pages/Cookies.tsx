
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cookie, Shield, Settings, Info } from 'lucide-react';

const Cookies = () => {
  const cookieTypes = [
    {
      icon: <Shield className="h-6 w-6 text-sky-500" />,
      title: "Notwendige Cookies",
      description: "Für die grundlegende Funktionalität der Website erforderlich",
      examples: "Session-Management, Sicherheit"
    },
    {
      icon: <Settings className="h-6 w-6 text-sky-500" />,
      title: "Funktionale Cookies",
      description: "Ermöglichen erweiterte Funktionen und Personalisierung",
      examples: "Spracheinstellungen, Präferenzen"
    },
    {
      icon: <Info className="h-6 w-6 text-sky-500" />,
      title: "Analytische Cookies",
      description: "Helfen uns, die Website-Nutzung zu verstehen und zu verbessern",
      examples: "Besucherstatistiken, Leistungsanalyse"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-luxury-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Cookie className="h-16 w-16 mx-auto mb-4 text-sky-500" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cookie-Richtlinie
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Informationen über die Verwendung von Cookies auf unserer Website
            </p>
          </div>
        </section>

        {/* Cookie Types */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Arten von Cookies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {cookieTypes.map((type, index) => (
                <Card key={index}>
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      {type.icon}
                    </div>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 mb-4">{type.description}</p>
                    <p className="text-sm text-sky-500 font-medium">{type.examples}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Information */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Was sind Cookies?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie unsere Website besuchen.</p>
                  <p>Sie helfen uns, die Website zu verbessern und Ihnen eine bessere Nutzererfahrung zu bieten.</p>
                  <p>Cookies enthalten keine persönlich identifizierbaren Informationen und können Ihrem Computer nicht schaden.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Welche Cookies verwenden wir?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h4 className="font-semibold">Notwendige Cookies:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Session-Cookies für die Funktionalität der Website</li>
                    <li>Sicherheits-Cookies zum Schutz vor Angriffen</li>
                    <li>Einstellungs-Cookies für Ihre Präferenzen</li>
                  </ul>
                  
                  <h4 className="font-semibold mt-4">Analytische Cookies:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Google Analytics zur Webseitenanalyse</li>
                    <li>Besucherstatistiken und Nutzungsverhalten</li>
                    <li>Leistungsoptimierung</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Speicherdauer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p><strong>Session-Cookies:</strong> Werden gelöscht, wenn Sie den Browser schließen</p>
                  <p><strong>Persistente Cookies:</strong> Bleiben für einen festgelegten Zeitraum gespeichert</p>
                  <p><strong>Analytische Cookies:</strong> Werden nach 24 Monaten automatisch gelöscht</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cookie-Einstellungen verwalten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Sie können Cookies in Ihrem Browser verwalten:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Chrome:</strong> Einstellungen → Datenschutz und Sicherheit → Cookies</li>
                    <li><strong>Firefox:</strong> Einstellungen → Datenschutz & Sicherheit → Cookies</li>
                    <li><strong>Safari:</strong> Einstellungen → Datenschutz → Cookies verwalten</li>
                    <li><strong>Edge:</strong> Einstellungen → Cookies und Websiteberechtigungen</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Auswirkungen der Cookie-Deaktivierung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Bei deaktivierten Cookies können folgende Funktionen eingeschränkt sein:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Spracheinstellungen müssen bei jedem Besuch neu gewählt werden</li>
                    <li>Anmeldefunktionen funktionieren möglicherweise nicht</li>
                    <li>Personalisierte Inhalte sind nicht verfügbar</li>
                    <li>Website-Leistung kann beeinträchtigt werden</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Kontakt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Bei Fragen zu unserer Cookie-Richtlinie kontaktieren Sie uns:</p>
                  <p><strong>AUTO IMPORT EXPORT</strong><br />
                  E-Mail: autoexport49@gmail.com<br />
                  Telefon: +33774 072351</p>
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

export default Cookies;
