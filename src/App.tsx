import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CallForPapersSection } from './components/CallForPapersSection';
import { TopicsSection } from './components/TopicsSection';
import { SubmissionProcessSection } from './components/SubmissionProcessSection';
import { SubmissionSection } from './components/SubmissionSection';
import { DatesSection } from './components/DatesSection';
import { VenueSection } from './components/VenueSection';
import { CommitteeSection } from './components/CommitteeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';


export default function App() {
  const handleSubmitClick = () => {
    window.open("https://forms.gle/XCSvY3JhyRcmDM1HA", "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSubmitClick={handleSubmitClick} />
      <HeroSection onSubmitClick={handleSubmitClick} />
      <CallForPapersSection />
      <TopicsSection />
      <SubmissionProcessSection onSubmitClick={handleSubmitClick} />
      <SubmissionSection onSubmitClick={handleSubmitClick} />
      <DatesSection />
      <VenueSection />
      <CommitteeSection />
      <ContactSection />
      <Footer />
    </div>
  );
}