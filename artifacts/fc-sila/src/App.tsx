import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LangProvider } from "@/context/LangContext";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AcademySection from "@/components/AcademySection";
import CoachesSection from "@/components/CoachesSection";
import PlayersSection from "@/components/PlayersSection";
import MatchesSection from "@/components/MatchesSection";
import TrainingSection from "@/components/TrainingSection";
import GallerySection from "@/components/GallerySection";
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
              <AcademySection />
              <CoachesSection />
              <PlayersSection />
              <MatchesSection />
              <TrainingSection />
              <GallerySection />
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
