
import React from 'react';
import { Instagram, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Katalog', path: '/catalog' },
    { name: 'Dienstleistungen', path: '/services' },
    { name: 'Finanzierung', path: '/financing' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Kontakt', path: '/contact' },
    { name: 'Sendungsverfolgung', path: '/tracking' },
  ];

  const serviceLinks = [
    { name: 'Garantien', path: '/guarantees' },
    { name: 'Rückgabepolitik', path: '/returns' },
    { name: 'Allgemeine Geschäftsbedingungen', path: '/terms' },
    { name: 'Datenschutz', path: '/privacy' },
    { name: 'Cookies', path: '/cookies' },
  ];

  return (
    <footer className="bg-luxury-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              AUTO
              <span className="text-luxury-gold"> IMPORT </span>
              EXPORT
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Ihre Vertrauensadresse für Premium-Gebrauchtwagen. Qualität, Service und Exzellenz seit Jahren.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-luxury-gold" />
                <span>Germendorfer Dorfstraße 66, 16515 Oranienburg, Deutschland</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-luxury-gold" />
                <span>+33774 072351</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-luxury-gold" />
                <span>autoexport49@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-luxury-gold">Schnelle Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.path}
                    className="text-gray-300 hover:text-luxury-gold transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-luxury-gold">Rechtliches</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.path}
                    className="text-gray-300 hover:text-luxury-gold transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-luxury-gold">Folgen Sie uns</h3>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/importautoexport"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-luxury-dark-gray hover:bg-luxury-gold p-2 rounded-lg transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@auto.export.impor"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-luxury-dark-gray hover:bg-luxury-gold p-2 rounded-lg transition-colors duration-300"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/+33774072351"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-luxury-dark-gray hover:bg-luxury-gold p-2 rounded-lg transition-colors duration-300"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-luxury-gold">Öffnungszeiten</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <div>Mo - Fr: 09:00 - 18:00</div>
                <div>Sa: 09:00 - 16:00</div>
                <div>So: Nach Vereinbarung</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-luxury-dark-gray mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-300">
            © 2024 AUTO IMPORT EXPORT. Alle Rechte vorbehalten.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-gray-300">
            <span>USt-IdNr: DE123456789</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
