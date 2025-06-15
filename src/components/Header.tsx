
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Phone, MapPin, User, LogOut, Settings, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import CartDrawer from './CartDrawer';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut, isAdmin } = useAuth();
  const { getTotalItems, setIsOpen } = useCart();

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Katalog', path: '/catalog' },
    { name: 'Dienstleistungen', path: '/services' },
    { name: 'Finanzierung', path: '/financing' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Kontakt', path: '/contact' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar */}
          <div className="hidden md:flex items-center justify-between py-2 text-sm text-gray-600 border-b border-gray-200">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-luxury-gold" />
                <span>+33774 072351</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-luxury-gold" />
                <span>Germendorfer Dorfstraße 66, Oranienburg</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-luxury-black">Bienvenue, {user.email}</span>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/admin')}
                      className="text-luxury-gold hover:text-luxury-dark-gold"
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Admin
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-gray-600 hover:text-luxury-gold"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Déconnexion
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/auth')}
                  className="text-luxury-gold hover:text-luxury-dark-gold"
                >
                  <User className="h-4 w-4 mr-1" />
                  Connexion
                </Button>
              )}
            </div>
          </div>

          {/* Main header */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300"
              >
                <img 
                  src="/lovable-uploads/1d94b90f-3c36-4dc1-b5ce-8ad945b51ab7.png" 
                  alt="Auto Import Export Logo" 
                  className="h-12 w-auto"
                />
                <div className="text-xl font-bold text-luxury-black">
                  AUTO
                  <span className="text-luxury-gold"> IMPORT </span>
                  EXPORT
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="text-luxury-black hover:text-luxury-gold transition-colors duration-300 font-medium"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* CTA Button and Cart */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(true)}
                className="relative text-luxury-black hover:text-luxury-gold"
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-luxury-gold text-black p-0"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
              <Button 
                onClick={() => navigate('/contact')}
                className="bg-luxury-gold hover:bg-luxury-dark-gold text-white font-semibold px-6 py-2 transition-all duration-300 border-2 border-luxury-gold hover:border-luxury-dark-gold"
              >
                Beratung anfordern
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(true)}
                className="relative text-luxury-black hover:text-luxury-gold"
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-luxury-gold text-black p-0"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-luxury-black"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-luxury-black hover:text-luxury-gold transition-colors duration-300 font-medium py-2"
                >
                  {item.name}
                </button>
              ))}
              
              {user ? (
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">Connecté en tant que {user.email}</div>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        navigate('/admin');
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left text-luxury-gold hover:text-luxury-dark-gold font-medium py-2"
                    >
                      Administration
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-600 hover:text-luxury-gold font-medium py-2"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    navigate('/auth');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-luxury-gold hover:text-luxury-dark-gold font-medium py-2"
                >
                  Connexion
                </button>
              )}
              
              <Button 
                onClick={() => {
                  navigate('/contact');
                  setIsMenuOpen(false);
                }}
                className="w-full bg-luxury-gold hover:bg-luxury-dark-gold text-white font-semibold mt-4 border-2 border-luxury-gold hover:border-luxury-dark-gold"
              >
                Beratung anfordern
              </Button>
            </div>
          </div>
        )}
      </header>
      
      <CartDrawer />
    </>
  );
};

export default Header;
