
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const handleTracking = () => {
    // Simulation d'un résultat de tracking
    if (trackingNumber) {
      setTrackingResult({
        orderNumber: trackingNumber,
        status: 'En transit',
        vehicle: 'BMW M5 Competition',
        estimatedDelivery: '25.06.2024',
        currentLocation: 'Hamburg, Deutschland',
        timeline: [
          { date: '20.06.2024', status: 'Bestellung bestätigt', completed: true },
          { date: '21.06.2024', status: 'Fahrzeug vorbereitet', completed: true },
          { date: '22.06.2024', status: 'Transport gestartet', completed: true },
          { date: '25.06.2024', status: 'Lieferung', completed: false }
        ]
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-luxury-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sendungsverfolgung
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Verfolgen Sie den Status Ihrer Fahrzeuglieferung in Echtzeit
            </p>
          </div>
        </section>

        {/* Tracking Form */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-luxury-black text-center">
                  Geben Sie Ihre Auftragsnummer ein
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="z.B. AUE-2024-001234"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="text-lg py-3"
                    />
                  </div>
                  <Button 
                    onClick={handleTracking}
                    size="lg"
                    className="bg-luxury-gold hover:bg-luxury-dark-gold text-black px-8"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Verfolgen
                  </Button>
                </div>
                <p className="text-sm text-luxury-gray mt-2">
                  Die Auftragsnummer finden Sie in Ihrer Bestellbestätigung
                </p>
              </CardContent>
            </Card>

            {/* Tracking Results */}
            {trackingResult && (
              <div className="mt-8 space-y-6">
                {/* Status Overview */}
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="flex justify-center mb-2">
                          <Truck className="h-8 w-8 text-luxury-gold" />
                        </div>
                        <h3 className="font-medium text-luxury-black">Status</h3>
                        <Badge className="bg-luxury-gold text-black mt-1">
                          {trackingResult.status}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <div className="flex justify-center mb-2">
                          <Package className="h-8 w-8 text-luxury-gold" />
                        </div>
                        <h3 className="font-medium text-luxury-black">Fahrzeug</h3>
                        <p className="text-luxury-gray">{trackingResult.vehicle}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex justify-center mb-2">
                          <Clock className="h-8 w-8 text-luxury-gold" />
                        </div>
                        <h3 className="font-medium text-luxury-black">Voraussichtliche Lieferung</h3>
                        <p className="text-luxury-gray">{trackingResult.estimatedDelivery}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-luxury-black">
                      Sendungsverlauf
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trackingResult.timeline.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            item.completed ? 'bg-luxury-gold' : 'bg-gray-300'
                          }`}>
                            {item.completed ? (
                              <CheckCircle className="h-5 w-5 text-black" />
                            ) : (
                              <Clock className="h-5 w-5 text-gray-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className={`font-medium ${
                                item.completed ? 'text-luxury-black' : 'text-gray-500'
                              }`}>
                                {item.status}
                              </span>
                              <span className="text-sm text-luxury-gray">
                                {item.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Current Location */}
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-luxury-black mb-2">
                        Aktuelle Position
                      </h3>
                      <p className="text-luxury-gray">
                        {trackingResult.currentLocation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-luxury-black mb-4">
              Probleme beim Tracking?
            </h2>
            <p className="text-luxury-gray mb-6">
              Kontaktieren Sie unser Support-Team für Hilfe
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-luxury-gold hover:bg-luxury-dark-gold text-black">
                Support kontaktieren
              </Button>
              <Button variant="outline" className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black">
                FAQ ansehen
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

export default Tracking;
