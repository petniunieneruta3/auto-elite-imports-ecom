import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Calculator, CreditCard, FileText, CheckCircle, Euro, Percent } from 'lucide-react';

const Financing = () => {
  const [vehiclePrice, setVehiclePrice] = useState(30000);
  const [downPayment, setDownPayment] = useState(5000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(60);

  const calculateMonthlyPayment = () => {
    const principal = vehiclePrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;

    const monthlyPayment =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    return monthlyPayment ? monthlyPayment.toFixed(2) : '0.00';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-luxury-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Finanzierungsrechner
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Berechnen Sie Ihre monatlichen Zahlungen und finden Sie die besten Finanzierungsoptionen für Ihr Traumauto.
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-100 py-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-luxury-gold" />
                  Finanzierungsdetails
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Vehicle Price */}
                  <div>
                    <Label htmlFor="vehiclePrice" className="block text-sm font-medium text-gray-700">
                      Fahrzeugpreis (€)
                    </Label>
                    <Input
                      type="number"
                      id="vehiclePrice"
                      value={vehiclePrice}
                      onChange={(e) => setVehiclePrice(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>

                  {/* Down Payment */}
                  <div>
                    <Label htmlFor="downPayment" className="block text-sm font-medium text-gray-700">
                      Anzahlung (€)
                    </Label>
                    <Input
                      type="number"
                      id="downPayment"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <Label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">
                      Zinssatz (%)
                    </Label>
                    <Input
                      type="number"
                      id="interestRate"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>

                  {/* Loan Term */}
                  <div>
                    <Label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700">
                      Laufzeit (Monate)
                    </Label>
                    <Input
                      type="number"
                      id="loanTerm"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Monthly Payment Result */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-luxury-black">
                    <CreditCard className="h-5 w-5 text-luxury-gold" />
                    Monatliche Zahlung:
                  </h3>
                  <div className="mt-2 text-2xl font-bold text-luxury-gold">
                    €{calculateMonthlyPayment()}
                  </div>
                  <p className="text-sm text-gray-600">
                    Basierend auf Ihren Angaben.
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="mt-6 p-4 bg-gray-100 rounded-md text-sm text-gray-500">
                  <FileText className="h-4 w-4 inline-block mr-1" />
                  Hinweis: Dieses ist nur eine Schätzung. Für genaue Finanzierungsangebote kontaktieren Sie uns bitte.
                </div>

                {/* CTA Button */}
                <div className="mt-8">
                  <Button className="bg-luxury-gold hover:bg-luxury-dark-gold text-black">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Fordern Sie jetzt ein Angebot an
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-12 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-luxury-black mb-8">
              Ihre Vorteile bei uns
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Advantage 1 */}
              <Card className="shadow-md border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Euro className="h-5 w-5 text-luxury-gold" />
                    Wettbewerbsfähige Zinssätze
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  Profitieren Sie von unseren exklusiven Partnerschaften mit führenden Banken, um die besten Zinssätze zu erhalten.
                </CardContent>
              </Card>

              {/* Advantage 2 */}
              <Card className="shadow-md border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Percent className="h-5 w-5 text-luxury-gold" />
                    Flexible Zahlungspläne
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  Wir bieten massgeschneiderte Zahlungspläne, die auf Ihre individuellen Bedürfnisse und Ihr Budget zugeschnitten sind.
                </CardContent>
              </Card>

              {/* Advantage 3 */}
              <Card className="shadow-md border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-luxury-gold" />
                    Einfacher Antragsprozess
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  Unser unkomplizierter Antragsprozess macht es Ihnen leicht, schnell und bequem eine Finanzierung zu erhalten.
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

export default Financing;

const Label = ({ htmlFor, className, children }: { htmlFor: string; className?: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
);
