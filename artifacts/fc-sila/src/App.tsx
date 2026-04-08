import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LangProvider } from "@/context/LangContext";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProgramsSection from "@/components/ProgramsSection";
import ScheduleSection from "@/components/ScheduleSection";
import CoachesSection from "@/components/CoachesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LangProvider>
          <div className="min-h-screen" style={{ background: '#000' }}>
            <Header />
            <main>
              <HeroSection />
              <AboutSection />
              <ProgramsSection />
              <ScheduleSection />
              <CoachesSection />
              <ContactSection />
            </main>
            <Footer />
          </div>
        </LangProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
