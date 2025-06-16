import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail } from 'lucide-react';

const FAQ = () => {
  const faqData = [
    {
      question: 'Welche Automarken sind bei Ihnen erhältlich?',
      answer:
        'Wir bieten eine breite Palette von Automarken an, darunter Luxusmarken wie Mercedes-Benz, BMW, Audi, Land Rover und Porsche sowie beliebte Marken wie Volkswagen, Ford und Renault. Unser Lagerbestand ändert sich ständig, daher empfehlen wir Ihnen, unseren Online-Katalog zu besuchen oder sich an unser Team zu wenden, um die aktuell verfügbaren Marken und Modelle zu erfahren.',
    },
    {
      question: 'Wie kann ich einen Termin für eine Beratung vereinbaren?',
      answer:
        'Sie können ganz einfach einen Termin für eine Beratung vereinbaren, indem Sie uns telefonisch unter +33774 072351 erreichen, eine E-Mail an autoexport49@gmail.com senden oder unser Kontaktformular auf der Kontaktseite unserer Website ausfüllen. Wir werden uns dann umgehend mit Ihnen in Verbindung setzen, um einen passenden Zeitpunkt für Ihre Beratung zu vereinbaren.',
    },
    {
      question: 'Bieten Sie auch Finanzierungsoptionen für den Autokauf an?',
      answer:
        'Ja, wir bieten flexible Finanzierungsoptionen an, um Ihnen den Kauf Ihres Traumautos zu erleichtern. Unsere Finanzierungsexperten arbeiten mit verschiedenen Banken und Kreditinstituten zusammen, um Ihnen maßgeschneiderte Finanzierungslösungen anzubieten, die Ihren individuellen Bedürfnissen und Ihrem Budget entsprechen. Besuchen Sie unsere Finanzierungsseite oder kontaktieren Sie uns, um mehr über unsere Finanzierungsoptionen zu erfahren.',
    },
    {
      question: 'Wie lange dauert der Versand meines gekauften Fahrzeugs?',
      answer:
        'Die Versanddauer Ihres gekauften Fahrzeugs hängt von verschiedenen Faktoren ab, wie z.B. Ihrem Standort, dem gewählten Versandweg und den aktuellen Zollbestimmungen. In der Regel dauert der Versand innerhalb Deutschlands 1-3 Werktage, während internationale Sendungen je nach Zielland und Versandart zwischen 5-14 Werktagen dauern können. Wir werden Sie jedoch stets über den aktuellen Status Ihrer Sendung informieren und Ihnen eine voraussichtliche Lieferzeit mitteilen.',
    },
    {
      question: 'Welche Garantien bieten Sie auf Ihre Fahrzeuge an?',
      answer:
        'Wir bieten umfassende Garantien auf unsere Fahrzeuge an, um Ihnen ein sorgenfreies Fahrerlebnis zu ermöglichen. Unsere Garantien decken in der Regel Motor, Getriebe, Antriebsstrang und andere wichtige Fahrzeugkomponenten ab. Die genauen Garantiebedingungen variieren je nach Fahrzeugmodell und Alter. Weitere Informationen zu unseren Garantiebedingungen finden Sie auf unserer Garantieseite oder kontaktieren Sie uns.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Häufig gestellte Fragen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {faqData.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Haben Sie weitere Fragen?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Kontaktieren Sie uns für persönliche Unterstützung.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                +33774 072351
              </Button>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                autoexport49@gmail.com
              </Button>
              <Button>
                <MessageCircle className="h-4 w-4 mr-2" />
                Kontaktformular
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <LanguageSelector />
    </div>
  );
};

export default FAQ;
