import { Camera, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleImageUpload = () => {
    navigate("/search");
  };

  const handlePromptSearch = () => {
    navigate("/search");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 animate-gradient" />
      
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-20 h-20 bg-primary/10 rounded-full blur-xl" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-16 h-16 bg-accent/10 rounded-full blur-xl" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float" style={{ animationDelay: '4s' }}>
          <div className="w-24 h-24 bg-primary-glow/10 rounded-full blur-xl" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Deal Discovery</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-fade-in">
            Find the Best Deals with the Power of AI
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed animate-fade-in">
            Upload a product image or describe what you need. Our AI instantly finds the best deals across Amazon, Flipkart, eBay, and more.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in">
            <Button 
              onClick={handleImageUpload}
              className="btn-hero-primary group"
            >
              <Camera className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Upload a Product Image
            </Button>
            
            <Button 
              onClick={handlePromptSearch}
              className="btn-hero-secondary group"
            >
              <MessageSquare className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Describe Your Needs
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl mx-auto animate-fade-in">
            {[
              { label: "Products Analyzed", value: "10M+" },
              { label: "Deals Found", value: "2.5M+" },
              { label: "Money Saved", value: "₹50Cr+" },
              { label: "Happy Users", value: "100K+" }
            ].map((stat, index) => (
              <Card key={index} className="card-soft p-4 text-center hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;