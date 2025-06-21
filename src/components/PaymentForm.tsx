
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import PaymentProofUpload from './PaymentProofUpload';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

interface PaymentFormProps {
  totalAmount: number;
  depositAmount: number;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const PaymentForm = ({ totalAmount, depositAmount, onSubmit, onCancel }: PaymentFormProps) => {
  const [paymentType, setPaymentType] = useState('deposit');
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [specialRequests, setSpecialRequests] = useState('');
  const { toast } = useToast();
  const { items } = useCart();

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive",
      });
      return;
    }

    if (!paymentProof) {
      toast({
        title: "Fehler", 
        description: "Bitte laden Sie einen Zahlungsnachweis hoch.",
        variant: "destructive",
      });
      return;
    }

    const paymentAmount = paymentType === 'deposit' ? depositAmount : totalAmount;
    
    // Prepare order summary
    const orderSummary = items.map(item => 
      `${item.brand} ${item.model} (${item.year}) - Menge: ${item.quantity} - Preis: €${item.price.toLocaleString()}`
    ).join('\n');

    // Send email notification to business
    try {
      const response = await fetch('https://formspree.io/f/xzzggyqk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _to: 'contact@autoimportexpor.com',
          _subject: `Neue Bestellung - ${customerInfo.firstName} ${customerInfo.lastName}`,
          customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone,
          customerAddress: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.postalCode}, ${customerInfo.country}`,
          paymentType: paymentType === 'deposit' ? 'Anzahlung (20%)' : 'Vollzahlung',
          paymentAmount: `€${paymentAmount.toLocaleString()}`,
          totalOrderValue: `€${totalAmount.toLocaleString()}`,
          orderSummary: orderSummary,
          specialRequests: specialRequests || 'Keine besonderen Anfragen',
          orderDate: new Date().toLocaleDateString('de-DE'),
          orderTime: new Date().toLocaleTimeString('de-DE')
        }),
      });

      if (response.ok) {
        console.log('Order notification sent successfully');
      } else {
        console.error('Failed to send order notification');
      }
    } catch (error) {
      console.error('Error sending order notification:', error);
    }

    // Call the onSubmit callback with all the data
    onSubmit({
      customerInfo,
      paymentType,
      paymentAmount,
      totalAmount,
      paymentProof,
      specialRequests,
      items,
      orderSummary
    });
  };

  const paymentAmount = paymentType === 'deposit' ? depositAmount : totalAmount;

  return (
    <div className="space-y-6">
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Kundendaten</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Vorname *</Label>
              <Input
                id="firstName"
                value={customerInfo.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Nachname *</Label>
              <Input
                id="lastName"
                value={customerInfo.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">E-Mail *</Label>
            <Input
              id="email"
              type="email"
              value={customerInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              type="tel"
              value={customerInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="address">Adresse</Label>
            <Input
              id="address"
              value={customerInfo.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">Stadt</Label>
              <Input
                id="city"
                value={customerInfo.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="postalCode">PLZ</Label>
              <Input
                id="postalCode"
                value={customerInfo.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="country">Land</Label>
              <Input
                id="country"
                value={customerInfo.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Option */}
      <Card>
        <CardHeader>
          <CardTitle>Zahlungsart</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentType} onValueChange={setPaymentType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="deposit" id="deposit" />
              <Label htmlFor="deposit">
                Anzahlung (20%) - €{depositAmount.toLocaleString()}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="full" id="full" />
              <Label htmlFor="full">
                Vollzahlung - €{totalAmount.toLocaleString()}
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Bank Transfer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Bankverbindung für Überweisung</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div><strong>Name:</strong> Giampaolo Cristofori</div>
            <div><strong>IBAN:</strong> IT50L3608105138218082418145</div>
            <div><strong>BIC/SWIFT:</strong> PPAYITR1XXX</div>
            <div><strong>Überweisungsart:</strong> Instantané</div>
            <div><strong>Betrag:</strong> €{paymentAmount.toLocaleString()}</div>
          </div>
          <p className="text-sm text-gray-600">
            Bitte verwenden Sie Ihren Namen als Verwendungszweck und laden Sie anschließend den Zahlungsnachweis hoch.
          </p>
        </CardContent>
      </Card>

      {/* Payment Proof Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Zahlungsnachweis hochladen</CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentProofUpload onFileSelect={setPaymentProof} />
        </CardContent>
      </Card>

      {/* Special Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Besondere Anfragen (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Haben Sie besondere Wünsche oder Anmerkungen zu Ihrer Bestellung?"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Bestellübersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Gesamtwert der Bestellung:</span>
              <span className="font-semibold">€{totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Zu zahlender Betrag ({paymentType === 'deposit' ? 'Anzahlung 20%' : 'Vollzahlung'}):</span>
              <span className="font-bold text-luxury-gold">€{paymentAmount.toLocaleString()}</span>
            </div>
            {paymentType === 'deposit' && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Restbetrag (bei Lieferung):</span>
                <span>€{(totalAmount - depositAmount).toLocaleString()}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Abbrechen
        </Button>
        <Button 
          onClick={handleSubmit}
          className="flex-1 bg-luxury-gold hover:bg-luxury-dark-gold text-black"
        >
          Bestellung abschicken
        </Button>
      </div>
    </div>
  );
};

export default PaymentForm;
