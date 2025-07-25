import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import testimonialImage from "@/assets/testimonial-people.jpg";

const TestimonialsSection = () => {
  const navigate = useNavigate();
  // Simulated API data: GET /api/testimonials
  const testimonials = [
    {
      name: "Ankit Sharma",
      photo: testimonialImage,
      review: "My cluttered home office was a mess! Uploaded a photo and got perfect organizer recommendations. Saved ₹2,000 and my space looks amazing!",
      rating: 5,
      product: "Desk Organization Kit",
      savings: "₹2,000"
    },
    {
      name: "Neha Patel",
      photo: testimonialImage,
      review: "Described my cramped kitchen storage problem and instantly got space-saving solutions. The AI really understands what I needed!",
      rating: 5,
      product: "Kitchen Storage Set",
      savings: "₹1,500"
    },
    {
      name: "Raj Kumar",
      photo: testimonialImage,
      review: "Small apartment, big storage problems. The AI analyzed my space photo and suggested furniture that actually fits. Life-changing!",
      rating: 5,
      product: "Space-saving Furniture",
      savings: "₹8,000"
    }
  ];

  const stats = [
    { value: "4.9/5", label: "Average Rating" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "₹2,50,000", label: "Average Savings" }
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            What Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Users</span> Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of happy customers who solve their space problems and save money with our AI-powered solution finder
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-gradient p-6 relative overflow-hidden hover:scale-105 transition-all duration-300">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-primary/20">
                <Quote className="w-8 h-8" />
              </div>
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              {/* Review */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.review}"
              </p>
              
              {/* User Info */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={testimonial.photo} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">Verified Buyer</div>
                </div>
              </div>
              
              {/* Product & Savings */}
              <div className="border-t pt-4 flex justify-between text-sm">
                <div>
                  <span className="text-muted-foreground">Product: </span>
                  <span className="font-medium">{testimonial.product}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Saved: </span>
                  <span className="font-bold text-success">{testimonial.savings}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Social Proof */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-6 py-3 rounded-full">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-success/20 rounded-full border-2 border-success/30 flex items-center justify-center text-xs font-bold">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="font-medium">Join 100,000+ users solving space problems daily</span>
          </div>
          <div className="mt-8">
            <Button 
              onClick={() => navigate("/search")}
              className="btn-hero-primary"
            >
              Start Solving Your Space Problems
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;