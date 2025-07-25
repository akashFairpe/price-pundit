import { useState } from "react";
import { Camera, MessageSquare, Upload, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Search = () => {
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [interpretedQuery, setInterpretedQuery] = useState(null);
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    // Simulate API call: POST /api/upload
    setTimeout(() => {
      setInterpretedQuery({
        product: "Ergonomic Office Chair",
        confidence: 0.92,
        features: ["Lumbar support", "Adjustable height", "Breathable mesh"]
      });
      setIsProcessing(false);
      toast({
        title: "Image analyzed successfully!",
        description: "We found a great match for your product."
      });
    }, 2000);
  };

  const handlePromptSearch = async () => {
    if (!prompt.trim()) return;
    
    setIsProcessing(true);
    // Simulate API call: POST /api/prompt-search
    setTimeout(() => {
      setInterpretedQuery({
        intent: "Study Desk",
        features: ["Laptop area", "Water bottle holder", "Pen organizer"],
        confidence: 0.88
      });
      setIsProcessing(false);
      toast({
        title: "Prompt analyzed successfully!",
        description: "We understand what you're looking for."
      });
    }, 1500);
  };

  const handleFindDeals = () => {
    // Navigate to results page
    window.location.href = "/results";
  };

  return (
    <div className="min-h-screen bg-hero-gradient">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Search</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Find Your Perfect <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Product</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload an image or describe what you need. Our AI will find the best deals for you.
          </p>
        </div>

        {/* Search Interface */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Image Upload Section */}
            <Card className="card-gradient p-8">
              <div className="text-center">
                <div className="inline-flex p-4 rounded-xl bg-primary/10 text-primary mb-6">
                  <Camera className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Upload Product Image</h3>
                <p className="text-muted-foreground mb-6">
                  Take a photo or upload an image of the product you're looking for
                </p>
                
                <div className="border-2 border-dashed border-border rounded-xl p-8 hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer block">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                  </label>
                </div>
              </div>
            </Card>

            {/* Text Prompt Section */}
            <Card className="card-gradient p-8">
              <div className="text-center mb-6">
                <div className="inline-flex p-4 rounded-xl bg-accent/10 text-accent mb-6">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Describe Your Needs</h3>
                <p className="text-muted-foreground">
                  Tell us what you're looking for in natural language
                </p>
              </div>
              
              <div className="space-y-4">
                <Textarea
                  placeholder="I need a desk with space for a laptop, bottle holder, and stationery..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
                
                <Button 
                  onClick={handlePromptSearch}
                  disabled={!prompt.trim() || isProcessing}
                  className="w-full btn-hero-secondary"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Analyze Prompt
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Interpreted Query Result */}
          {interpretedQuery && (
            <Card className="card-soft p-6 mb-8 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-success/10 text-success">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">AI Analysis Complete</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Product Match:</p>
                      <p className="font-medium">{interpretedQuery.product || interpretedQuery.intent}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Confidence:</p>
                      <p className="font-medium text-success">{Math.round(interpretedQuery.confidence * 100)}%</p>
                    </div>
                  </div>
                  {interpretedQuery.features && (
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground mb-2">Key Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {interpretedQuery.features.map((feature, index) => (
                          <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Find Deals CTA */}
          {interpretedQuery && (
            <div className="text-center animate-fade-in">
              <Button onClick={handleFindDeals} className="btn-hero-primary text-xl px-12 py-6">
                Find Best Deals
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </div>
          )}

          {/* Sample Prompts */}
          <Card className="card-soft p-6 mt-12">
            <h4 className="font-semibold mb-4 text-center">Try These Sample Searches</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Gaming chair with RGB lighting and lumbar support",
                "Wireless headphones with noise cancellation under ₹5000",
                "Kitchen mixer grinder with multiple jars",
                "Laptop bag that fits 15.6 inch laptop with extra compartments",
                "Running shoes for morning jogs, size 9",
                "Office desk lamp with adjustable brightness"
              ].map((sample, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(sample)}
                  className="text-left p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-sm"
                >
                  {sample}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Search;