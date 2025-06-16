
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, User, Mail, Phone, MapPin, Calendar, Lock } from 'lucide-react';

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
    
    // Payment Information
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
            <span>Anzahlung (20%):</span>
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

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5" />
              <span>Zahlungsinformationen</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cardName">Name auf der Karte *</Label>
              <Input
                id="cardName"
                type="text"
                required
                value={formData.cardName}
                onChange={(e) => handleInputChange('cardName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cardNumber">Kartennummer *</Label>
              <Input
                id="cardNumber"
                type="text"
                required
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="expiryMonth" className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Monat *</span>
                </Label>
                <Input
                  id="expiryMonth"
                  type="text"
                  required
                  placeholder="MM"
                  maxLength={2}
                  value={formData.expiryMonth}
                  onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="expiryYear">Jahr *</Label>
                <Input
                  id="expiryYear"
                  type="text"
                  required
                  placeholder="JJ"
                  maxLength={2}
                  value={formData.expiryYear}
                  onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  type="text"
                  required
                  placeholder="123"
                  maxLength={4}
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                />
              </div>
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
            Anzahlung bezahlen (€{depositAmount.toLocaleString()})
          </Button>
        </div>
      </form>

      <div className="text-xs text-gray-500 text-center space-y-1">
        <p>🔒 Ihre Zahlungsdaten werden sicher verschlüsselt übertragen</p>
        <p>Sie erhalten eine Bestätigungs-E-Mail nach dem Abschluss Ihrer Bestellung</p>
      </div>
    </div>
  );
};

export default PaymentForm;
