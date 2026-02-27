import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import HomeDashboard from "./pages/HomeDashboard";
import SymptomIntake from "./pages/SymptomIntake";
import DoctorListing from "./pages/DoctorListing";
import ConsultationScreen from "./pages/ConsultationScreen";
import EHRTimeline from "./pages/EHRTimeline";
import MedicationTracker from "./pages/MedicationTracker";
import HospitalAvailability from "./pages/HospitalAvailability";
import PreventiveDashboard from "./pages/PreventiveDashboard";
import ProfileScreen from "./pages/ProfileScreen";
import ServicesScreen from "./pages/ServicesScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/symptoms" element={<SymptomIntake />} />
            <Route path="/doctors" element={<DoctorListing />} />
            <Route path="/consult" element={<ConsultationScreen />} />
            <Route path="/records" element={<EHRTimeline />} />
            <Route path="/medications" element={<MedicationTracker />} />
            <Route path="/hospitals" element={<HospitalAvailability />} />
            <Route path="/preventive" element={<PreventiveDashboard />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/services" element={<ServicesScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
