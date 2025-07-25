import { useState, useEffect } from "react";
import { Filter, Star, ExternalLink, Heart, TrendingDown, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Results = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("best-match");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const navigate = useNavigate();

  // Simulated API data: GET /api/deals?query=desk
  const mockProducts = [
    {
      id: 1,
      name: "Minimalist Study Desk with Storage",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      matchScore: 0.91,
      reasons: ["Has bottle holder", "Dedicated pen space", "Laptop friendly surface"],
      vendors: [
        { name: "Amazon", price: "₹5,499", originalPrice: "₹7,999", url: "#", discount: "31%" },
        { name: "Flipkart", price: "₹5,699", originalPrice: "₹8,199", url: "#", discount: "30%" },
        { name: "Urban Ladder", price: "₹5,899", originalPrice: "₹8,499", url: "#", discount: "31%" }
      ],
      rating: 4.5,
      reviews: 1247,
      features: ["Engineered Wood", "2 Drawers", "Cable Management", "Easy Assembly"]
    },
    {
      id: 2,
      name: "Ergonomic Office Desk Pro",
      image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400",
      matchScore: 0.87,
      reasons: ["Height adjustable", "Large workspace", "Built-in organizers"],
      vendors: [
        { name: "Amazon", price: "₹8,999", originalPrice: "₹12,999", url: "#", discount: "31%" },
        { name: "Pepperfry", price: "₹9,299", originalPrice: "₹13,499", url: "#", discount: "31%" }
      ],
      rating: 4.7,
      reviews: 892,
      features: ["Adjustable Height", "Memory Foam", "Premium Wood", "10 Year Warranty"]
    },
    {
      id: 3,
      name: "Compact Student Desk",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      matchScore: 0.83,
      reasons: ["Perfect size", "Storage compartments", "Budget friendly"],
      vendors: [
        { name: "Flipkart", price: "₹3,299", originalPrice: "₹4,999", url: "#", discount: "34%" },
        { name: "Amazon", price: "₹3,499", originalPrice: "₹5,199", url: "#", discount: "33%" }
      ],
      rating: 4.2,
      reviews: 623,
      features: ["Compact Design", "2 Shelves", "Easy Assembly", "Durable"]
    }
  ];

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1500);
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseInt(a.vendors[0].price.replace(/[₹,]/g, "")) - parseInt(b.vendors[0].price.replace(/[₹,]/g, ""));
      case "price-high":
        return parseInt(b.vendors[0].price.replace(/[₹,]/g, "")) - parseInt(a.vendors[0].price.replace(/[₹,]/g, ""));
      case "rating":
        return b.rating - a.rating;
      default:
        return b.matchScore - a.matchScore;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Skeleton Loader */}
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="w-full h-48 bg-muted rounded-lg mb-4" />
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-4 bg-muted rounded w-3/4 mb-4" />
                <div className="h-8 bg-muted rounded" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <Navigation />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            We analyzed your space and found these smart solutions
          </h1>
          <p className="text-muted-foreground">Found {products.length} solution products • Based on problem analysis</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-soft p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5" />
                <h3 className="font-semibold">Filters</h3>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="best-match">Best Match</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">Price Range</label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={50000}
                  step={500}
                  className="mb-3"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* Match Rating */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">Match Rating</label>
                <div className="space-y-2">
                  {["90%+", "80%+", "70%+", "60%+"].map((rating) => (
                    <label key={rating} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{rating} Match</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sellers */}
              <div>
                <label className="text-sm font-medium mb-3 block">Sellers</label>
                <div className="space-y-2">
                  {["Amazon", "Flipkart", "Urban Ladder", "Pepperfry"].map((seller) => (
                    <label key={seller} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{seller}</span>
                    </label>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {sortedProducts.map((product) => (
                <Card key={product.id} className="card-gradient overflow-hidden hover:scale-[1.02] transition-all duration-300">
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-success text-success-foreground">
                        {Math.round(product.matchScore * 100)}% Match
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Product Details */}
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                    </div>

                    {/* Why it matches */}
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2 text-primary">Why this matches:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.reasons.slice(0, 2).map((reason, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price Comparison */}
                    <div className="space-y-2">
                      {product.vendors.slice(0, 2).map((vendor, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-sm">{vendor.name}</span>
                            {vendor.discount && (
                              <Badge variant="destructive" className="text-xs">
                                {vendor.discount} OFF
                              </Badge>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">{vendor.price}</div>
                            {vendor.originalPrice && (
                              <div className="text-xs text-muted-foreground line-through">
                                {vendor.originalPrice}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1" onClick={() => navigate(`/product/${product.id}`)}>
                        View Details
                      </Button>
                      <Button variant="outline" size="icon">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" className="px-8">
                Load More Results
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;