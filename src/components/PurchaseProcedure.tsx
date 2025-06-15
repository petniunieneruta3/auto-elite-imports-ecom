
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Truck, Shield } from 'lucide-react';

const PurchaseProcedure = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-luxury-black">
            Kaufverfahren für Fahrzeuge
          </h2>
        </div>
        
        <Card className="border-2 border-luxury-gold max-w-4xl mx-auto">
          <CardHeader className="text-center bg-luxury-gold">
            <CardTitle className="text-luxury-black text-xl">
              🇩🇪 Deutschland
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-start space-x-3">
              <CreditCard className="h-6 w-6 text-luxury-gold mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-luxury-black mb-2">Zahlungsmodalitäten</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Anzahlung: 20% bei Bestellung</li>
                  <li>• Restbetrag: bei Lieferung oder in zinslosen Raten (6 bis 84 Monate)</li>
                  <li>• Sonderangebot: -10% Rabatt bei Barzahlung bei Bestellung</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Truck className="h-6 w-6 text-luxury-gold mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-luxury-black mb-2">Service & Lieferung</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Wir kümmern uns um alle Importformalitäten bis zur Lieferung zu Ihnen nach Hause</li>
                  <li>• Lieferzeit: 5 Tage</li>
                  <li>• Widerrufsrecht: 14 Tage (Zufrieden oder Geld zurück)</li>
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
      </div>
    </section>
  );
};

export default PurchaseProcedure;
