
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Truck, Shield } from 'lucide-react';

const PurchaseProcedure = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-luxury-black">
          Kaufverfahren / Procédure d'achat
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
  );
};

export default PurchaseProcedure;
