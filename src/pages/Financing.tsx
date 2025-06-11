
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, CreditCard, TrendingUp, Shield, CheckCircle } from 'lucide-react';

const Financing = () => {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate] = useState(0);

  const calculateMonthlyPayment = () => {
    if (interestRate === 0) {
      return (loanAmount / loanTerm).toFixed(2);
    }
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    return monthlyPayment.toFixed(2);
  };

  const financingOptions = [
    {
      icon: <CreditCard className="h-8 w-8 text-luxury-gold" />,
      title: "Klassischer Autokredit",
      description: "0% Zinsen für alle Kunden",
      features: ["Laufzeit: 12-84 Monate", "Anzahlung ab 10%", "Schnelle Bearbeitung"]
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-luxury-gold" />,
      title: "Leasing",
      description: "Flexible Leasinglösungen für Privat und Gewerbe",
      features: ["Niedrige Monatsraten", "Wartung inkl.", "Rückgabe möglich"]
    },
    {
      icon: <Shield className="h-8 w-8 text-luxury-gold" />,
      title: "Ratenkauf",
      description: "Bequeme Ratenzahlung ohne Zinsen",
      features: ["0% Zinsen bis 84 Monate", "Flexible Raten", "Keine Anzahlung"]
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
              Finanzierung
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Flexible Finanzierungslösungen für Ihren Traumwagen
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Financing Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-luxury-black flex items-center">
                    <Calculator className="h-6 w-6 mr-2 text-luxury-gold" />
                    Finanzierungsrechner
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-luxury-black mb-2">
                      Kaufpreis (€)
                    </label>
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="text-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-luxury-black mb-2">
                      Laufzeit (Monate)
                    </label>
                    <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12 Monate</SelectItem>
                        <SelectItem value="24">24 Monate</SelectItem>
                        <SelectItem value="36">36 Monate</SelectItem>
                        <SelectItem value="48">48 Monate</SelectItem>
                        <SelectItem value="60">60 Monate</SelectItem>
                        <SelectItem value="72">72 Monate</SelectItem>
                        <SelectItem value="84">84 Monate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-luxury-black mb-2">
                      Zinssatz (% p.a.)
                    </label>
                    <Input
                      type="number"
                      value={interestRate}
                      disabled
                      className="bg-gray-100"
                    />
                    <p className="text-xs text-luxury-gray mt-1">
                      0% Zinsen für alle unsere Kunden
                    </p>
                  </div>
                  
                  <div className="bg-luxury-gold/10 p-6 rounded-lg text-center">
                    <h3 className="text-lg font-medium text-luxury-black mb-2">
                      Monatliche Rate
                    </h3>
                    <div className="text-3xl font-bold text-luxury-black">
                      €{calculateMonthlyPayment()}
                    </div>
                    <p className="text-sm text-luxury-gray mt-1">
                      bei {interestRate}% Zinsen über {loanTerm} Monate
                    </p>
                  </div>
                  
                  <Button 
                    size="lg"
                    className="w-full bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                  >
                    Finanzierungsanfrage stellen
                  </Button>
                </CardContent>
              </Card>

              {/* Financing Options */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-luxury-black">
                  Unsere Finanzierungsoptionen
                </h2>
                
                {financingOptions.map((option, index) => (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-luxury-black mb-2">
                            {option.title}
                          </h3>
                          <p className="text-luxury-gray mb-4">
                            {option.description}
                          </p>
                          <ul className="space-y-2">
                            {option.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center text-sm text-luxury-gray">
                                <CheckCircle className="h-4 w-4 text-luxury-gold mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-luxury-black text-center mb-12">
              Warum unsere Finanzierung?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Schnelle Bearbeitung",
                  description: "Entscheidung innerhalb von 24 Stunden"
                },
                {
                  title: "Flexible Laufzeiten",
                  description: "Von 12 bis 84 Monaten wählbar"
                },
                {
                  title: "0% Zinsen",
                  description: "Keine Zinsen für alle Kunden"
                },
                {
                  title: "Persönliche Beratung",
                  description: "Individuelle Lösung für Ihre Bedürfnisse"
                }
              ].map((benefit, index) => (
                <Card key={index} className="text-center border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-luxury-black mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-luxury-gray text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-luxury-black text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Bereit für Ihren Traumwagen?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Lassen Sie sich unverbindlich beraten
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-luxury-gold hover:bg-luxury-dark-gold text-black"
              >
                Finanzierung anfragen
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Persönliche Beratung
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

export default Financing;
