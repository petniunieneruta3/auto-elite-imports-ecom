
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, X, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PaymentForm from './PaymentForm';

const CartDrawer = () => {
  const { 
    items, 
    isOpen, 
    setIsOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalPrice 
  } = useCart();
  const { toast } = useToast();
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const totalAmount = getTotalPrice();
  const depositAmount = Math.round(totalAmount * 0.2);

  const handleOrderClick = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = (paymentData: any) => {
    console.log('Payment data:', paymentData);
    console.log('Payment proof file:', paymentData.paymentProof);
    
    // Clear the cart immediately after successful submission
    clearCart();
    
    toast({
      title: "Bestellung eingereicht",
      description: `Ihre Bestellung über ${items.length} Artikel wurde eingereicht. Wir überprüfen Ihren Zahlungsnachweis und bestätigen Ihre Bestellung innerhalb von 24 Stunden.`,
      duration: 8000,
    });
    
    // Close the payment form and drawer
    setShowPaymentForm(false);
    setIsOpen(false);
    
    // Show additional confirmation message
    setTimeout(() => {
      toast({
        title: "Bestätigung per E-Mail",
        description: "Sie erhalten eine E-Mail-Bestätigung sobald wir Ihren Zahlungsnachweis überprüft haben.",
        duration: 6000,
      });
    }, 2000);
  };

  const handlePaymentCancel = () => {
    setShowPaymentForm(false);
  };

  const handleBackToCart = () => {
    setShowPaymentForm(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            {showPaymentForm ? (
              <>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleBackToCart}
                  className="mr-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <DrawerTitle>Bestellungsabwicklung</DrawerTitle>
              </>
            ) : (
              <DrawerTitle>Warenkorb ({items.length})</DrawerTitle>
            )}
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {showPaymentForm ? (
            <PaymentForm
              totalAmount={totalAmount}
              depositAmount={depositAmount}
              onSubmit={handlePaymentSubmit}
              onCancel={handlePaymentCancel}
            />
          ) : (
            <>
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Ihr Warenkorb ist leer</p>
                  <DrawerClose asChild>
                    <Button variant="outline">Weiter einkaufen</Button>
                  </DrawerClose>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img 
                        src={item.image_url} 
                        alt={`${item.brand} ${item.model}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">
                          {item.brand} {item.model}
                        </h3>
                        <p className="text-xs text-gray-500">{item.year}</p>
                        <p className="font-bold text-luxury-gold">
                          €{item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Badge variant="outline" className="min-w-[2rem] text-center">
                          {item.quantity}
                        </Badge>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {!showPaymentForm && items.length > 0 && (
          <DrawerFooter className="border-t">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Gesamt:</span>
                  <span className="text-luxury-gold">€{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Erforderliche Anzahlung (20%):</span>
                  <span className="font-semibold">€{depositAmount.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={clearCart}
                >
                  Warenkorb leeren
                </Button>
                <Button 
                  className="flex-1 bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                  onClick={handleOrderClick}
                >
                  Zur Kasse gehen
                </Button>
              </div>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
