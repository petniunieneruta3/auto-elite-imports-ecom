
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, User, Mail, Phone, MapPin, Building2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentFormProps {
  totalAmount: number;
  depositAmount: number;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  totalAmount,
  depositAmount,
  onSubmit,
  onCancel
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Address
    street: '',
    city: '',
    zipCode: '',
    country: 'Deutschland',
  });

  // Bank details for wire transfer
  const bankDetails = {
    bankName: "Deutsche Bank AG",
    iban: "DE89 3704 0044 0532 0130 00",
    bic: "COBADEFFXXX",
    accountHolder: "Luxury Cars GmbH",
    reference: `ORDER-${Date.now()}`
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add bank transfer reference to form data
    const orderData = {
      ...formData,
      paymentMethod: 'bank_transfer',
      transferReference: bankDetails.reference,
      amount: depositAmount
    };
    
    onSubmit(orderData);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Kopiert!",
      description: `${label} wurde in die Zwischenablage kopiert.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Bestellzusammenfassung</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Gesamtbetrag:</span>
            <span className="font-semibold">€{totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-luxury-gold">
            <span>Anzahlung per Überweisung (20%):</span>
            <span className="font-bold">€{depositAmount.toLocaleString()}</span>
          </div>
          <Separator />
          <div className="text-sm text-gray-600">
            <p>• Restbetrag: €{(totalAmount - depositAmount).toLocaleString()} bei Lieferung</p>
            <p>• Oder zinslose Ratenzahlung möglich (6-84 Monate)</p>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Persönliche Informationen</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Vorname *</Label>
                <Input
                  id="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nachname *</Label>
                <Input
                  id="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>E-Mail *</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone" className="flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>Telefon *</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Lieferadresse</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="street">Straße und Hausnummer *</Label>
              <Input
                id="street"
                type="text"
                required
                value={formData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zipCode">Postleitzahl *</Label>
                <Input
                  id="zipCode"
                  type="text"
                  required
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="city">Stadt *</Label>
                <Input
                  id="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="country">Land</Label>
              <Input
                id="country"
                type="text"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Bank Transfer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Bankverbindung für Überweisung</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Bank:</span>
                <div className="flex items-center space-x-2">
                  <span>{bankDetails.bankName}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(bankDetails.bankName, 'Bankname')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">IBAN:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono">{bankDetails.iban}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(bankDetails.iban, 'IBAN')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">BIC:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono">{bankDetails.bic}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(bankDetails.bic, 'BIC')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Empfänger:</span>
                <div className="flex items-center space-x-2">
                  <span>{bankDetails.accountHolder}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(bankDetails.accountHolder, 'Empfänger')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Verwendungszweck:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-luxury-gold">{bankDetails.reference}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(bankDetails.reference, 'Verwendungszweck')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center font-bold text-luxury-gold">
                <span>Betrag:</span>
                <span>€{depositAmount.toLocaleString()}</span>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Bitte überweisen Sie den Anzahlungsbetrag innerhalb von 7 Tagen.</p>
              <p>• Verwenden Sie unbedingt den angegebenen Verwendungszweck für eine schnelle Zuordnung.</p>
              <p>• Nach Zahlungseingang erhalten Sie eine Bestätigung und weitere Informationen zur Lieferung.</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Abbrechen
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-luxury-gold hover:bg-luxury-dark-gold text-black"
          >
            Bestellung bestätigen (€{depositAmount.toLocaleString()} überweisen)
          </Button>
        </div>
      </form>

      <div className="text-xs text-gray-500 text-center space-y-1">
        <p>🏦 Überweisen Sie die Anzahlung sicher über Ihr Online-Banking</p>
        <p>Sie erhalten eine Bestätigungs-E-Mail nach dem Abschluss Ihrer Bestellung</p>
      </div>
    </div>
  );
};

export default PaymentForm;
