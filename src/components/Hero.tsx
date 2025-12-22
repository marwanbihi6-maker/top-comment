
import React, { useEffect, useState } from 'react';
import { ArrowRight, Star, ShieldCheck } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  onShopClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center bg-gray-900 overflow-x-hidden lg:overflow-hidden pt-24 pb-8 lg:py-0">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.postimg.cc/26wsrrMS/Black-and-Purple-Modern-Programming-Presentation-(1).png" 
          alt="Abstract Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-20">
          
          {/* Left Column: Content */}
          <div className={`flex-1 space-y-5 lg:space-y-8 max-w-2xl transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] sm:text-sm font-semibold text-primary animate-pulse">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary"></span>
              100% OFF STOREWIDE - LIMITED DROP
            </div>

            <h1 className="text-[36px] leading-[40px] sm:text-5xl lg:text-7xl font-extrabold tracking-tight lg:leading-[1.1] text-white">
              We Create Premium <br className="hidden lg:block" />
              <span className="inline-block px-4 py-2 my-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white transform -skew-x-6 rounded-md">
                Hoodie & T-Shirt
              </span> <br className="hidden lg:block" />
              Designs.
            </h1>

            <p className="text-sm sm:text-lg text-gray-300 leading-relaxed max-w-lg">
              Elevate your style with our exclusive collection of print-on-demand streetwear. 
              High-quality fabrics, unique artist designs, and sustainable production.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-center pt-2 w-full sm:w-auto">
              <Button onClick={onShopClick} size="md" className="group w-full sm:w-auto py-3 text-sm md:px-8 md:py-4 md:text-lg">
                Shop Now 
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button onClick={onShopClick} variant="outline" size="md" className="w-full sm:w-auto py-3 text-sm md:px-8 md:py-4 md:text-lg">
                View Lookbook
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-4 sm:pt-8 border-t border-white/10">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-yellow-400 mb-1">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium">4.9/5 from 2k+ reviews</span>
              </div>
              <div className="hidden sm:block w-px h-10 bg-white/10"></div>
              <div className="flex items-center gap-3">
                <div className="p-1.5 sm:p-2 bg-white/5 rounded-lg">
                   <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">Premium Quality</span>
                  <span className="text-[10px] sm:text-xs text-gray-400">100% Cotton Blends</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visuals */}
          <div className={`flex-1 relative w-full min-h-[320px] sm:min-h-[500px] lg:h-auto flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 transform ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} mt-4 lg:mt-0`}>
            <div className="relative w-full max-w-[340px] sm:max-w-[500px] lg:max-w-[650px] aspect-square flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="w-[90%] h-[90%] border border-white/10 rounded-[40px] rotate-6 transform transition-transform duration-[10s] hover:rotate-12"></div>
                <div className="absolute w-[85%] h-[85%] border border-white/5 rounded-[40px] -rotate-3"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/20 blur-[100px] rounded-full"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 w-[48%] lg:w-[46%] transition-all duration-500 ease-out z-10 -translate-y-[60%] translate-x-[15%] rotate-6 opacity-80 hover:z-40 hover:scale-105 hover:opacity-100 hover:rotate-0">
                <img src="https://i.postimg.cc/X7hMG0Fh/here-we-are-2026-(1).png" alt="Streetwear Hoodie" className="w-full h-auto rounded-2xl sm:rounded-3xl shadow-xl border border-white/5" />
              </div>
              <div className="absolute top-1/2 left-1/2 w-[45%] lg:w-[44%] transition-all duration-500 ease-out z-20 -translate-y-[50%] -translate-x-[115%] -rotate-6 opacity-90 hover:z-40 hover:scale-105 hover:opacity-100 hover:rotate-0">
                <img src="https://i.postimg.cc/0ywLWLY3/here-we-are-2026-(2).png" alt="Streetwear Tee" className="w-full h-auto rounded-2xl sm:rounded-3xl shadow-xl border border-white/5" />
              </div>
              <div className="absolute top-1/2 left-1/2 w-[60%] lg:w-[55%] transition-all duration-500 ease-out z-30 -translate-x-1/2 -translate-y-1/2 hover:scale-105">
                <img src="https://i.postimg.cc/2S2ZF2ks/here-we-are-2026.png" alt="Premium T-Shirt" className="w-full h-auto rounded-2xl sm:rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border border-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
