import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      <div className="absolute inset-0 geometric-pattern opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Storage that <span className="italic font-serif">evolves</span> with
            <br />
            your workflow
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            More than just cleanup, an AI-powered system that audits, optimizes, and manages your Gmail and Drive — turning clutter into clarity.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/signup">
              <Button variant="hero" size="lg" className="min-w-[200px]">
                GET STARTED FOR FREE
              </Button>
            </Link>
            <Link to="/docs">
              <Button variant="hero-outline" size="lg" className="min-w-[200px] group">
                EXPLORE DOCS
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
