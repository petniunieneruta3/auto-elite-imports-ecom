
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Truck, Shield } from 'lucide-react';

const PurchaseProcedure = () => {
  const [language, setLanguage] = useState<'fr' | 'de'>('fr');

  const content = {
    fr: {
      title: "Procédure d'achat",
      flag: "🇫🇷",
      langName: "Français",
      sections: {
        payment: {
          title: "Modalités de paiement",
          items: [
            "• Acompte : 20% à la commande",
            "• Solde : à la livraison ou en mensualités sans intérêt (de 6 à 84 mois)",
            "• Offre spéciale : -10% de réduction pour tout achat comptant à la commande"
          ]
        },
        service: {
          title: "Service & Livraison",
          items: [
            "• Nous nous occupons de toutes les démarches d'importation jusqu'à la livraison à votre domicile",
            "• Délais de livraison : 5 jours",
            "• Délai de rétractation : 14 jours (Satisfait ou remboursé)"
          ]
        },
        warranty: {
          title: "Garantie",
          text: "Garantie 24 mois"
        }
      }
    },
    de: {
      title: "Kaufverfahren",
      flag: "🇩🇪",
      langName: "Deutsch",
      sections: {
        payment: {
          title: "Zahlungsmodalitäten",
          items: [
            "• Anzahlung: 20% bei Bestellung",
            "• Restbetrag: bei Lieferung oder in zinslosen Raten (6 bis 84 Monate)",
            "• Sonderangebot: -10% Rabatt bei Barzahlung bei Bestellung"
          ]
        },
        service: {
          title: "Service & Lieferung",
          items: [
            "• Wir kümmern uns um alle Importformalitäten bis zur Lieferung zu Ihnen nach Hause",
            "• Lieferzeit: 5 Tage",
            "• Widerrufsrecht: 14 Tage (Zufrieden oder Geld zurück)"
          ]
        },
        warranty: {
          title: "Garantie",
          text: "24 Monate Garantie"
        }
      }
    }
  };

  const currentContent = content[language];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-luxury-black">
            {currentContent.title}
          </h2>
          
          <div className="flex justify-center gap-2">
            <Button
              variant={language === 'fr' ? 'default' : 'outline'}
              onClick={() => setLanguage('fr')}
              className={language === 'fr' ? 'bg-luxury-gold hover:bg-luxury-dark-gold text-black' : 'border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black'}
            >
              🇫🇷 Français
            </Button>
            <Button
              variant={language === 'de' ? 'default' : 'outline'}
              onClick={() => setLanguage('de')}
              className={language === 'de' ? 'bg-luxury-gold hover:bg-luxury-dark-gold text-black' : 'border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black'}
            >
              🇩🇪 Deutsch
            </Button>
          </div>
        </div>
        
        <Card className="border-2 border-luxury-gold max-w-4xl mx-auto">
          <CardHeader className="text-center bg-luxury-gold">
            <CardTitle className="text-luxury-black text-xl">
              {currentContent.flag} {currentContent.langName}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-start space-x-3">
              <CreditCard className="h-6 w-6 text-luxury-gold mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-luxury-black mb-2">{currentContent.sections.payment.title}</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  {currentContent.sections.payment.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Truck className="h-6 w-6 text-luxury-gold mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-luxury-black mb-2">{currentContent.sections.service.title}</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  {currentContent.sections.service.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-luxury-gold mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-luxury-black mb-2">{currentContent.sections.warranty.title}</h3>
                <p className="text-sm text-gray-700">{currentContent.sections.warranty.text}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PurchaseProcedure;
