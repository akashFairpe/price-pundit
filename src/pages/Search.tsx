import { useState } from "react";
import { Camera, MessageSquare, Upload, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Search = () => {
  const [prompt, setPrompt] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [interpretedQuery, setInterpretedQuery] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Convert file to base64 and store for later use
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl = e.target?.result as string;
      setImageDataUrl(imageDataUrl);
      setUploadedImage(imageDataUrl);
      
      toast({
        title: "Image uploaded successfully!",
        description: "Now describe your problem and click Analyze to get solutions."
      });
    };
    
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please describe your problem",
        description: "Enter a description of your space problem to analyze.",
        variant: "destructive"
      });
      return;
    }

    if (!imageDataUrl) {
      toast({
        title: "Please upload an image",
        description: "Upload an image of your problem space to analyze.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const response = await fetch('http://localhost:3000/api/case-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          imageDataUrl: imageDataUrl
        })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze');
      }

      const data = await response.json();
      
      if (data.success && data.length > 0) {
        // Store the product data for the results page
        localStorage.setItem('searchResults', JSON.stringify(data));
        
        setInterpretedQuery({
          problemDetected: "Space Organization Issues Detected",
          categories: [...new Set(data.slice(0, 5).map(product => product.title.split(' ').slice(0, 2).join(' ')))],
          confidence: 0.95
        });
        
        toast({
          title: "Analysis completed successfully!",
          description: `Found ${data.length} matching solutions for your space.`
        });
      } else {
        throw new Error('No products found');
      }
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again with different image or description.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFindDeals = () => {
    navigate("/results");
  };

  return (
    <div className="min-h-screen bg-hero-gradient">
      <Navigation />
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
                <h3 className="text-2xl font-semibold mb-4">🖼️ Upload Problem Photo</h3>
                <p className="text-muted-foreground mb-6">
                  Upload an image of your space problem (cluttered desk, disorganized room, etc.)
                </p>
                
                {!uploadedImage ? (
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
                ) : (
                  <div className="relative border-2 border-success rounded-xl overflow-hidden">
                    <img src={uploadedImage} alt="Uploaded problem" className="w-full h-48 object-cover" />
                    <div className="absolute top-2 right-2 bg-success text-white px-2 py-1 rounded text-sm">
                      ✓ Uploaded
                    </div>
                    <button 
                      onClick={() => {
                        setUploadedImage(null);
                        setImageDataUrl(null);
                      }}
                      className="absolute bottom-2 right-2 bg-background/80 hover:bg-background px-3 py-1 rounded text-sm"
                    >
                      Change
                    </button>
                  </div>
                )}
              </div>
            </Card>

            {/* Text Prompt Section */}
            <Card className="card-gradient p-8">
              <div className="text-center mb-6">
                <div className="inline-flex p-4 rounded-xl bg-accent/10 text-accent mb-6">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">💬 Describe Your Problem</h3>
                <p className="text-muted-foreground">
                  Describe your space problem or what you need to organize
                </p>
              </div>
              
              <div className="space-y-4">
                <Textarea
                  placeholder="My room feels too crowded. I need space-saving furniture..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </div>
            </Card>
          </div>

          {/* Unified Analyze Button */}
          <div className="text-center mb-8">
            <Button 
              onClick={handleAnalyze}
              disabled={!prompt.trim() || !imageDataUrl || isProcessing}
              className="btn-hero-primary text-xl px-12 py-6"
            >
              {isProcessing ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 mr-3" />
                  Analyze Problem
                </>
              )}
            </Button>
            {(!prompt.trim() || !imageDataUrl) && (
              <p className="text-sm text-muted-foreground mt-2">
                {!imageDataUrl && !prompt.trim() ? "Please upload an image and describe your problem" :
                 !imageDataUrl ? "Please upload an image to analyze" :
                 "Please describe your problem"}
              </p>
            )}
          </div>

          {/* Interpreted Query Result */}
          {interpretedQuery && (
            <Card className="card-soft p-6 mb-8 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-success/10 text-success">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">🧠 Problem Analysis Complete</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Problem Detected:</p>
                      <p className="font-medium">{interpretedQuery.problemDetected}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Confidence:</p>
                      <p className="font-medium text-success">{Math.round(interpretedQuery.confidence * 100)}%</p>
                    </div>
                  </div>
                  {interpretedQuery.categories && (
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground mb-2">📌 Suggested Solutions:</p>
                      <div className="flex flex-wrap gap-2">
                        {interpretedQuery.categories.map((category, index) => (
                          <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                            {category}
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
                Find Solutions & Deals
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </div>
          )}

          {/* Sample Prompts */}
          <Card className="card-soft p-6 mt-12">
            <h4 className="font-semibold mb-4 text-center">Try These Sample Searches</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "My workspace is cluttered with cables everywhere",
                "My small apartment needs space-saving storage solutions",
                "Kitchen counter is always messy, need organization",
                "My study table has no space for books and laptop together",
                "Bedroom closet is overflowing, need better storage",
                "Home office corner feels cramped and disorganized"
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