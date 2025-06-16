
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, User, Mail, Phone, MapPin, Building2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PaymentProofUpload from './PaymentProofUpload';

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

  const [paymentProof, setPaymentProof] = useState<File | null>(null);

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

  const handleProofUploaded = (file: File) => {
    setPaymentProof(file);
  };

  const handleRemoveProof = () => {
    setPaymentProof(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation: Check if all required fields are filled
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'street', 'city', 'zipCode'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Fehlende Informationen",
        description: "Bitte füllen Sie alle erforderlichen Felder aus.",
        variant: "destructive"
      });
      return;
    }

    // Validation: Check if payment proof is uploaded
    if (!paymentProof) {
      toast({
        title: "Zahlungsnachweis erforderlich",
        description: "Bitte laden Sie einen Nachweis Ihrer Überweisung hoch, bevor Sie die Bestellung bestätigen.",
        variant: "destructive"
      });
      return;
    }
    
    // Add payment proof and bank transfer reference to form data
    const orderData = {
      ...formData,
      paymentMethod: 'bank_transfer',
      transferReference: bankDetails.reference,
      amount: depositAmount,
      paymentProof: paymentProof
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

  const isFormValid = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'street', 'city', 'zipCode'];
    const allFieldsFilled = requiredFields.every(field => formData[field as keyof typeof formData]);
    return allFieldsFilled && paymentProof !== null;
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
              <p>• Bitte überweisen Sie den Anzahlungsbetrag und laden Sie anschließend den Nachweis hoch.</p>
              <p>• Verwenden Sie unbedingt den angegebenen Verwendungszweck für eine schnelle Zuordnung.</p>
              <p>• Nach Überprüfung des Zahlungsnachweises erhalten Sie eine Bestätigung.</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Proof Upload */}
        <PaymentProofUpload
          onProofUploaded={handleProofUploaded}
          uploadedFile={paymentProof}
          onRemoveFile={handleRemoveProof}
        />

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
            disabled={!isFormValid()}
            className={`flex-1 ${
              isFormValid() 
                ? 'bg-luxury-gold hover:bg-luxury-dark-gold text-black' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Bestellung mit Nachweis bestätigen
          </Button>
        </div>
      </form>

      <div className="text-xs text-gray-500 text-center space-y-1">
        <p>🏦 Überweisen Sie die Anzahlung und laden Sie den Nachweis hoch</p>
        <p>Ihre Bestellung wird erst nach Überprüfung des Zahlungsnachweises bestätigt</p>
      </div>
    </div>
  );
};

export default PaymentForm;
