
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "Wie funktioniert der Kaufprozess?",
      answer: "Der Kaufprozess ist einfach: Wählen Sie Ihr Fahrzeug aus, kontaktieren Sie uns für Details, vereinbaren Sie eine Besichtigung (optional), schließen Sie den Kaufvertrag ab und wir organisieren die Lieferung."
    },
    {
      question: "Welche Garantien bieten Sie?",
      answer: "Wir bieten eine 12-monatige Garantie auf alle unsere Fahrzeuge, die Motorschäden, Getriebeschäden und andere wichtige Komponenten abdeckt."
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
