import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import ShiftSection from "@/components/landing/ShiftSection";
import CapabilitiesSection from "@/components/landing/CapabilitiesSection";
import VideoShowcaseSection from "@/components/landing/VideoShowcaseSection";
import DeploymentSection from "@/components/landing/DeploymentSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import WhyOfflineSection from "@/components/landing/WhyOfflineSection";
import EngineeringSection from "@/components/landing/EngineeringSection";
import ComingSoonSection from "@/components/landing/ComingSoonSection";
import CTASection from "@/components/landing/CTASection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <VideoShowcaseSection />
    <ProblemSection />
    <ShiftSection />
    <CapabilitiesSection />
    <DeploymentSection />
    <HowItWorksSection />
    <WhyOfflineSection />
    <EngineeringSection />
    <ComingSoonSection />
    <CTASection />
    <FAQSection />
    <Footer />
  </div>
);

export default Index;
