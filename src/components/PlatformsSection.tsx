import { Shield, Zap, TrendingUp, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const PlatformsSection = () => {
  const platforms = [
    { name: "Amazon", color: "bg-orange-500", users: "500M+" },
    { name: "Flipkart", color: "bg-blue-500", users: "400M+" },
    { name: "eBay", color: "bg-yellow-500", users: "180M+" },
    { name: "Walmart", color: "bg-blue-600", users: "250M+" }
  ];

  const features = [
    {
      icon: Shield,
      title: "Verified Deals",
      description: "All deals are verified and updated in real-time"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get price comparisons in under 3 seconds"
    },
    {
      icon: TrendingUp,
      title: "Price Tracking",
      description: "Track price drops and get notified instantly"
    },
    {
      icon: Star,
      title: "Best Match",
      description: "AI finds the most relevant products for your needs"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Supported</span> Platforms
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We search across the world's largest e-commerce platforms to find you the best deals
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {platforms.map((platform, index) => (
            <Card key={index} className="card-soft p-6 text-center group hover:scale-105 transition-all duration-300">
              <div className={`w-16 h-16 ${platform.color} rounded-xl mx-auto mb-4 flex items-center justify-center transform group-hover:rotate-6 transition-transform`}>
                <span className="text-white font-bold text-lg">{platform.name.charAt(0)}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{platform.name}</h3>
              <p className="text-sm text-muted-foreground">{platform.users} users</p>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="card-gradient p-6 text-center hover:scale-105 transition-all duration-300">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Stats */}
        <div className="text-center mt-16 p-8 bg-primary/5 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">Covering 95% of Online Retail</h3>
          <p className="text-muted-foreground mb-6">
            Our AI searches millions of products across these platforms every day
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50M+</div>
              <div className="text-sm text-muted-foreground">Products Indexed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">24/7</div>
              <div className="text-sm text-muted-foreground">Price Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-glow">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformsSection;