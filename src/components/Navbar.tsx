import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Database className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold">Clutter IQ</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="/#integrations" className="text-sm font-medium hover:text-primary transition-colors">
              Integrations
            </Link>
            <Link to="/docs" className="text-sm font-medium hover:text-primary transition-colors">
              Docs
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
