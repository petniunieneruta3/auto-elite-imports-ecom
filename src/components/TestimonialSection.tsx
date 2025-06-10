
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Marcus Weber',
      location: 'Berlin, Deutschland',
      rating: 5,
      comment: 'Ausgezeichneter Service! Mein BMW M3 wurde genau wie beschrieben geliefert. Die Qualität und der Kundenservice waren perfekt.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      vehicle: 'BMW M3 Competition',
      verified: true
    },
    {
      id: 2,
      name: 'Sophie Müller',
      location: 'München, Deutschland',
      rating: 5,
      comment: 'Fantastische Erfahrung! Das Team war sehr professionell und die Lieferung erfolgte pünktlich. Würde definitiv wieder kaufen.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332-fe02?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      vehicle: 'Mercedes AMG C63',
      verified: true
    },
    {
      id: 3,
      name: 'Thomas Schmidt',
      location: 'Hamburg, Deutschland',
      rating: 5,
      comment: 'Die 24-Monats-Garantie gab mir die Sicherheit, die ich brauchte. Das Fahrzeug ist in makellosem Zustand angekommen.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      vehicle: 'Porsche 911 Carrera',
      verified: true
    },
    {
      id: 4,
      name: 'Andrea Fischer',
      location: 'Frankfurt, Deutschland',
      rating: 5,
      comment: 'Von der ersten Anfrage bis zur Lieferung war alles perfekt organisiert. GPS-Tracking war sehr beruhigend.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      vehicle: 'Audi RS6 Avant',
      verified: true
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-luxury-black mb-4">
            Was unsere Kunden sagen
          </h2>
          <p className="text-lg text-luxury-gray max-w-2xl mx-auto">
            Über 1.000 zufriedene Kunden vertrauen auf unseren Premium-Service 
            und unsere Fahrzeugqualität.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Quote className="h-8 w-8 text-luxury-gold/30" />
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
                  ))}
                </div>
                
                <p className="text-luxury-gray mb-6 text-sm leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
                
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-luxury-black text-sm">
                        {testimonial.name}
                      </h4>
                      {testimonial.verified && (
                        <div className="h-2 w-2 bg-luxury-gold rounded-full" title="Verifizierter Käufer"></div>
                      )}
                    </div>
                    <p className="text-xs text-luxury-gray">{testimonial.location}</p>
                    <p className="text-xs text-luxury-gold font-medium">{testimonial.vehicle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-8 bg-luxury-light-gray/30 rounded-full px-8 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-luxury-black">1000+</div>
              <div className="text-sm text-luxury-gray">Zufriedene Kunden</div>
            </div>
            <div className="h-8 w-px bg-luxury-gray/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-luxury-black">4.9/5</div>
              <div className="text-sm text-luxury-gray">Durchschnittsbewertung</div>
            </div>
            <div className="h-8 w-px bg-luxury-gray/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-luxury-black">24 Mon.</div>
              <div className="text-sm text-luxury-gray">Garantie inklusive</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
