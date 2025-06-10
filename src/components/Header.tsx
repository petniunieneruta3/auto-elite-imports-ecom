
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Katalog', path: '/catalog' },
    { name: 'Dienstleistungen', path: '/services' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Kontakt', path: '/contact' },
    { name: 'Sendungsverfolgung', path: '/tracking' },
  ];

  useEffect(() => {
    // Add CSS styles for Google Translate
    const style = document.createElement('style');
    style.textContent = `
      /* Style Google Translate widget */
      .google-translate-container .goog-te-gadget {
        font-family: inherit !important;
        font-size: 0 !important;
      }
      
      .google-translate-container .goog-te-gadget-simple {
        background-color: transparent !important;
        border: none !important;
        font-size: 14px !important;
        display: inline-block !important;
        padding: 0 !important;
      }
      
      .google-translate-container .goog-te-gadget-simple .goog-te-menu-value {
        color: #6B7280 !important;
        font-family: inherit !important;
      }
      
      .google-translate-container .goog-te-gadget-simple .goog-te-menu-value:hover {
        color: #111827 !important;
      }
      
      .google-translate-container .goog-te-gadget-icon {
        display: none !important;
      }
      
      .google-translate-container .goog-te-gadget-simple .goog-te-menu-value span {
        color: inherit !important;
      }
      
      /* Hide Google Translate banner */
      .goog-te-banner-frame {
        display: none !important;
      }
      
      body {
        top: 0 !important;
      }
      
      .skiptranslate iframe {
        visibility: hidden !important;
      }
      
      body.translated-ltr {
        top: 0 !important;
      }
      
      .goog-te-balloon-frame {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    // Load Google Translate script
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'de',
          includedLanguages: 'de,en,fr,es,it,ru,pl,nl,pt,ar',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src*="translate.google.com"]');
      if (existingScript) {
        existingScript.remove();
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-luxury-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="text-2xl md:text-3xl font-bold text-luxury-black">
              AUTO
              <span className="text-luxury-gold"> IMPORT </span>
              EXPORT
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="text-luxury-gray hover:text-luxury-black transition-colors duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-luxury-light-gray transition-colors"
            >
              <Search className="h-5 w-5 text-luxury-gray" />
            </Button>

            {/* Google Translate */}
            <div id="google_translate_element" className="google-translate-container"></div>

            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon"
              className="relative hover:bg-luxury-light-gray transition-colors"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-5 w-5 text-luxury-gray" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-luxury-gold text-white text-xs">
                0
              </Badge>
            </Button>

            {/* User Account */}
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-luxury-light-gray transition-colors"
              onClick={() => navigate('/account')}
            >
              <User className="h-5 w-5 text-luxury-gray" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-luxury-light-gray bg-white">
            <nav className="py-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-luxury-gray hover:text-luxury-black hover:bg-luxury-light-gray transition-colors"
                >
                  {item.name}
                </button>
              ))}
              {/* Google Translate for mobile */}
              <div className="px-4 py-2">
                <div id="google_translate_element_mobile" className="google-translate-container"></div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
