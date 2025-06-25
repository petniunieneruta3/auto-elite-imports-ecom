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
import { supabase } from '@/integrations/supabase/client';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { items } = useCart();

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProofUploaded = (file: File) => {
    setPaymentProof(file);
  };

  const handleRemoveFile = () => {
    setPaymentProof(null);
  };

  const uploadPaymentProof = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('payment-proofs')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error in uploadPaymentProof:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
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

    setIsSubmitting(true);

    try {
      // Upload payment proof to Supabase Storage
      const paymentProofUrl = await uploadPaymentProof(paymentProof);
      
      if (!paymentProofUrl) {
        toast({
          title: "Fehler",
          description: "Fehler beim Upload der Zahlungsnachweis. Bitte versuchen Sie es erneut.",
          variant: "destructive",
        });
        return;
      }

      const paymentAmount = paymentType === 'deposit' ? depositAmount : totalAmount;
      
      // Prepare order summary
      const orderSummary = items.map(item => 
        `${item.brand} ${item.model} (${item.year}) - Menge: ${item.quantity} - Preis: €${item.price.toLocaleString()}`
      ).join('\n');

      // Save order to database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_info: customerInfo,
          payment_type: paymentType,
          payment_amount: paymentAmount,
          total_amount: totalAmount,
          order_summary: orderSummary,
          special_requests: specialRequests || null,
          payment_proof_url: paymentProofUrl,
          payment_proof_filename: paymentProof.name
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error saving order:', orderError);
        toast({
          title: "Fehler",
          description: "Fehler beim Speichern der Bestellung. Bitte versuchen Sie es erneut.",
          variant: "destructive",
        });
        return;
      }

      // Send emails using Supabase Edge Function with Resend
      const { data, error } = await supabase.functions.invoke('send-order-emails', {
        body: {
          customerInfo,
          paymentType,
          paymentAmount,
          totalAmount,
          depositAmount,
          orderSummary,
          specialRequests,
          paymentProofUrl,
          paymentProofFilename: paymentProof.name,
          orderId: orderData.id
        }
      });

      if (error) {
        console.error('Error sending emails:', error);
        toast({
          title: "Fehler",
          description: "E-Mail-Versand fehlgeschlagen. Die Bestellung wurde jedoch gespeichert.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Bestellung erfolgreich übermittelt",
        description: "E-Mails wurden versendet und die Bestellung wurde gespeichert.",
      });

      // Call the onSubmit callback with all the data
      onSubmit({
        customerInfo,
        paymentType,
        paymentAmount,
        totalAmount,
        paymentProof,
        paymentProofUrl,
        specialRequests,
        items,
        orderSummary,
        orderId: orderData.id
      });

    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "Fehler",
        description: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
      <PaymentProofUpload 
        onProofUploaded={handleProofUploaded}
        uploadedFile={paymentProof}
        onRemoveFile={handleRemoveFile}
      />

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
        <Button variant="outline" onClick={onCancel} className="flex-1" disabled={isSubmitting}>
          Abbrechen
        </Button>
        <Button 
          onClick={handleSubmit}
          className="flex-1 bg-luxury-gold hover:bg-luxury-dark-gold text-black"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Wird verarbeitet...' : 'Bestellung abschicken'}
        </Button>
      </div>
    </div>
  );
};

export default PaymentForm;
