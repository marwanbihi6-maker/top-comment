
import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, Filter, X, ShoppingBag, AlertCircle, ArrowUpDown } from 'lucide-react';
import { CategoryType } from '../App';

// Product Data
const products = [
  {
    id: 1,
    name: 'National Lampoon - Classy - Premium Steers',
    price: 150.00,
    originalPrice: 200.00,
    category: 'T-Shirt',
    image: 'https://i.postimg.cc/YqXmkz8x/here-we-are-2026.png',
    badge: 'Pre Order 12/24',
    date: '2024-01-01',
    edition: 'NORMAL EDITION'
  },
  {
    id: 2,
    name: 'National Lampoon - Rust Edition Normal Version - Short Horns',
    price: 399.00,
    originalPrice: 450.00,
    category: 'Hoodie',
    image: 'https://i.postimg.cc/X7hMG0Fh/here-we-are-2026-(1).png',
    badge: 'Pre Order 12/24',
    date: '2024-01-05',
    edition: 'NORMAL EDITION'
  },
  {
    id: 3,
    name: 'LeDragon - Signature Tee',
    price: 0.00,
    originalPrice: 48.00,
    category: 'T-Shirt',
    image: 'https://i.postimg.cc/0ywLWLY3/here-we-are-2026-(2).png',
    badge: 'Pre Order 12/24',
    date: '2024-01-02'
  },
  {
    id: 4,
    name: 'GIVEAWAY - RED FLUFFY DROP',
    price: 0.00,
    originalPrice: 95.00,
    category: 'Hoodie',
    image: 'https://i.postimg.cc/hvZR6L82/here-we-are-2026-(6).png',
    badge: 'Low Stock!',
    date: '2024-01-10'
  },
  {
    id: 5,
    name: 'House Project Hoodie',
    price: 0.00,
    originalPrice: 42.00,
    category: 'Hoodie',
    image: 'https://i.postimg.cc/FzHV13tJ/here-we-are-2026-(5).png',
    badge: 'Pre Order',
    date: '2024-01-08'
  },
  {
    id: 6,
    name: 'Jesus is King - Minimalist',
    price: 0.00,
    originalPrice: 88.00,
    category: 'Hoodie',
    image: 'https://i.postimg.cc/GtMwsFHg/here-we-are-2026-(4).png',
    badge: 'Pre Order',
    date: '2024-01-03'
  }
];

