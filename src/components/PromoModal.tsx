
import React, { useEffect, useState } from 'react';
import { X, Gift } from 'lucide-react';
import { Button } from './Button';

interface PromoModalProps {
  onClose: () => void;
  onAction: () => void;
}

export const PromoModal: React.FC<PromoModalProps> = ({ onClose, onAction }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation slightly after mount
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for exit animation
  };

  const handleAction = () => {
    setIsVisible(false);
    setTimeout(onAction, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div 
        className={`relative w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
          isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'
        }`}
      >
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 blur-[60px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2" />

        <div className="relative p-8 text-center flex flex-col items-center">
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 flex items-center justify-center mb-6 shadow-inner relative group">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <Gift className="w-8 h-8 text-primary relative z-10" />
          </div>

          {/* Text Content */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
            Congratulations!
          </h2>
          <p className="text-gray-300 text-base mb-8 leading-relaxed max-w-sm">
            You're eligible for a <span className="text-white font-semibold">100% Discount</span> on premium hoodies & t-shirts. 
            <span className="block mt-2 text-sm text-gray-500">Limited to the first 10 visitors today.</span>
          </p>

          {/* CTA */}
          <Button 
            onClick={handleAction} 
            size="lg" 
            className="w-full shadow-lg shadow-primary/25"
          >
            Explore Designs
          </Button>
        </div>
      </div>
    </div>
  );
};
