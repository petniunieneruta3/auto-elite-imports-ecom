
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, MessageSquare, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const { toast } = useToast();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: 'Nachricht gesendet!',
      description: 'Ihre Nachricht wurde erfolgreich gesendet.',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-luxury-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Kontakt
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Wir sind für Sie da - kontaktieren Sie uns jederzeit
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-luxury-black mb-6">
                    Kontaktinformationen
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-luxury-gold mt-1" />
                      <div>
                        <h3 className="font-medium text-luxury-black">Adresse</h3>
                        <p className="text-luxury-gray">
                          Germendorfer Dorfstraße 66<br />
                          16515 Oranienburg<br />
                          Deutschland
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-luxury-gold mt-1" />
                      <div>
                        <h3 className="font-medium text-luxury-black">Telefon</h3>
                        <p className="text-luxury-gray">+33774 072351</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-luxury-gold mt-1" />
                      <div>
                        <h3 className="font-medium text-luxury-black">E-Mail</h3>
                        <p className="text-luxury-gray">autoexport49@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-luxury-gold mt-1" />
                      <div>
                        <h3 className="font-medium text-luxury-black">Öffnungszeiten</h3>
                        <div className="text-luxury-gray space-y-1">
                          <p>Montag - Freitag: 09:00 - 18:00</p>
                          <p>Samstag: 09:00 - 16:00</p>
                          <p>Sonntag: Nach Vereinbarung</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-xl font-bold text-luxury-black mb-4">
                    Folgen Sie uns
                  </h3>
                  <div className="flex space-x-4">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black"
                      onClick={() => window.open('https://instagram.com/importautoexport', '_blank')}
                    >
                      <Instagram className="h-5 w-5 mr-2" />
                      Instagram
                    </Button>
                    <Button 
                      variant="outline"
                      size="lg"
                      className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black"
                      onClick={() => window.open('https://wa.me/+33774072351', '_blank')}
                    >
                      <MessageSquare className="h-5 w-5 mr-2" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-luxury-black">
                    Nachricht senden
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-luxury-black mb-2">
                          Vorname *
                        </label>
                        <Input id="firstName" placeholder="Ihr Vorname" value={formData.firstName} onChange={handleInputChange} />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-luxury-black mb-2">
                          Nachname *
                        </label>
                        <Input id="lastName" placeholder="Ihr Nachname" value={formData.lastName} onChange={handleInputChange} />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-luxury-black mb-2">
                        E-Mail *
                      </label>
                      <Input id="email" type="email" placeholder="ihre.email@beispiel.de" value={formData.email} onChange={handleInputChange} />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-luxury-black mb-2">
                        Telefon
                      </label>
                      <Input id="phone" type="tel" placeholder="Ihre Telefonnummer" value={formData.phone} onChange={handleInputChange} />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-luxury-black mb-2">
                        Betreff
                      </label>
                      <Input id="subject" placeholder="Worum geht es?" value={formData.subject} onChange={handleInputChange} />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-luxury-black mb-2">
                        Nachricht *
                      </label>
                      <Textarea 
                        id="message" 
                        placeholder="Ihre Nachricht..."
                        value={formData.message} 
                        onChange={handleInputChange}
                        rows={6}
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                    >
                      Nachricht senden
                    </Button>
                  </form>
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

export default Contact;
