import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PlatformsSection from "@/components/PlatformsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CategoriesSection from "@/components/CategoriesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <PlatformsSection />
      <CategoriesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
