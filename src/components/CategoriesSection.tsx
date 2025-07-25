import { Home, Utensils, Dumbbell, Smartphone, Laptop, Car, Baby, Shirt } from "lucide-react";
import { Card } from "@/components/ui/card";

const CategoriesSection = () => {
  // Simulated API data: GET /api/categories
  const categories = [
    {
      name: "Home Office",
      icon: Home,
      description: "Desks, chairs, lighting & accessories",
      deals: "2,500+ deals",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      name: "Kitchen Essentials",
      icon: Utensils,
      description: "Appliances, cookware & dining",
      deals: "3,200+ deals",
      gradient: "from-orange-500 to-red-500"
    },
    {
      name: "Fitness",
      icon: Dumbbell,
      description: "Equipment, apparel & supplements",
      deals: "1,800+ deals",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      name: "Gadgets",
      icon: Smartphone,
      description: "Phones, tablets & accessories",
      deals: "4,100+ deals",
      gradient: "from-purple-500 to-violet-600"
    },
    {
      name: "Computers",
      icon: Laptop,
      description: "Laptops, PCs & peripherals",
      deals: "2,900+ deals",
      gradient: "from-gray-600 to-gray-700"
    },
    {
      name: "Automotive",
      icon: Car,
      description: "Car accessories & maintenance",
      deals: "1,600+ deals",
      gradient: "from-red-500 to-pink-600"
    },
    {
      name: "Baby & Kids",
      icon: Baby,
      description: "Toys, clothes & baby care",
      deals: "2,200+ deals",
      gradient: "from-pink-400 to-rose-500"
    },
    {
      name: "Fashion",
      icon: Shirt,
      description: "Clothing, shoes & accessories",
      deals: "5,800+ deals",
      gradient: "from-indigo-500 to-purple-600"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Popular <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Categories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our most searched categories and discover amazing deals powered by AI
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index} 
                className="card-soft p-6 text-center cursor-pointer group hover:scale-105 transition-all duration-300 hover:shadow-glow"
              >
                {/* Icon with Gradient Background */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Category Name */}
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {category.description}
                </p>
                
                {/* Deals Count */}
                <div className="inline-flex items-center gap-1 bg-success/10 text-success px-3 py-1 rounded-full text-xs font-medium">
                  <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                  {category.deals}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Featured Banner */}
        <Card className="card-gradient p-8 text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <h3 className="text-2xl font-bold mb-4">
            Can't Find Your Category?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our AI can understand and find deals for virtually any product. Just describe what you're looking for or upload an image!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <span className="text-sm font-medium">Electronics • Furniture • Sports • Books • And More!</span>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {[
            { label: "Total Categories", value: "500+" },
            { label: "Active Deals", value: "2.5M+" },
            { label: "Daily Updates", value: "24/7" },
            { label: "New Deals", value: "10K+/day" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4">
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;