interface ShopPageProps {
  onClaimProduct: (product: any) => void;
  initialCategory?: CategoryType;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onClaimProduct, initialCategory = 'all' }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(initialCategory);
  const [priceRange, setPriceRange] = useState<'all' | 'under50' | '50to100' | 'over100'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'priceLow' | 'priceHigh' | 'nameAZ'>('newest');
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);
  const [promoClaimedCount, setPromoClaimedCount] = useState(0);

  const PROMO_LIMIT = 10;

  useEffect(() => {
    const savedCount = localStorage.getItem('getmyidea_promo_claims');
    if (savedCount) {
      setPromoClaimedCount(parseInt(savedCount, 10));
    }
  }, []);

  const isPromoFullyClaimed = promoClaimedCount >= PROMO_LIMIT;

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (priceRange !== 'all') {
      if (priceRange === 'under50') result = result.filter(p => p.price < 50);
      else if (priceRange === '50to100') result = result.filter(p => p.price >= 50 && p.price <= 100);
      else if (priceRange === 'over100') result = result.filter(p => p.price > 100);
    }
    result.sort((a, b) => {
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      if (sortBy === 'nameAZ') return a.name.localeCompare(b.name);
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return result;
  }, [selectedCategory, priceRange, sortBy]);

  const handleClaim = (product: any) => {
    if (isPromoFullyClaimed && product.price === 0) {
      alert("Sorry, the 100% discount offer has just ended.");
      return;
    }
    onClaimProduct(product);
  };

  return (
    <div className="bg-gray-950 pt-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden">
        {/* Desktop & Tablet Hero */}
        <div className="hidden md:grid grid-cols-2 bg-primary">
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-24 z-10 text-white">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black italic uppercase leading-none mb-6 tracking-tighter">
              THE GETMYIDEA <br /> GEAR SHOP
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-lg mb-8 font-medium">
              Limited drops, pre-orders, and exclusive designs all in one place. Check back often so you don't miss out.
            </p>
            <div className="bg-black/20 self-start px-6 py-3 rounded-md backdrop-blur-sm border border-white/10">
               <span className="text-xs md:text-sm font-black uppercase tracking-widest">
                 DON’T FORGET! Claim your 100% discount while it’s still available.
               </span>
            </div>
          </div>
          
          {/* MULTI-PRODUCT COMPOSITION - RIGHT SIDE */}
          <div className="relative h-[450px] md:h-auto bg-[#112250] overflow-hidden flex items-center justify-center p-8 lg:p-12">
            {/* Subtle gradient glow behind images (purple → navy) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.2),#112250_80%)] opacity-70"></div>
            
            {/* 3D Composition Container */}
            <div className="relative w-full max-w-2xl h-full flex items-center justify-center animate-in fade-in duration-700 ease-out fill-mode-forwards">
              {/* Scaling wrapper for tablet responsiveness */}
              <div className="relative w-full h-full flex items-center justify-center md:scale-[0.8] lg:scale-100 transition-transform duration-500">
                
                {/* Left Product: smaller, slightly rotated -8deg, positioned left */}
                <div className="absolute left-[0%] w-[42%] z-10 transition-all duration-500 transform hover:scale-105 -rotate-8 scale-90 opacity-0 animate-in fade-in slide-in-from-left-4 delay-200 fill-mode-forwards">
                  <img 
                    src="https://i.postimg.cc/cLtgXFBZ/here-we-are-2026-(1).png" 
                    alt="Premium Product Left" 
                    className="w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                  />
                </div>

                {/* Right Product: smaller, slightly rotated +8deg, positioned right */}
                <div className="absolute right-[0%] w-[42%] z-10 transition-all duration-500 transform hover:scale-105 rotate-8 scale-90 opacity-0 animate-in fade-in slide-in-from-right-4 delay-200 fill-mode-forwards">
                  <img 
                    src="https://i.postimg.cc/s2z8wNCz/here-we-are-2026-(2).png" 
                    alt="Premium Product Right" 
                    className="w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                  />
                </div>

                {/* Center Product: Featured - largest, no rotation, centered forward */}
                <div className="absolute w-[55%] z-20 transition-all duration-500 transform hover:scale-[1.25] scale-110 opacity-0 animate-in fade-in zoom-in-95 delay-100 fill-mode-forwards">
                  <img 
                    src="https://i.postimg.cc/gjhQMFj3/here-we-are-2026.png" 
                    alt="Featured Product Center" 
                    className="w-full h-auto drop-shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Hero */}
        <div className="block md:hidden">
          <div className="w-full bg-[#112250] p-12 flex items-center justify-center relative overflow-hidden">
            {/* Simple gradient background for mobile */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-[#112250]"></div>
            
            {/* Single Center Item focused for mobile, centered, full width of container */}
            <div className="relative z-10 w-full max-w-sm">
               <img 
                 src="https://i.postimg.cc/gjhQMFj3/here-we-are-2026.png" 
                 alt="Featured Product" 
                 className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-bottom-5 duration-700"
               />
            </div>
          </div>
          <div className="bg-[#F5821F] pt-8 pb-10 px-6 text-center text-white rounded-b-[12px] relative">
            <h1 className="text-[28px] font-black uppercase tracking-tighter mb-3 leading-none">
              THE BULL AIRS GEAR SHOP
            </h1>
            <p className="text-[13px] font-bold leading-relaxed mb-6 px-4">
              Limited runs, pre-orders, pop drops and all-time favorites alike will gather here in our online shop! Be sure to check back regularly and subscribe to our site so you don't miss out!
            </p>
            <div className="relative flex flex-col items-center">
              <p className="text-[10px] font-black uppercase leading-tight max-w-[220px]">
                DON'T FORGET! CREATE AN ACCOUNT AND LOG IN BEFORE PURCHASE TO CLAIM YOUR 100% DISCOUNT.
              </p>
              <img 
                src="https://i.postimg.cc/6pxC6V7W/bullbucks.png" 
                alt="Illustration" 
                className="w-20 h-auto absolute -right-2 top-0 opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SHOP CONTENT */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 py-8 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* SIDEBAR - DESKTOP */}
          <aside className="hidden lg:block w-[280px] shrink-0 sticky top-32 h-fit">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-10 text-white">Filter by</h2>
            <div className="space-y-12">
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Category</h3>
                <div className="flex flex-col items-start gap-4">
                  {['all', 'Hoodie', 'T-Shirt'].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat as CategoryType)}
                      className={`text-base font-bold transition-all hover:text-primary ${selectedCategory === cat ? 'text-white pl-4 border-l-2 border-primary' : 'text-gray-500'}`}
                    >
                      {cat === 'all' ? 'All Products' : `${cat}s`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* PRODUCTS AREA */}
          <div className="flex-1">
            {/* Toolbar (Mobile-Optimized Filter Bar) */}
            <div className="mb-0">
              {/* Mobile Filter View */}
              <div className="flex md:hidden w-full gap-0 bg-white shadow-sm overflow-hidden mb-8 mt-4">
                <button 
                  onClick={() => setIsFilterMobileOpen(true)}
                  className="flex-1 py-4 text-center text-[22px] font-black uppercase tracking-tight text-gray-900 flex items-center justify-center pl-10"
                >
                  Filter
                </button>
                <button 
                  onClick={() => setIsFilterMobileOpen(true)}
                  className="w-16 border-l border-gray-100 py-4 text-gray-900 flex items-center justify-center"
                >
                  <ArrowUpDown className="w-6 h-6" />
                </button>
              </div>

              {/* Desktop Sorting */}
              <div className="hidden md:flex items-center gap-6 ml-auto border-b border-white/10 pb-6 mb-10">
                <div className="relative group">
                  <div className="flex items-center gap-2 cursor-pointer bg-gray-900 px-4 py-2 border border-white/10 rounded-md">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Sort by:</span>
                    <span className="text-xs font-black uppercase tracking-widest text-white">
                      {sortBy === 'newest' && 'Newest First'}
                      {sortBy === 'priceLow' && 'Price: Low-High'}
                      {sortBy === 'priceHigh' && 'Price: High-Low'}
                      {sortBy === 'nameAZ' && 'Name A-Z'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="absolute right-0 top-full mt-2 w-56 bg-gray-900 border border-white/10 rounded-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                    {[
                      { id: 'newest', label: 'Newest First' },
                      { id: 'priceLow', label: 'Price: Low to High' },
                      { id: 'priceHigh', label: 'Price: High to Low' },
                      { id: 'nameAZ', label: 'Name A-Z' }
                    ].map(opt => (
                      <button 
                        key={opt.id}
                        onClick={() => setSortBy(opt.id as any)}
                        className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-colors text-gray-400"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUCT GRID */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[22px] md:gap-x-6 md:gap-y-12 px-[14px] md:px-0 mt-5 md:mt-0">
                {filteredAndSortedProducts.map(product => {
                  const limitReached = isPromoFullyClaimed && product.price === 0;
                  const isPurpleBadge = product.badge.toLowerCase().includes('low') || product.badge.toLowerCase().includes('pre');
                  
                  return (
                    <React.Fragment key={product.id}>
                      {/* Desktop Card Style */}
                      <div className="hidden md:flex group flex-col h-full bg-white border-2 border-brandPurple/20 hover:border-primary/60 rounded-[10px] shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
                        <div className="absolute z-10 top-0 left-0">
                          <div className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white bg-gradient-to-r from-primary to-brandPurple`}>
                            {limitReached ? 'Fully Claimed' : product.badge}
                          </div>
                        </div>
                        <div className="relative aspect-square p-6 md:p-10 bg-white overflow-hidden flex items-center justify-center">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-1 text-center bg-gray-50 border-t border-gray-100">
                          <h3 className="text-sm md:text-base font-black text-gray-900 uppercase tracking-tight mb-2 line-clamp-2 min-h-[2.5rem]">
                            {product.name}
                          </h3>
                          <div className="mt-auto flex flex-col items-center gap-1">
                            <div className="flex items-center gap-2">
                               <span className="text-lg md:text-xl font-black text-primary italic">
                                 ${product.price.toFixed(2)}
                               </span>
                            </div>
                            <button 
                              onClick={() => handleClaim(product)}
                              className="w-full py-3 bg-primary text-white text-[10px] font-black uppercase rounded-md"
                            >
                              Claim Now
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Mobile Card Style */}
                      <div className="flex md:hidden flex-col bg-[#ffffff] border-2 border-[rgba(176,0,255,0.25)] rounded-[16px] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.08)] overflow-hidden relative h-full">
                        {/* Badge top-left */}
                        <div className="absolute top-[10px] left-[10px] z-10">
                          <div className={`py-1 px-2.5 text-[10px] font-semibold uppercase leading-none rounded-[8px] shadow-[0_1px_3px_rgba(0,0,0,0.12)] text-white 
                            ${isPurpleBadge ? 'bg-[#B000FF]' : 'bg-[#E53935]'}`}>
                            {limitReached ? 'Claimed' : product.badge}
                          </div>
                        </div>
                        
                        <div className="flex-1 flex items-center justify-center mb-2.5">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full max-h-[160px] object-contain"
                          />
                        </div>

                        <div className="text-center flex flex-col items-center">
                          <h3 className="text-[13px] font-semibold text-gray-900 leading-[1.4] line-clamp-2 min-h-[2.6rem] uppercase">
                            {product.name}
                          </h3>
                          <p className="text-[15px] font-bold text-[#A3FF00] mt-1.5 mb-2.5">
                            ${product.price.toFixed(2)}
                          </p>
                          <button 
                            onClick={() => handleClaim(product)}
                            disabled={limitReached}
                            className={`w-full py-3 rounded-[12px] text-[13px] font-semibold uppercase transition-all shadow-[0_4px_8px_rgba(0,0,0,0.12)]
                              ${limitReached 
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                : 'bg-[#D32F2F] text-white active:scale-95'}`}
                          >
                            {limitReached ? 'Unavailable' : 'Claim Now'}
                          </button>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-40 bg-gray-900/40 rounded-3xl border border-white/5">
                <AlertCircle className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <h4 className="text-xl font-black uppercase italic tracking-tighter text-gray-500">Nothing found</h4>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MOBILE FILTER OVERLAY */}
      {isFilterMobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsFilterMobileOpen(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-gray-900 p-8 flex flex-col shadow-2xl animate-in slide-in-from-right duration-500">
             <div className="flex items-center justify-between mb-12">
               <h2 className="text-2xl font-black italic uppercase text-white">Filter by</h2>
               <button onClick={() => setIsFilterMobileOpen(false)} className="text-gray-500 hover:text-white">
                 <X className="w-6 h-6" />
               </button>
             </div>
             <div className="space-y-12">
               <div className="space-y-6">
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Category</h3>
                 <div className="flex flex-col items-start gap-4">
                   {['all', 'Hoodie', 'T-Shirt'].map(cat => (
                     <button 
                       key={cat}
                       onClick={() => { setSelectedCategory(cat as CategoryType); setIsFilterMobileOpen(false); }}
                       className={`text-lg font-bold transition-all ${selectedCategory === cat ? 'text-primary' : 'text-gray-400'}`}
                     >
                       {cat === 'all' ? 'All Products' : `${cat}s`}
                     </button>
                   ))}
                 </div>
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
