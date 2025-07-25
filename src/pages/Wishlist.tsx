import { useState, useEffect } from "react";
import { Heart, TrendingDown, Bell, ExternalLink, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Simulated API data: GET /api/wishlist
  const mockWishlistItems = [
    {
      id: 1,
      product: "Wooden Laptop Desk",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      savedPrice: "₹5,299",
      currentPrice: "₹4,999",
      priceDrop: true,
      trackingEnabled: true,
      addedDate: "2024-01-15",
      category: "Furniture",
      vendor: "Amazon",
      discount: "6%",
      availability: "In Stock"
    },
    {
      id: 2,
      product: "Ergonomic Gaming Chair",
      image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400",
      savedPrice: "₹12,999",
      currentPrice: "₹12,999",
      priceDrop: false,
      trackingEnabled: true,
      addedDate: "2024-01-10",
      category: "Furniture",
      vendor: "Flipkart",
      discount: null,
      availability: "In Stock"
    },
    {
      id: 3,
      product: "Wireless Mechanical Keyboard",
      image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400",
      savedPrice: "₹8,999",
      currentPrice: "₹7,499",
      priceDrop: true,
      trackingEnabled: false,
      addedDate: "2024-01-08",
      category: "Electronics",
      vendor: "Amazon",
      discount: "17%",
      availability: "Limited Stock"
    },
    {
      id: 4,
      product: "Monitor Stand with Storage",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      savedPrice: "₹3,499",
      currentPrice: "₹3,999",
      priceDrop: false,
      trackingEnabled: true,
      addedDate: "2024-01-05",
      category: "Accessories",
      vendor: "Urban Ladder",
      discount: null,
      availability: "In Stock"
    }
  ];

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setWishlistItems(mockWishlistItems);
      setLoading(false);
    }, 1000);
  }, []);

  const handleToggleAlert = async (itemId: number, enabled: boolean) => {
    // POST /api/alert
    setWishlistItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, trackingEnabled: enabled } : item
      )
    );
    
    toast({
      title: enabled ? "Price alerts enabled!" : "Price alerts disabled",
      description: enabled 
        ? "We'll notify you when the price drops" 
        : "You won't receive price drop notifications"
    });
  };

  const handleRemoveItem = (itemId: number) => {
    setWishlistItems(items => items.filter(item => item.id !== itemId));
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist"
    });
  };

  const handleViewDeals = (itemId: number) => {
    navigate(`/product/${itemId}`);
  };

  const totalSavings = wishlistItems
    .filter(item => item.priceDrop)
    .reduce((total, item) => {
      const saved = parseInt(item.savedPrice.replace(/[₹,]/g, "")) - parseInt(item.currentPrice.replace(/[₹,]/g, ""));
      return total + saved;
    }, 0);

  if (loading) {
  return (
    <div className="min-h-screen bg-background py-12">
      <Navigation />
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
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
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-primary fill-primary" />
            <h1 className="text-3xl lg:text-4xl font-bold">My Wishlist</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            Track your favorite products and get notified when prices drop
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="card-soft p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{wishlistItems.length}</div>
              <div className="text-sm text-muted-foreground">Saved Items</div>
            </Card>
            <Card className="card-soft p-4 text-center">
              <div className="text-2xl font-bold text-success mb-1">
                {wishlistItems.filter(item => item.priceDrop).length}
              </div>
              <div className="text-sm text-muted-foreground">Price Drops</div>
            </Card>
            <Card className="card-soft p-4 text-center">
              <div className="text-2xl font-bold text-accent mb-1">
                ₹{totalSavings.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Savings</div>
            </Card>
            <Card className="card-soft p-4 text-center">
              <div className="text-2xl font-bold text-primary-glow mb-1">
                {wishlistItems.filter(item => item.trackingEnabled).length}
              </div>
              <div className="text-sm text-muted-foreground">Alerts Active</div>
            </Card>
          </div>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <Card className="card-soft p-12 text-center">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-6">
              Start adding products you love and we'll track the best deals for you
            </p>
            <Button onClick={() => navigate("/")}>
              Start Shopping
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="card-gradient overflow-hidden hover:scale-[1.02] transition-all duration-300">
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.product}
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Price Drop Badge */}
                  {item.priceDrop && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-success text-success-foreground animate-pulse">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        Price Drop!
                      </Badge>
                    </div>
                  )}
                  
                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white text-destructive"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>

                  {/* Availability */}
                  <div className="absolute bottom-3 left-3">
                    <Badge variant={item.availability === "In Stock" ? "secondary" : "destructive"}>
                      {item.availability}
                    </Badge>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg line-clamp-2 flex-1">{item.product}</h3>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <span>{item.vendor}</span>
                      <span>•</span>
                      <span>{item.category}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Added on {new Date(item.addedDate).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Price Comparison */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Saved Price:</span>
                      <span className="font-medium line-through text-muted-foreground">
                        {item.savedPrice}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Current Price:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{item.currentPrice}</span>
                        {item.discount && (
                          <Badge variant="destructive" className="text-xs">
                            {item.discount} OFF
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {item.priceDrop && (
                      <div className="mt-2 text-success text-sm font-medium">
                        You save ₹{(parseInt(item.savedPrice.replace(/[₹,]/g, "")) - parseInt(item.currentPrice.replace(/[₹,]/g, ""))).toLocaleString()}!
                      </div>
                    )}
                  </div>

                  {/* Price Alert Toggle */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Price Alerts</span>
                    </div>
                    <Switch
                      checked={item.trackingEnabled}
                      onCheckedChange={(checked) => handleToggleAlert(item.id, checked)}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleViewDeals(item.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Deals
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Price Drop Summary */}
        {wishlistItems.some(item => item.priceDrop) && (
          <Card className="card-gradient p-6 mt-8">
            <div className="text-center">
              <TrendingDown className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Great News!</h3>
              <p className="text-muted-foreground mb-4">
                {wishlistItems.filter(item => item.priceDrop).length} item(s) in your wishlist have dropped in price. 
                You could save a total of ₹{totalSavings.toLocaleString()}!
              </p>
              <Button className="btn-hero-primary">
                Shop Now & Save
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Wishlist;