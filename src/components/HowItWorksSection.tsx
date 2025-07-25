import { Upload, Search, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Problem Photo",
      description: "Take a photo of your cluttered space or disorganized area that needs solutions",
      color: "text-primary"
    },
    {
      icon: Search,
      title: "AI Analyzes Problem",
      description: "Our AI detects the specific organization issues and identifies what solutions you need",
      color: "text-accent"
    },
    {
      icon: ShoppingCart,
      title: "Get Smart Solutions",
      description: "Receive targeted product recommendations and deals that solve your specific space problems",
      color: "text-primary-glow"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How It <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to solve your space problems with AI-powered solution matching
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-px bg-gradient-to-r from-primary/30 to-accent/30 transform -translate-y-1/2 z-0" />
                )}
                
                <Card className="card-gradient p-8 text-center relative z-10 hover:scale-105 transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-primary/10 ${step.color} mb-6`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm font-medium">100% Free to Use</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;