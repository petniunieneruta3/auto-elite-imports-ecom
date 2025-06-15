
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-luxury-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Datenschutzerklärung
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Schutz Ihrer persönlichen Daten ist uns wichtig
            </p>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>1. Verantwortlicher</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Verantwortlicher für die Datenverarbeitung auf dieser Website ist:</p>
                  <p><strong>AUTO IMPORT EXPORT</strong><br />
                  Germendorfer Dorfstraße 66<br />
                  16515 Oranienburg, Deutschland<br />
                  Telefon: +33774 072351<br />
                  E-Mail: autoexport49@gmail.com</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Erhebung und Speicherung personenbezogener Daten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Wir erheben und verwenden Ihre personenbezogenen Daten nur, soweit dies erforderlich ist für:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Die Abwicklung Ihrer Anfrage oder Ihres Kaufs</li>
                    <li>Die Bereitstellung unserer Dienstleistungen</li>
                    <li>Die Erfüllung rechtlicher Verpflichtungen</li>
                    <li>Die Wahrung berechtigter Interessen</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Zweck der Datenverarbeitung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Ihre Daten werden verarbeitet für:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Kontaktaufnahme und Kommunikation</li>
                    <li>Vertragsabwicklung und Fahrzeugverkauf</li>
                    <li>Kundenservice und Support</li>
                    <li>Rechtliche Compliance</li>
                    <li>Verbesserung unserer Services</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Weitergabe von Daten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Ihre personenbezogenen Daten werden nur weitergegeben an:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Finanzierungspartner (bei Finanzierungsanfragen)</li>
                    <li>Versicherungspartner (bei Versicherungsabschluss)</li>
                    <li>Behörden (wenn gesetzlich vorgeschrieben)</li>
                    <li>Dienstleister (unter Auftragsverarbeitungsvertrag)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Speicherdauer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Wir speichern Ihre Daten nur so lange, wie:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Es für die jeweiligen Zwecke erforderlich ist</li>
                    <li>Gesetzliche Aufbewahrungsfristen bestehen</li>
                    <li>Es zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Car/CardTitle>6. Ihre Rechte</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                    <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                    <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                    <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                    <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                    <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Cookies und Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Unsere Website verwendet Cookies zur Verbesserung der Nutzererfahrung.</p>
                  <p>Sie können die Verwendung von Cookies in Ihrem Browser deaktivieren.</p>
                  <p>Weitere Informationen finden Sie in unserer Cookie-Richtlinie.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Kontakt bei Datenschutzfragen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Bei Fragen zum Datenschutz kontaktieren Sie uns:</p>
                  <p>E-Mail: autoexport49@gmail.com<br />
                  Telefon: +33774 072351</p>
                  <p>Sie haben auch das Recht, sich bei einer Datenschutzbehörde zu beschweren.</p>
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

export default Privacy;
