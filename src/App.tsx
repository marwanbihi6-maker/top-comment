
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Shop } from './components/Shop';
import { Logo } from './components/Logo';
import { CheckoutPage } from './components/CheckoutPage';
import { PromoModal } from './components/PromoModal';

type ViewState = 'home' | 'checkout';
export type CategoryType = 'all' | 'Hoodie' | 'T-Shirt';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [currentCategory, setCurrentCategory] = useState<CategoryType>('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showPromoModal, setShowPromoModal] = useState(false);

  useEffect(() => {
    // Check if user has already seen the modal
    const hasSeenPromo = localStorage.getItem('getmyidea_promo_dismissed');
    
    // Only show if not seen before
    if (!hasSeenPromo) {
      // Delay appearance by 1.5 seconds for better UX
      const timer = setTimeout(() => {
        setShowPromoModal(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismissPromo = () => {
    setShowPromoModal(false);
    localStorage.setItem('getmyidea_promo_dismissed', 'true');
  };

  const handlePromoAction = () => {
    setShowPromoModal(false);
    localStorage.setItem('getmyidea_promo_dismissed', 'true');
    
    // Navigate to home if not there
    if (view !== 'home') {
      setView('home');
    }

    // Scroll to shop section
    setTimeout(() => {
      const shopSection = document.getElementById('shop');
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleClaimProduct = (product: any) => {
    setSelectedProduct(product);
    setView('checkout');
    window.scrollTo(0, 0);
  };

  const handleBackToShop = () => {
    setView('home');
    setSelectedProduct(null);
  };

  const handleCategoryChange = (category: CategoryType) => {
    setCurrentCategory(category);
    setView('home');
    
    // Scroll to shop after a small delay to ensure view update
    setTimeout(() => {
      const shopSection = document.getElementById('shop');
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleConfirmOrder = (details: any) => {
    // 1. Check existing limit in localStorage again to prevent race conditions
    const savedCount = localStorage.getItem('getmyidea_promo_claims');
    const currentCount = savedCount ? parseInt(savedCount, 10) : 0;
    const PROMO_LIMIT = 10;

    if (currentCount >= PROMO_LIMIT) {
      alert("We are sorry! The last item was just claimed by another user while you were filling out the form.");
      setView('home');
      setSelectedProduct(null);
      return;
    }

    // 2. Increment and save
    const newCount = currentCount + 1;
    localStorage.setItem('getmyidea_promo_claims', newCount.toString());

    // 3. Success Feedback
    alert(`🎉 Success! Your item "${selectedProduct.name}" has been reserved! We will ship it to ${details.fullName}.`);
    
    // 4. Reset
    setView('home');
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-primary selection:text-white">
      <Navbar onCategorySelect={handleCategoryChange} activeCategory={currentCategory} />
      
      <main>
        {view === 'home' ? (
          <>
            {currentCategory === 'all' && <Hero />}
            <Shop 
              onClaimProduct={handleClaimProduct} 
              filterCategory={currentCategory}
              onCategoryChange={handleCategoryChange}
            />
          </>
        ) : (
          <CheckoutPage 
            product={selectedProduct} 
            onBack={handleBackToShop} 
            onConfirm={handleConfirmOrder} 
          />
        )}
      </main>

      {/* Welcome Promotion Modal */}
      {showPromoModal && (
        <PromoModal 
          onClose={handleDismissPromo}
          onAction={handlePromoAction}
        />
      )}
      
      <footer className="py-12 border-t border-white/10 bg-gray-900 text-center">
        <div className="flex flex-col items-center justify-center mb-4 group cursor-default">
          <Logo className="text-2xl" />
        </div>
        <p className="text-gray-500 text-sm">&copy; 2024 GetMyIdea. All rights reserved.</p>
      </footer>
    </div>
  );
}
