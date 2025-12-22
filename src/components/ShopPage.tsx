
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
    image: 'https://i.postimg.cc/2S2ZF2ks/here-we-are-2026.png',
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
    badge: 'Pre Order 12/19',
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
      {/* 1. HERO SECTION (Redesigned for Mobile) */}
      <section className="relative overflow-hidden">
        {/* Desktop Hero (md and up) */}
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
          <div className="relative h-[400px] md:h-auto bg-gray-900 overflow-hidden">
            <img 
              src="https://i.postimg.cc/2S2ZF2ks/here-we-are-2026.png" 
              alt="Hero Product" 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-auto object-contain z-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)]"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-gray-900 via-transparent to-transparent"></div>
            <div className="absolute bottom-10 right-10 opacity-20 text-8xl font-black text-white italic select-none">GEAR</div>
          </div>
        </div>

        {/* Mobile Hero (max-md) */}
        <div className="block md:hidden bg-white">
          <div className="w-full h-auto bg-gray-950 p-6 flex justify-center">
            <img 
              src="https://i.postimg.cc/2S2ZF2ks/here-we-are-2026.png" 
              alt="Hero Product" 
              className="w-full max-w-[300px] h-auto object-contain drop-shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
            />
          </div>
          <div className="bg-[#FF8A00] py-8 px-6 text-center text-white">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">
              THE GETMYIDEA GEAR SHOP
            </h1>
            <p className="text-sm font-bold leading-relaxed mb-6">
              Limited runs, pre-orders, pop drops and all-time favorites alike will gather here in our online shop! Be sure to check back regularly and subscribe to our site so you don't miss out!
            </p>
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-[11px] font-black uppercase leading-tight max-w-[280px]">
                DON'T FORGET! CREATE AN ACCOUNT AND LOG IN BEFORE PURCHASE TO CLAIM YOUR 100% DISCOUNT.
              </p>
              <img 
                src="https://i.postimg.cc/6pxC6V7W/bullbucks.png" 
                alt="Promo Bucks" 
                className="w-24 h-auto mt-2" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
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
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Price</h3>
                <div className="flex flex-col items-start gap-4">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under50', label: 'Under $50' },
                    { id: '50to100', label: '$50 – $100' },
                    { id: 'over100', label: 'Above $100' }
                  ].map(p => (
                    <button 
                      key={p.id}
                      onClick={() => setPriceRange(p.id as any)}
                      className={`text-base font-bold transition-all hover:text-primary ${priceRange === p.id ? 'text-white pl-4 border-l-2 border-primary' : 'text-gray-500'}`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* PRODUCTS AREA */}
          <div className="flex-1">
            {/* Toolbar (Redesigned for Mobile) */}
            <div className="flex items-center justify-between mb-8 md:mb-10 pb-6 border-b border-white/10">
              {/* Mobile Filter View */}
              <div className="flex md:hidden w-full gap-2">
                <button 
                  onClick={() => setIsFilterMobileOpen(true)}
                  className="flex-1 border-2 border-white rounded-xl py-3 text-center text-xl font-bold uppercase tracking-tight text-white flex items-center justify-center"
                >
                  Filter
                </button>
                <button 
                  onClick={() => setIsFilterMobileOpen(true)}
                  className="w-16 border-2 border-white rounded-xl py-3 text-center text-white flex items-center justify-center"
                >
                  <ArrowUpDown className="w-6 h-6" />
                </button>
              </div>

              {/* Desktop Sorting */}
              <div className="hidden md:flex items-center gap-6 ml-auto">
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

            {/* PRODUCT GRID (Redesigned for Mobile) */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-12">
                {filteredAndSortedProducts.map(product => {
                  const limitReached = isPromoFullyClaimed && product.price === 0;
                  
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
                               {product.originalPrice > product.price && (
                                 <span className="text-xs font-bold text-gray-400 line-through">
                                   ${product.originalPrice.toFixed(2)}
                                 </span>
                               )}
                            </div>
                            <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-4">
                              {product.category}
                            </p>
                            <button 
                              onClick={() => handleClaim(product)}
                              disabled={limitReached}
                              className={`w-full py-3 rounded-md text-[10px] font-black tracking-[0.2em] uppercase transition-all shadow-md
                                ${limitReached 
                                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                  : 'bg-primary text-white hover:bg-brandPurple active:scale-95'}`}
                            >
                              {limitReached ? 'Offer Ended' : (product.price === 0 ? 'Claim 100% OFF' : 'Add to Bag')}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Mobile Card Style (matching BullAirs Screenshot) */}
                      <div className="flex md:hidden flex-col bg-white border-[4px] border-[#A020F0] rounded-sm overflow-hidden relative min-h-[380px]">
                        {/* Badge full width at top */}
                        <div className="w-full bg-[#C1272D] text-white py-2 text-[10px] font-black uppercase text-center tracking-tighter">
                          {product.badge}
                        </div>
                        
                        <div className="flex-1 flex items-center justify-center p-4">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-32 object-contain"
                          />
                        </div>

                        <div className="p-3 text-center space-y-2">
                          {product.edition && (
                            <p className="text-[9px] font-black text-gray-900 uppercase tracking-tighter">
                              {product.edition}
                            </p>
                          )}
                          <h3 className="text-[11px] font-black text-gray-900 uppercase leading-none min-h-[2rem]">
                            {product.name}
                          </h3>
                          <p className="text-lg font-black text-[#80FF00] italic leading-none pt-1">
                            ${product.price.toFixed(2)}
                          </p>
                          <button 
                            onClick={() => handleClaim(product)}
                            disabled={limitReached}
                            className={`w-full py-2.5 bg-[#CCCCCC] text-white text-[12px] font-bold uppercase rounded-sm mt-2
                              ${limitReached ? 'opacity-50' : 'hover:bg-primary'}`}
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
                <p className="text-gray-600 mt-2">Try adjusting your filters.</p>
                <button 
                  onClick={() => { setSelectedCategory('all'); setPriceRange('all'); }}
                  className="mt-6 text-primary font-black uppercase tracking-widest text-xs hover:underline"
                >
                  Reset Filters
                </button>
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
               <div className="space-y-6">
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Price</h3>
                 <div className="flex flex-col items-start gap-4">
                   {[
                     { id: 'all', label: 'All Prices' },
                     { id: 'under50', label: 'Under $50' },
                     { id: '50to100', label: '$50 – $100' },
                     { id: 'over100', label: 'Above $100' }
                   ].map(p => (
                     <button 
                       key={p.id}
                       onClick={() => { setPriceRange(p.id as any); setIsFilterMobileOpen(false); }}
                       className={`text-lg font-bold transition-all ${priceRange === p.id ? 'text-primary' : 'text-gray-400'}`}
                     >
                       {p.label}
                     </button>
                   ))}
                 </div>
               </div>
             </div>
             <div className="mt-auto">
               <button 
                onClick={() => setIsFilterMobileOpen(false)}
                className="w-full py-4 bg-primary text-white font-black uppercase tracking-widest rounded-md"
               >
                 View Results
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
