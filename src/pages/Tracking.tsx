import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Package, Truck, CheckCircle, MapPin, Calendar } from 'lucide-react';

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingStatus, setTrackingStatus] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const [location, setLocation] = useState('');
  const [trackingHistory, setTrackingHistory] = useState([
    { date: '2024-01-20', status: 'Bestellung aufgegeben' },
    { date: '2024-01-21', status: 'Im Lager bearbeitet' },
    { date: '2024-01-22', status: 'Versendet' },
  ]);

  const handleTrack = () => {
    // Mock tracking data
    setTrackingStatus('Unterwegs');
    setEstimatedDelivery('2024-01-25');
    setLocation('Berlin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-luxury-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sendungsverfolgung
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Verfolgen Sie den Fortschritt Ihrer Bestellung mit unserer einfachen Sendungsverfolgung.
            </p>
          </div>
        </section>

        {/* Tracking Form */}
        <section className="py-8 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle>Sendung verfolgen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Trackingnummer eingeben"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                  <Button onClick={handleTrack}>
                    <Search className="h-4 w-4 mr-2" />
                    Verfolgen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tracking Status */}
        {trackingStatus && (
          <section className="py-8 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card>
                <CardHeader>
                  <CardTitle>Sendungsstatus</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Package className="h-12 w-12 text-luxury-gold" />
                    <div>
                      <p className="text-lg font-semibold">
                        Status: <Badge className="ml-2">{trackingStatus}</Badge>
                      </p>
                      <p className="text-gray-500">
                        Geschätzte Lieferung:{' '}
                        <Calendar className="h-4 w-4 inline-block mr-1" />
                        {estimatedDelivery}
                      </p>
                      <p className="text-gray-500">
                        Standort: <MapPin className="h-4 w-4 inline-block mr-1" />
                        {location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Tracking History */}
        {trackingHistory.length > 0 && (
          <section className="py-8 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card>
                <CardHeader>
                  <CardTitle>Sendungsverlauf</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul>
                    {trackingHistory.map((item, index) => (
                      <li key={index} className="flex items-center space-x-4">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                        <div>
                          <p className="font-semibold">{item.status}</p>
                          <p className="text-gray-500">
                            <Calendar className="h-4 w-4 inline-block mr-1" />
                            {item.date}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <LanguageSelector />
    </div>
  );
};

export default Tracking;
