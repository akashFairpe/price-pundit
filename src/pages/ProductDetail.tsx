import { useState, useEffect } from "react";
import { ArrowLeft, Star, Heart, Share2, ShoppingCart, TrendingDown, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Simulated API data: GET /api/product/:id
  const mockProduct = {
    id: 1,
    name: "Minimalist Study Desk with Storage",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=800"
    ],
    currentImage: 0,
    aiReasoning: "This desk is spacious and includes a cup holder and drawer, which fits your needs perfectly. The minimalist design offers clean aesthetics while the built-in storage helps organize your stationery. The surface is large enough for laptop work and additional accessories.",
    rating: 4.5,
    reviews: 1247,
    matchScore: 91,
    features: ["Engineered Wood", "2 Storage Drawers", "Cable Management", "Easy Assembly", "Anti-Scratch Surface", "Eco-Friendly"],
    dimensions: "120cm L x 60cm W x 75cm H",
    weight: "25 kg",
    warranty: "2 Year Manufacturer Warranty",
    vendors: [
      { 
        name: "Amazon", 
        price: "₹5,499", 
        originalPrice: "₹7,999", 
        discount: "31%",
        rating: 4.6,
        shipping: "Free Delivery",
        availability: "In Stock",
        url: "#"
      },
      { 
        name: "Flipkart", 
        price: "₹5,699", 
        originalPrice: "₹8,199", 
        discount: "30%",
        rating: 4.4,
        shipping: "Free Delivery",
        availability: "In Stock",
        url: "#"
      },
      { 
        name: "Urban Ladder", 
        price: "₹5,899", 
        originalPrice: "₹8,499", 
        discount: "31%",
        rating: 4.3,
        shipping: "₹99 Delivery",
        availability: "2-3 Days",
        url: "#"
      }
    ],
    priceHistory: [
      { date: "Jan", price: 7999 },
      { date: "Feb", price: 7500 },
      { date: "Mar", price: 6999 },
      { date: "Apr", price: 5499 }
    ]
  };

  const mockReviews = [
    {
      id: 1,
      user: "Priya S.",
      rating: 5,
      date: "2 days ago",
      comment: "Perfect desk for my home office setup. The storage drawers are very handy and assembly was straightforward.",
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      user: "Amit K.",
      rating: 4,
      date: "1 week ago", 
      comment: "Good quality desk but delivery took longer than expected. Overall satisfied with the purchase.",
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      user: "Sneha M.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent build quality and perfect size for my laptop and accessories. Highly recommended!",
      verified: true,
      helpful: 15
    }
  ];

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setProduct(mockProduct);
      setLoading(false);
    }, 1000);
  }, []);

  const handleTrackPrice = () => {
    toast({
      title: "Price tracking enabled!",
      description: "We'll notify you when the price drops."
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist!",
      description: "Product saved to your wishlist."
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
            <div className="w-full h-96 bg-muted rounded-xl" />
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-32 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Results
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={product.images[product.currentImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-success text-success-foreground">
                  {product.matchScore}% Match
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    index === product.currentImage ? 'border-primary' : 'border-border'
                  }`}
                  onClick={() => setProduct({...product, currentImage: index})}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-lg">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <Badge variant="secondary">Best Seller</Badge>
              </div>

              {/* AI Reasoning */}
              <Card className="card-soft p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">AI Reasoning</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {product.aiReasoning}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Key Features</h4>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimensions:</span>
                  <span className="font-medium">{product.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight:</span>
                  <span className="font-medium">{product.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Warranty:</span>
                  <span className="font-medium">{product.warranty}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button onClick={handleAddToWishlist} variant="outline" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
              <Button onClick={handleTrackPrice} variant="outline" className="flex-1">
                <TrendingDown className="w-4 h-4 mr-2" />
                Track Price
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Price Comparison */}
        <Card className="card-soft p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6">Price Comparison</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {product.vendors.map((vendor, index) => (
              <Card key={index} className={`p-4 ${index === 0 ? 'ring-2 ring-primary' : ''}`}>
                {index === 0 && (
                  <Badge className="mb-3 bg-primary text-primary-foreground">Best Price</Badge>
                )}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">{vendor.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{vendor.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{vendor.price}</div>
                    <div className="text-sm text-muted-foreground line-through">
                      {vendor.originalPrice}
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span>{vendor.shipping}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Availability:</span>
                    <span className="text-success">{vendor.availability}</span>
                  </div>
                </div>
                <Button className="w-full" onClick={() => window.open(vendor.url, '_blank')}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
              </Card>
            ))}
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="price-history">Price History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reviews" className="space-y-4">
            {mockReviews.map((review) => (
              <Card key={review.id} className="card-soft p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{review.user}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">{review.comment}</p>
                <div className="text-sm text-muted-foreground">
                  {review.helpful} people found this helpful
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="specifications">
            <Card className="card-soft p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Product Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Material:</span>
                      <span>Engineered Wood</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Color:</span>
                      <span>Walnut Brown</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Assembly:</span>
                      <span>Required</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Dimensions</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Length:</span>
                      <span>120 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Width:</span>
                      <span>60 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Height:</span>
                      <span>75 cm</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="price-history">
            <Card className="card-soft p-6">
              <h4 className="font-semibold mb-4">Price Trend (Last 4 Months)</h4>
              <div className="space-y-3">
                {product.priceHistory.map((data, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{data.date}</span>
                    <span className="font-medium">₹{data.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-success/10 text-success rounded-lg text-sm">
                💡 Price has dropped by ₹2,500 in the last 4 months. Great time to buy!
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;