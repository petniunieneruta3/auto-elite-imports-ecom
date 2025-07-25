
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import CatalogReal from "./pages/CatalogReal";
import VehicleDetail from "./pages/VehicleDetail";
import Services from "./pages/Services";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Tracking from "./pages/Tracking";
import Financing from "./pages/Financing";
import Guarantees from "./pages/Guarantees";
import Returns from "./pages/Returns";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import SimpleAdmin from "./pages/SimpleAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/catalog" element={<CatalogReal />} />
              <Route path="/catalogue" element={<CatalogReal />} />
              <Route path="/catalog-demo" element={<Catalog />} />
              <Route path="/vehicle/:id" element={<VehicleDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/financing" element={<Financing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/simple-admin" element={<SimpleAdmin />} />
              <Route path="/cart" element={<Index />} />
              <Route path="/account" element={<Index />} />
              {/* Legal pages */}
              <Route path="/guarantees" element={<Guarantees />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
