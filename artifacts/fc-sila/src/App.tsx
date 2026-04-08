import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch } from "wouter";
import { LangProvider } from "@/context/LangContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Home page sections
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AcademySection from "@/components/AcademySection";

// Separate page sections
import CoachesSection from "@/components/CoachesSection";
import PlayersSection from "@/components/PlayersSection";
import MatchesSection from "@/components/MatchesSection";
import TrainingSection from "@/components/TrainingSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";

const queryClient = new QueryClient();

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <AcademySection />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LangProvider>
          <Router>
            <div className="min-h-screen" style={{ background: '#000' }}>
              <Header />
              <main style={{ paddingTop: '64px' }}>
                <Switch>
                  <Route path="/" component={HomePage} />
                  <Route path="/coaches" component={CoachesSection} />
                  <Route path="/players" component={PlayersSection} />
                  <Route path="/matches" component={MatchesSection} />
                  <Route path="/training" component={TrainingSection} />
                  <Route path="/gallery" component={GallerySection} />
                  <Route path="/contact" component={ContactSection} />
                  <Route component={HomePage} />
                </Switch>
              </main>
              <Footer />
            </div>
          </Router>
        </LangProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
