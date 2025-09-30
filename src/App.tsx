import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import Home from "./pages/Home";
import AnimalRegistration from "./pages/AnimalRegistration";
import AnimalRecords from "./pages/AnimalRecords";
import TrainingSession from "./pages/TrainingSession";
import FoodChart from "./pages/FoodChart";
import FarmCleaning from "./pages/FarmCleaning";
import Vaccination from "./pages/Vaccination";
import HealthCheckup from "./pages/HealthCheckup";
import DiseaseOutbreak from "./pages/DiseaseOutbreak";
import RiskAssessment from "./pages/RiskAssessment";
import Visitor from "./pages/Visitor";
import HelpSupport from "./pages/HelpSupport";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/training" element={<TrainingSession />} />
          <Route path="/animal-registration" element={<AnimalRegistration />} />
          <Route path="/animal-records" element={<AnimalRecords />} />
          <Route path="/food-chart" element={<FoodChart />} />
          <Route path="/farm-cleaning" element={<FarmCleaning />} />
          <Route path="/vaccination" element={<Vaccination />} />
          <Route path="/health-checkup" element={<HealthCheckup />} />
          <Route path="/disease-outbreak" element={<DiseaseOutbreak />} />
          <Route path="/risk-assessment" element={<RiskAssessment />} />
          <Route path="/visitor" element={<Visitor />} />
          <Route path="/help-support" element={<HelpSupport />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
