
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-luxury-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Allgemeine Geschäftsbedingungen
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Rechtliche Grundlagen unserer Geschäftsbeziehung
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>§1 Geltungsbereich</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen AUTO IMPORT EXPORT und dem Käufer.</p>
                  <p>Abweichende Bedingungen des Käufers werden nicht anerkannt, es sei denn, wir haben ihrer Geltung ausdrücklich schriftlich zugestimmt.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>§2 Vertragsschluss</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Die Präsentation der Fahrzeuge in unserem Katalog und auf unserer Website stellt kein bindendes Angebot dar.</p>
                  <p>Der Kaufvertrag kommt durch die schriftliche Bestätigung unsererseits zustande.</p>
                  <p>Alle Vereinbarungen sind schriftlich zu fixieren.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>§3 Preise und Zahlungsbedingungen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer.</p>
                  <p>Die Zahlung ist bei Vertragsschluss fällig, sofern nicht anders vereinbart.</p>
                  <p>Bei Ratenzahlung gelten die vereinbarten Finanzierungskonditionen.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>§4 Lieferung und Übergabe</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Die Lieferung erfolgt nach vollständiger Bezahlung des Kaufpreises.</p>
                  <p>Liefertermine sind unverbindlich, es sei denn, sie sind ausdrücklich als verbindlich vereinbart.</p>
                  <p>Die Gefahr geht mit der Übergabe des Fahrzeugs auf den Käufer über.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>§5 Gewährleistung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Für Gebrauchtwagen gilt eine Gewährleistung von 12 Monaten ab Übergabe.</p>
                  <p>Die Gewährleistung umfasst die Behebung von Mängeln, die bereits zum Zeitpunkt der Übergabe vorhanden waren.</p>
                  <p>Verschleißteile sind von der Gewährleistung ausgeschlossen.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>§6 Haftungsbeschränkung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Unsere Haftung ist auf Vorsatz und grobe Fahrlässigkeit beschränkt.</p>
                  <p>Bei leichter Fahrlässigkeit haften wir nur bei Verletzung wesentlicher Vertragspflichten.</p>
                  <p>Die Haftung für mittelbare Schäden ist ausgeschlossen.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>§7 Gerichtsstand und anwendbares Recht</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Gerichtsstand ist Rotterdam, Niederlande.</p>
                  <p>Es gilt niederländisches Recht unter Ausschluss des UN-Kaufrechts.</p>
                  <p>Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Kontakt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p><strong>AUTO IMPORT EXPORT</strong></p>
                  <p>Germendorfer Dorfstraße 66<br />16515 Oranienburg, Deutschland</p>
                  <p>Telefon: +33774 072351<br />E-Mail: autoexport49@gmail.com</p>
                  <p>USt-IdNr: DE123456789</p>
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

export default Terms;
