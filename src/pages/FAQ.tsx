
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail, CreditCard, Truck, Shield } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "Wie funktioniert der Kaufprozess?",
      answer: "Der Kaufprozess ist einfach: Wählen Sie Ihr Fahrzeug aus, kontaktieren Sie uns für Details, vereinbaren Sie eine Besichtigung (optional), schließen Sie den Kaufvertrag ab und wir organisieren die Lieferung."
    },
    {
      question: "Welche Garantien bieten Sie?",
      answer: "Wir bieten eine 24-monatige Garantie auf alle unsere Fahrzeuge, die Motorschäden, Getriebeschäden und andere wichtige Komponenten abdeckt."
    },
    {
      question: "Ist eine Finanzierung möglich?",
      answer: "Ja, wir arbeiten mit verschiedenen Finanzpartnern zusammen und bieten flexible Finanzierungsoptionen, einschließlich Leasing und Ratenkauf."
    },
    {
      question: "Liefern Sie europaweit?",
      answer: "Ja, wir liefern in ganz Europa. Die Lieferkosten variieren je nach Zielort. Kontaktieren Sie uns für ein individuelles Angebot."
    },
    {
      question: "Kann ich das Fahrzeug vor dem Kauf besichtigen?",
      answer: "Selbstverständlich! Sie können einen Termin in unserem Showroom in Oranienburg vereinbaren oder eine Videobesichtigung anfordern."
    },
    {
      question: "Welche Zahlungsmethoden akzeptieren Sie?",
      answer: "Wir akzeptieren Banküberweisungen, Barzahlung (bis zu bestimmten Grenzen) und Finanzierung über unsere Partner."
    },
    {
      question: "Was ist im Kaufpreis enthalten?",
      answer: "Der Kaufpreis umfasst das Fahrzeug, eine Vollinspektion, alle notwendigen Dokumente und eine Grundreinigung. Lieferung und Zulassung können zusätzliche Kosten verursachen."
    },
    {
      question: "Haben Sie auch Inzahlungnahme?",
      answer: "Ja, wir bewerten Ihr aktuelles Fahrzeug gerne und können es in Zahlung nehmen. Kontaktieren Sie uns für eine kostenlose Bewertung."
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
              Häufig gestellte Fragen
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Hier finden Sie Antworten auf die wichtigsten Fragen rund um unsere Services
            </p>
          </div>
        </section>

        {/* Purchase Procedure Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-luxury-black">
              Kaufverfahren / Procédure d'achat
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* German Version */}
              <Card className="border-2 border-luxury-gold">
                <CardHeader className="text-center bg-luxury-gold">
                  <CardTitle className="text-luxury-black text-xl">🇩🇪 Deutsch</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start space-x-3">
                    <CreditCard className="h-6 w-6 text-luxury-gold mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-luxury-black mb-2">Zahlungsmodalitäten</h3>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• <strong>Anzahlung:</strong> 20% bei Bestellung</li>
                        <li>• <strong>Restbetrag:</strong> bei Lieferung oder in zinslosen Raten (6 bis 84 Monate)</li>
                        <li>• <strong>Sonderangebot:</strong> -10% Rabatt bei Barzahlung bei Bestellung</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Truck className="h-6 w-6 text-luxury-gold mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-luxury-black mb-2">Service & Lieferung</h3>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Wir kümmern uns um alle Importformalitäten bis zur Lieferung zu Ihnen nach Hause</li>
                        <li>• <strong>Lieferzeit:</strong> 5 Tage</li>
                        <li>• <strong>Widerrufsrecht:</strong> 14 Tage (Zufrieden oder Geld zurück)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-luxury-gold mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-luxury-black mb-2">Garantie</h3>
                      <p className="text-sm text-gray-700">24 Monate Garantie</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* French Version */}
              <Card className="border-2 border-luxury-gold">
                <CardHeader className="text-center bg-luxury-gold">
                  <CardTitle className="text-luxury-black text-xl">🇫🇷 Français</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start space-x-3">
                    <CreditCard className="h-6 w-6 text-luxury-gold mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-luxury-black mb-2">Modalités de paiement</h3>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• <strong>Acompte :</strong> 20% à la commande</li>
                        <li>• <strong>Solde :</strong> à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)</li>
                        <li>• <strong>Offre spéciale :</strong> -10% de réduction pour tout achat comptant à la commande</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Truck className="h-6 w-6 text-luxury-gold mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-luxury-black mb-2">Service & Livraison</h3>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Nous nous occupons de toutes les démarches d'importation jusqu'à la livraison à votre domicile</li>
                        <li>• <strong>Délais de livraison :</strong> 5 jours</li>
                        <li>• <strong>Délai de rétractation :</strong> 14 jours (Satisfait ou remboursé)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-luxury-gold mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-luxury-black mb-2">Garantie</h3>
                      <p className="text-sm text-gray-700">Garantie 24 mois</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium text-luxury-black hover:text-luxury-gold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-luxury-gray">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-luxury-black mb-4">
                  Ihre Frage nicht dabei?
                </h2>
                <p className="text-luxury-gray mb-6">
                  Kontaktieren Sie uns direkt - wir helfen Ihnen gerne weiter!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-luxury-gold hover:bg-luxury-dark-gold text-black">
                    <Phone className="h-4 w-4 mr-2" />
                    +33774 072351
                  </Button>
                  <Button variant="outline" className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black">
                    <Mail className="h-4 w-4 mr-2" />
                    E-Mail senden
                  </Button>
                  <Button variant="outline" className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
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

export default FAQ;
