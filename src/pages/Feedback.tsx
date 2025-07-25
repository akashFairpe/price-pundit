import { useState } from "react";
import { MessageSquare, Star, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    category: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const categories = [
    "Overall Experience",
    "Search Accuracy",
    "Price Comparison",
    "User Interface",
    "Mobile Experience",
    "Customer Support",
    "Feature Request",
    "Bug Report"
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call: POST /api/feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Feedback submitted successfully!",
        description: "Thank you for helping us improve our service."
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
        <Card className="card-gradient p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p className="text-muted-foreground mb-6">
            Your feedback has been submitted successfully. We really appreciate you taking the time to help us improve our AI Deal Finder platform.
          </p>
          <div className="space-y-3">
            <Button 
              onClick={() => window.location.href = "/"}
              className="w-full btn-hero-primary"
            >
              Continue Shopping
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  rating: 0,
                  category: "",
                  message: ""
                });
              }}
              className="w-full"
            >
              Submit Another Feedback
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-gradient py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium">Your Voice Matters</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            We'd Love Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Feedback</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us make AI Deal Finder even better. Your suggestions and experiences guide our improvements.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="card-gradient p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm">{errors.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-3">
                <Label>Overall Rating</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleRatingClick(rating)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          rating <= formData.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {formData.rating > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {formData.rating === 1 && "We're sorry to hear about your experience. Please tell us how we can improve."}
                    {formData.rating === 2 && "We appreciate your feedback. Let us know what we can do better."}
                    {formData.rating === 3 && "Thank you for your rating. How can we make your experience better?"}
                    {formData.rating === 4 && "Great! We're glad you had a good experience. Any suggestions for improvement?"}
                    {formData.rating === 5 && "Awesome! We're thrilled you love our service. Tell us what we're doing right!"}
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Feedback Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background"
                >
                  <option value="">Select a category (optional)</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Your Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell us about your experience, suggestions for improvement, or any issues you've encountered..."
                  className={`min-h-[120px] resize-none ${errors.message ? "border-destructive" : ""}`}
                />
                <div className="flex justify-between items-center">
                  {errors.message && (
                    <p className="text-destructive text-sm">{errors.message}</p>
                  )}
                  <p className="text-sm text-muted-foreground ml-auto">
                    {formData.message.length}/500 characters
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-hero-primary text-lg py-6"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                    Submitting Feedback...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-3" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Card className="card-soft p-6 text-center">
              <MessageSquare className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Quick Response</h3>
              <p className="text-sm text-muted-foreground">
                We typically respond to feedback within 24-48 hours
              </p>
            </Card>
            
            <Card className="card-soft p-6 text-center">
              <CheckCircle className="w-8 h-8 text-success mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Your Privacy</h3>
              <p className="text-sm text-muted-foreground">
                Your feedback is confidential and helps us improve for everyone
              </p>
            </Card>
          </div>

          {/* Contact Alternative */}
          <Card className="card-soft p-6 mt-8 text-center">
            <h3 className="font-semibold mb-2">Need Immediate Help?</h3>
            <p className="text-muted-foreground mb-4">
              For urgent issues or detailed support, you can also reach us directly
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" onClick={() => window.location.href = "mailto:support@aidealfinder.com"}>
                Email Support
              </Button>
              <Button variant="outline" onClick={() => window.location.href = "/about"}>
                Learn More About Us
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Feedback;