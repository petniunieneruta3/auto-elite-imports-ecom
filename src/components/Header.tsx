
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('DE');

  const languages = [
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'IT', name: 'Italiano', flag: '🇮🇹' },
  ];

  const menuItems = [
    { name: 'Katalog', path: '/catalog' },
    { name: 'Dienstleistungen', path: '/services' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Kontakt', path: '/contact' },
    { name: 'Sendungsverfolgung', path: '/tracking' },
  ];

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

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-luxury-light-gray">
                  <Globe className="h-4 w-4 mr-2" />
                  {currentLanguage}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang.code)}
                    className="cursor-pointer"
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
