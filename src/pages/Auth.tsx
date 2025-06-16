
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        toast({
          title: "Erreur d'authentification",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: isSignUp ? "Compte créé avec succès" : "Connexion réussie",
          description: isSignUp 
            ? "Vérifiez votre email pour confirmer votre compte"
            : "Vous êtes maintenant connecté",
        });
        
        if (!isSignUp) {
          navigate('/');
        }
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-md mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-luxury-black">
                {isSignUp ? 'Créer un compte' : 'Se connecter'}
              </CardTitle>
              <CardDescription>
                {isSignUp 
                  ? 'Créez votre compte pour accéder à nos services'
                  : 'Connectez-vous à votre compte'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-luxury-gold hover:bg-luxury-dark-gold text-black"
                  disabled={loading}
                >
                  {loading 
                    ? 'Chargement...' 
                    : isSignUp ? 'Créer le compte' : 'Se connecter'
                  }
                </Button>
              </form>
              
              <div className="mt-4 text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-luxury-black"
                >
                  {isSignUp 
                    ? 'Déjà un compte ? Se connecter'
                    : 'Pas de compte ? Créer un compte'
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
      <LanguageSelector />
    </div>
  );
};

export default Auth;
