import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductEdgeEngine from "./pages/ProductEdgeEngine";
import ProductStandaloneCamera from "./pages/ProductStandaloneCamera";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" toastOptions={{
        style: {
          background: 'white',
          color: 'black',
          border: '1px solid #E5E7EB',
          marginTop: '-20px',
          marginRight: '20px'
        },
        classNames: {
          success: 'text-black',
          error: 'text-black',
          icon: 'text-[#0DC7FF]',
        }
      }} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products/edge-engine" element={<ProductEdgeEngine />} />
          <Route path="/products/standalone-camera" element={<ProductStandaloneCamera />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
