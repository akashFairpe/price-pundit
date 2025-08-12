import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Star, Heart, Share2, ShoppingCart, TrendingDown, Award, CheckCircle, ZoomIn, ZoomOut, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Downsample large datasets to improve readability and performance (Largest-Triangle-Three-Buckets)
interface PricePoint { time: number; dateLabel: string; price: number; fullDate?: string }
function downsampleLTTB(data: PricePoint[], threshold: number): PricePoint[] {
  if (!Array.isArray(data) || data.length === 0 || threshold <= 0 || threshold >= data.length) return data;
  const sampled: PricePoint[] = [];
  const bucketSize = (data.length - 2) / (threshold - 2);
  let a = 0; // first point
  sampled.push(data[a]);

  for (let i = 0; i < threshold - 2; i++) {
    const start = Math.floor((i + 1) * bucketSize) + 1;
    const end = Math.floor((i + 2) * bucketSize) + 1;

    let avgX = 0, avgY = 0;
    const avgRangeLength = Math.max(end - start, 1);
    for (let j = start; j < end; j++) {
      const pt = data[j];
      avgX += (pt.time ?? j);
      avgY += pt.price;
    }
    avgX /= avgRangeLength;
    avgY /= avgRangeLength;

    const rangeOffs = Math.floor((i + 0) * bucketSize) + 1;
    const rangeTo = Math.floor((i + 1) * bucketSize) + 1;

    let maxArea = -1;
    let maxAreaPointIndex = rangeOffs;

    for (let j = rangeOffs; j < rangeTo; j++) {
      const ax = data[a].time ?? a;
      const ay = data[a].price;
      const bx = data[j].time ?? j;
      const by = data[j].price;

      const area = Math.abs((ax - avgX) * (by - ay) - (ax - bx) * (avgY - ay)) * 0.5;
      if (area > maxArea) {
        maxArea = area;
        maxAreaPointIndex = j;
      }
    }

    sampled.push(data[maxAreaPointIndex]);
    a = maxAreaPointIndex;
  }

  sampled.push(data[data.length - 1]);
  return sampled;
}

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

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


    async function fetchProduct(productId: string) {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/product/${productId}`);
        if (!res.ok) throw new Error('Product not found');
        const foundProduct = await res.json();

        // Transform API data to component format
        const cleanImages = foundProduct.images
          ?.map((url: string) => {
            if (!url.includes('/images/I')) return null;
            const match = url.match(/(https:\/\/m\.media-amazon\.com\/images\/I\/[^.]+)/);
            return match ? match[1] + '.jpg' : null;
          })
          ?.filter(Boolean) || [];

        const transformedProduct: any = {
          id: foundProduct.productId,
          name: foundProduct.title || "Product",
          images: cleanImages.length > 0 ? cleanImages : ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"],
          currentImage: 0,
          aiReasoning: foundProduct.why_good_choice || "This product matches your needs perfectly.",
          rating: foundProduct.rating?.rating || 4.0,
          reviews: foundProduct.reviews || [],
          reviewCount: foundProduct.rating?.ratingCount || 0,
          matchScore: parseInt(foundProduct.matchPercentage?.replace('%', '')) || 85,
          features: foundProduct.keyFeature || foundProduct.title?.split(' ').slice(0, 6) || ["Quality Product"],
          specifications: foundProduct.specifications || [],
          dimensions: "Standard Size",
          weight: "Standard Weight",
          warranty: "1 Year Warranty",
          vendors: [{
            name: "Amazon",
            price: foundProduct.price?.price || "₹0",
            originalPrice: foundProduct.price?.mrp || null,
            discount: foundProduct.price?.discount || null,
            rating: foundProduct.rating?.rating || 4.0,
            shipping: "Free Delivery",
            availability: "In Stock",
            url: foundProduct.productUrl || "#"
          }],
          priceHistory: foundProduct.priceHistory
            ? foundProduct.priceHistory
                .filter((item: any) => {
                  const v = Number(item?.val);
                  return Number.isFinite(v) && v !== -1 && item?.date;
                })
                .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((item: any) => {
                  const d = new Date(item.date);
                  const v = Number(item.val);
                  return {
                    time: d.getTime(),
                    dateLabel: d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                    price: Math.round(v / 100),
                    fullDate: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                  };
                })
            : []
        };

        setProduct(transformedProduct);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct(id as string);
    } else {
      setLoading(false);
      setProduct(null);
    }
  }, [id]);

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

  const handleZoomIn = () => setZoom((z) => Math.min(5, z * 1.25));
  const handleZoomOut = () => setZoom((z) => Math.max(0.5, z / 1.25));
  const handleResetView = () => {
    setZoom(1);
    setTimeout(() => {
      const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement | null;
      if (viewport) viewport.scrollLeft = viewport.scrollWidth;
    }, 0);
  };
  if (loading) {
  return (
    <div className="min-h-screen bg-background py-12">
      <Navigation />
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

  // Prepare chart data with downsampling (LTTB)
  const rawHistory: any[] = (product?.priceHistory as any[]) || [];
  const MAX_POINTS = 400;
  const chartData: any[] = rawHistory.length > MAX_POINTS ? downsampleLTTB(rawHistory as any, MAX_POINTS) : rawHistory;

  if (!product) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <Card className="card-soft p-8 text-center">
            <h2 className="text-2xl font-semibold mb-2">Product not found</h2>
            <p className="text-muted-foreground mb-4">We couldn't load this product. It may have been removed or is temporarily unavailable.</p>
            <div className="flex justify-center gap-2">
              <Button variant="outline" onClick={() => navigate(-1)}>Go Back</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
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
                  <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
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
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            <TabsTrigger value="price-history">Price History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reviews" className="space-y-4">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <Card key={index} className="card-soft p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{review.reviewedUserName}</span>
                        <Badge variant="secondary" className="text-xs">{review.verifedReview}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-yellow-600">
                          {review.ReviwedRating}
                        </span>
                        <span className="text-sm text-muted-foreground">{review.ReviewedDate}</span>
                      </div>
                    </div>
                  </div>
                  <h6 className="font-medium mb-2">{review.ReviweTitle}</h6>
                  <p className="text-muted-foreground mb-3">{review.reviewText}</p>
                  <div className="text-sm text-muted-foreground">
                    👍 Helpful
                  </div>
                </Card>
              ))
            ) : (
              // Fallback to mock reviews if no real reviews available
              mockReviews.map((review) => (
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
              ))
            )}
          </TabsContent>
          
          <TabsContent value="specifications">
            <Card className="card-soft p-6">
              {product.specifications && product.specifications.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Product Details</h4>
                    <div className="space-y-2">
                      {product.specifications.slice(0, Math.ceil(product.specifications.length / 2)).map((spec, index) => {
                        const key = Object.keys(spec)[0];
                        const value = spec[key];
                        return (
                          <div key={index} className="flex justify-between">
                            <span className="text-muted-foreground">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Additional Details</h4>
                    <div className="space-y-2">
                      {product.specifications.slice(Math.ceil(product.specifications.length / 2)).map((spec, index) => {
                        const key = Object.keys(spec)[0];
                        const value = spec[key];
                        return (
                          <div key={index} className="flex justify-between">
                            <span className="text-muted-foreground">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        );
                      })}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Warranty:</span>
                        <span className="font-medium">{product.warranty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Product Details</h4>
                    <div className="space-y-2">
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
                </div>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="price-history">
            <Card className="card-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Price Trend Over Time</h4>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={handleZoomOut} aria-label="Zoom out">
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleZoomIn} aria-label="Zoom in">
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" onClick={handleResetView} aria-label="Reset view">
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
              <div className="h-80 w-full">
                <ScrollArea ref={scrollAreaRef} className="w-full h-full">
                  <div
                    style={{ width: `${Math.max((chartData?.length || 0) * 28 * zoom, 600)}px`, height: '100%' }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis 
                          dataKey="dateLabel"
                          tick={{ fontSize: 12 }}
                          interval="preserveStartEnd"
                          minTickGap={16}
                          tickMargin={8}
                          className="text-muted-foreground"
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          className="text-muted-foreground"
                          tickFormatter={(value) => `₹${value.toLocaleString()}`}
                        />
                        <Tooltip 
                          formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Price']}
                          labelFormatter={(label, payload) => `Date: ${payload?.[0]?.payload?.fullDate || label}`}
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          dot={chartData.length <= 200 ? { fill: 'hsl(var(--primary))', strokeWidth: 2, r: 3 } : false}
                          activeDot={chartData.length <= 200 ? { r: 5, fill: 'hsl(var(--primary))' } : false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Lowest Price</p>
                  <p className="font-semibold">
                    {(() => { const arr = (product.priceHistory || []).map((p:any)=>p.price); return arr.length ? `₹${Math.min(...arr).toLocaleString()}` : '—'; })()}
                  </p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Highest Price</p>
                  <p className="font-semibold">
                    {(() => { const arr = (product.priceHistory || []).map((p:any)=>p.price); return arr.length ? `₹${Math.max(...arr).toLocaleString()}` : '—'; })()}
                  </p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Current Price</p>
                  <p className="font-semibold text-primary">
                    {(() => { const arr = (product.priceHistory || []).map((p:any)=>p.price); return arr.length ? `₹${arr[arr.length-1].toLocaleString()}` : '—'; })()}
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-success/10 text-success rounded-lg text-sm">
                💡 Track price changes over time to find the best deals!
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;