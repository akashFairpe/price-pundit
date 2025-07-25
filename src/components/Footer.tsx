import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-glow to-accent-glow bg-clip-text text-transparent">
              AI Deal Finder
            </h3>
            <p className="text-background/70 mb-6 leading-relaxed max-w-md">
              Find the best deals with the power of AI. We search millions of products across multiple platforms to save you time and money.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm text-background/70">
                <Mail className="w-4 h-4" />
                hello@aidealfinder.com
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-background/70">
              <li><Link to="/search" className="hover:text-primary-glow transition-colors">Search Products</Link></li>
              <li><Link to="/results" className="hover:text-primary-glow transition-colors">Browse Deals</Link></li>
              <li><Link to="/wishlist" className="hover:text-primary-glow transition-colors">My Wishlist</Link></li>
              <li><Link to="/about" className="hover:text-primary-glow transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-background/70">
              <li><Link to="/about" className="hover:text-primary-glow transition-colors">Help Center</Link></li>
              <li><Link to="/feedback" className="hover:text-primary-glow transition-colors">Contact Us</Link></li>
              <li><Link to="/feedback" className="hover:text-primary-glow transition-colors">Feedback</Link></li>
              <li><Link to="/about" className="hover:text-primary-glow transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/70 text-sm">
            © 2024 AI Deal Finder. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-background/70 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            <span>for smart shoppers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;