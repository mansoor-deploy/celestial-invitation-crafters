
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EternalNoor from "./pages/EternalNoor";
import CelestialImaan from "./pages/CelestialImaan";
import SacredBond from "./pages/SacredBond";
import RadiantUmmah from "./pages/RadiantUmmah";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/eternal-noor" element={<EternalNoor />} />
          <Route path="/celestial-imaan" element={<CelestialImaan />} />
          <Route path="/sacred-bond" element={<SacredBond />} />
          <Route path="/radiant-ummah" element={<RadiantUmmah />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
