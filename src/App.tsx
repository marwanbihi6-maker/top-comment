
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Logo } from './components/Logo';
import { CheckoutPage } from './components/CheckoutPage';
import { PromoModal } from './components/PromoModal';
import { LatestShowcase } from './components/LatestShowcase';
import { ShopPage } from './components/ShopPage';

type ViewState = 'home' | 'shop' | 'checkout';
export type CategoryType = 'all' | 'Hoodie' | 'T-Shirt';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [currentCategory, setCurrentCategory] = useState<CategoryType>('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showPromoModal, setShowPromoModal] = useState(false);

  useEffect(() => {
    const hasSeenPromo = localStorage.getItem('getmyidea_promo_dismissed');
    if (!hasSeenPromo) {
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
    setView('shop');
    window.scrollTo(0, 0);
  };

  const handleClaimProduct = (product: any) => {
    setSelectedProduct(product);
    setView('checkout');
    window.scrollTo(0, 0);
  };

  const handleBackToShop = () => {
    setView('shop');
    setSelectedProduct(null);
  };

  const handleCategoryChange = (category: CategoryType) => {
    setCurrentCategory(category);
    setView('shop');
    window.scrollTo(0, 0);
  };

  const handleConfirmOrder = (details: any) => {
    // This function is still passed but the actual redirect logic is in CheckoutPage now
    alert(`Success! Proceeding to payment for "${selectedProduct.name}".`);
  };

  const handleGoToHome = () => {
    setView('home');
    setCurrentCategory('all');
    window.scrollTo(0, 0);
  };

  const handleGoToShop = () => {
    setView('shop');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-primary selection:text-white">
      <Navbar 
        onCategorySelect={handleCategoryChange} 
        activeCategory={currentCategory} 
        onLogoClick={handleGoToHome}
      />
      
      <main>
        {view === 'home' && (
          <>
            <Hero onShopClick={handleGoToShop} />
            <div id="shop">
              <LatestShowcase onShopNowClick={handleGoToShop} />
            </div>
          </>
        )}

        {view === 'shop' && (
          <ShopPage 
            onClaimProduct={handleClaimProduct} 
            initialCategory={currentCategory}
          />
        )}

        {view === 'checkout' && (
          <CheckoutPage 
            product={selectedProduct} 
            onBack={handleBackToShop} 
            onConfirm={handleConfirmOrder} 
          />
        )}
      </main>

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
