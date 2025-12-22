
import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, Filter, X, ShoppingBag, AlertCircle, ArrowUpDown, Sparkles, Zap } from 'lucide-react';
import { CategoryType } from '../App';

// Product Data - Enhanced with more metadata for a premium feel
const products = [
  {
    id: 1,
    name: 'National Lampoon - Classy - Premium Steers',
    price: 0.00,
    originalPrice: 200.00,
    category: 'T-Shirt' as CategoryType,
    image: 'https://i.postimg.cc/YqXmkz8x/here-we-are-2026.png',
    badge: 'Limited Drop',
    date: '2024-12-24',
    edition: 'ARTIST EDITION'
  },
  {
    id: 2,
    name: 'Neon Genesis - Streetwear Hoodie (Deep Purple)',
    price: 0.00,
    originalPrice: 450.00,
    category: 'Hoodie' as CategoryType,
    image: 'https://i.postimg.cc/X7hMG0Fh/here-we-are-2026-(1).png',
    badge: 'Pre-Order',
    date: '2024-12-25',
    edition: 'PREMIUM SERIES'
  },
  {
    id: 3,
    name: 'LeDragon - Signature Heavyweight Tee',
    price: 0.00,
    originalPrice: 48.00,
    category: 'T-Shirt' as CategoryType,
    image: 'https://i.postimg.cc/0ywLWLY3/here-we-are-2026-(2).png',
    badge: 'Best Seller',
    date: '2024-01-02',
    edition: 'SIGNATURE DROP'
  },
  {
    id: 4,
    name: 'GIVEAWAY - RED FLUFFY STREETWEAR',
    price: 0.00,
    originalPrice: 95.00,
    category: 'Hoodie' as CategoryType,
    image: 'https://i.postimg.cc/hvZR6L82/here-we-are-2026-(6).png',
    badge: 'Rare Find',
    date: '2024-01-10',
    edition: 'SPECIAL RELEASE'
  },
  {
    id: 5,
    name: 'Cyberpunk District Hoodie v2.0',
    price: 0.00,
    originalPrice: 85.00,
    category: 'Hoodie' as CategoryType,
    image: 'https://i.postimg.cc/FzHV13tJ/here-we-are-2026-(5).png',
    badge: 'Flash Drop',
    date: '2024-01-08',
    edition: 'CORE COLLECTION'
  },
  {
    id: 6,
    name: 'Jesus is King - Minimalist Comfort Tee',
    price: 0.00,
    originalPrice: 88.00,
    category: 'Hoodie' as CategoryType,
    image: 'https://i.postimg.cc/GtMwsFHg/here-we-are-2026-(4).png',
    badge: 'Popular',
    date: '2024-01-03',
    edition: 'ESSENTIALS'
  }
];

interface ShopPageProps {
  onClaimProduct: (product: any) => void;
  initialCategory?: CategoryType;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onClaimProduct, initialCategory = 'all' }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(initialCategory);
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
    result.sort((a, b) => {
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      if (sortBy === 'nameAZ') return a.name.localeCompare(b.name);
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return result;
  }, [selectedCategory, sortBy]);

  const handleClaim = (product: any) => {
    if (isPromoFullyClaimed) {
      alert("Sorry, the 100% discount offer has just ended.");
      return;
    }
    onClaimProduct(product);
  };

  return (
    <div className="bg-gray-950 pt-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-white/5 bg-gray-950">
        {/* Desktop Hero (lg: screens >= 1024px) */}
        <div className="hidden lg:grid grid-cols-2 min-h-[600px]">
          {/* Left Text Block */}
          <div className="flex flex-col justify-center p-12 lg:p-24 z-10 text-white relative">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-[2px] w-8 bg-primary"></span>
              <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase">Premium Gear</span>
            </div>
            <h1 className="text-5xl lg:text-8xl font-black italic uppercase leading-[0.85] mb-8 tracking-tighter">
              THE <span className="text-primary">GEAR</span> <br /> 
              <span className="text-white">COLLECTIVE</span>
            </h1>
            <p className="text-lg opacity-60 max-w-md mb-10 font-medium leading-relaxed">
              Curated limited drops, exclusive artist collaborations, and streetwear essentials. Designed for the bold.
            </p>
            <div className="flex items-center gap-4">
              <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-xl flex items-center gap-4 backdrop-blur-md">
                 <Zap className="w-5 h-5 text-primary fill-current" />
                 <span className="text-xs font-black uppercase tracking-widest leading-tight">
                   Claim your 100% discount <br /> <span className="text-primary">Limited quantities left</span>
                 </span>
              </div>
            </div>
          </div>
          
          {/* Right Visual Section (3-Product Composition) */}
          <div className="relative h-full flex items-center justify-center overflow-visible">
            <div className="relative w-full h-full max-w-[700px] flex items-center justify-center">
              {/* Left Item */}
              <div className="absolute left-[5%] w-[40%] z-10 transition-transform duration-500 hover:scale-95" style={{ transform: 'rotate(-6deg) scale(0.9)' }}>
                <img 
                  src="https://i.postimg.cc/cLtgXFBZ/here-we-are-2026-(1).png" 
                  alt="Product Left"
                  className="w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                />
              </div>
              
              {/* Right Item */}
              <div className="absolute right-[5%] w-[40%] z-10 transition-transform duration-500 hover:scale-95" style={{ transform: 'rotate(6deg) scale(0.9)' }}>
                <img 
                  src="https://i.postimg.cc/s2z8wNCz/here-we-are-2026-(2).png" 
                  alt="Product Right"
                  className="w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Center Item */}
              <div className="absolute w-[50%] z-20 transition-transform duration-500 hover:scale-[1.15]" style={{ transform: 'scale(1.1)' }}>
                <img 
                  src="https://i.postimg.cc/gjhQMFj3/here-we-are-2026.png" 
                  alt="Product Center"
                  className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Hero (screens < 1024px) */}
        <div className="block lg:hidden">
          <div className="w-full bg-gray-950 p-12 flex items-center justify-center">
             <img 
               src="https://i.postimg.cc/gjhQMFj3/here-we-are-2026.png" 
               alt="Featured Product" 
               className="w-full max-w-[320px] h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)]" 
             />
          </div>
          <div className="bg-primary pt-8 pb-10 px-8 text-center text-white relative">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 italic leading-none">
              THE <span className="text-black">GEAR</span> SHOP
            </h1>
            <p className="text-xs font-bold leading-relaxed mb-6 opacity-80">
              Limited runs, pre-orders, and all-time favorites. Join the collective before the drop ends.
            </p>
            <div className="inline-flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full border border-white/10">
              <Sparkles className="w-3 h-3 text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                CLAIM YOUR 100% OFF NOW
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SHOP CONTENT */}
      <section className="max-w-[1600px] mx-auto px-6 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* SIDEBAR - DESKTOP */}
          <aside className="hidden lg:block w-[240px] shrink-0 sticky top-32 h-fit">
            <div className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                  <Filter className="w-3 h-3" /> Filters
                </h3>
                <div className="flex flex-col items-start gap-4">
                  {['all', 'Hoodie', 'T-Shirt'].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat as CategoryType)}
                      className={`text-lg font-bold transition-all hover:text-white flex items-center gap-3 ${selectedCategory === cat ? 'text-white' : 'text-gray-500'}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full transition-all ${selectedCategory === cat ? 'bg-primary scale-150' : 'bg-transparent border border-gray-700'}`}></span>
                      {cat === 'all' ? 'View All' : `${cat}s`}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-8 border-t border-white/5">
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                   <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Claim Status</p>
                   <div className="flex justify-between items-end mb-1">
                      <span className="text-2xl font-black text-white">{promoClaimedCount}</span>
                      <span className="text-xs font-medium text-gray-500 mb-1">/ {PROMO_LIMIT} claimed</span>
                   </div>
                   <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500" 
                        style={{ width: `${(promoClaimedCount / PROMO_LIMIT) * 100}%` }}
                      ></div>
                   </div>
                </div>
              </div>
            </div>
          </aside>

          {/* PRODUCTS AREA */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl lg:text-4xl font-black uppercase tracking-tight text-white italic">
                  Latest <span className="text-primary">Drops</span>
                </h2>
                <div className="hidden lg:flex items-center bg-gray-900 border border-white/10 px-3 py-1 rounded-full">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{filteredAndSortedProducts.length} Results</span>
                </div>
              </div>

              {/* Mobile Filter Toggle */}
              <button 
                onClick={() => setIsFilterMobileOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-bold text-sm uppercase tracking-wide"
              >
                <Filter className="w-4 h-4" /> Filter
              </button>

              {/* Desktop Sorting */}
              <div className="hidden lg:flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Sort By</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-gray-900 border border-white/10 text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="priceLow">Price: Low-High</option>
                  <option value="priceHigh">Price: High-Low</option>
                  <option value="nameAZ">Name A-Z</option>
                </select>
              </div>
            </div>

            {/* PRODUCT GRID */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
                {filteredAndSortedProducts.map(product => {
                  const limitReached = isPromoFullyClaimed;
                  
                  return (
                    <div key={product.id} className="group flex flex-col h-full relative">
                      {/* Product Card Container */}
                      <div className="relative aspect-[4/5] bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,63,142,0.1)] border border-white/5">
                        
                        {/* Tags & Badges */}
                        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                           <div className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white rounded-lg shadow-lg ${limitReached ? 'bg-gray-800' : 'bg-primary'}`}>
                             {limitReached ? 'Sold Out' : product.badge}
                           </div>
                           {product.edition && (
                             <div className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-black bg-white/90 backdrop-blur-md rounded-lg shadow-md border border-gray-200">
                               {product.edition}
                             </div>
                           )}
                        </div>

                        {/* Image */}
                        <div className="w-full h-full flex items-center justify-center p-8 lg:p-12">
                           <img 
                             src={product.image} 
                             alt={product.name} 
                             className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                           />
                        </div>

                        {/* Hover Quick Action */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                           {!limitReached && (
                             <button 
                               onClick={() => handleClaim(product)}
                               className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary hover:text-white"
                             >
                               Claim 100% OFF
                             </button>
                           )}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="mt-6 space-y-2">
                        <div className="flex items-center justify-between">
                           <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{product.category}</span>
                           <div className="flex items-center gap-2">
                             <span className="text-sm line-through text-gray-600 font-medium">${product.originalPrice.toFixed(0)}</span>
                             <span className="text-lg font-black text-primary italic">FREE</span>
                           </div>
                        </div>
                        <h3 className="text-base lg:text-lg font-black text-white uppercase leading-tight tracking-tight line-clamp-2">
                          {product.name}
                        </h3>
                      </div>

                      {/* Mobile Only Button */}
                      <button 
                        onClick={() => handleClaim(product)}
                        disabled={limitReached}
                        className={`mt-4 lg:hidden w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${limitReached ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-primary text-white active:scale-95 shadow-lg shadow-primary/20'}`}
                      >
                        {limitReached ? 'Unavailable' : 'Claim Now'}
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 bg-gray-900/40 rounded-3xl border border-white/5 border-dashed">
                <AlertCircle className="w-16 h-16 text-gray-800 mb-6" />
                <h4 className="text-2xl font-black uppercase italic tracking-tighter text-gray-600">No Gear Found</h4>
                <button onClick={() => setSelectedCategory('all')} className="mt-4 text-primary font-bold uppercase tracking-widest hover:underline text-sm">Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MOBILE FILTER OVERLAY */}
      {isFilterMobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsFilterMobileOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-[40px] p-10 flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-500 max-h-[80vh]">
             <div className="w-12 h-1 bg-gray-800 rounded-full self-center mb-10"></div>
             <div className="flex items-center justify-between mb-12">
               <h2 className="text-3xl font-black italic uppercase text-white">Refine</h2>
               <button onClick={() => setIsFilterMobileOpen(false)} className="text-gray-500">
                 <X className="w-8 h-8" />
               </button>
             </div>
             
             <div className="space-y-12 overflow-y-auto">
               <div className="space-y-6">
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">By Category</h3>
                 <div className="grid grid-cols-1 gap-4">
                   {['all', 'Hoodie', 'T-Shirt'].map(cat => (
                     <button 
                       key={cat}
                       onClick={() => { setSelectedCategory(cat as CategoryType); setIsFilterMobileOpen(false); }}
                       className={`w-full py-5 rounded-2xl text-xl font-bold transition-all border ${selectedCategory === cat ? 'bg-primary border-primary text-white' : 'bg-gray-800/50 border-white/5 text-gray-400'}`}
                     >
                       {cat === 'all' ? 'All Products' : `${cat}s`}
                     </button>
                   ))}
                 </div>
               </div>
               
               <div className="space-y-6 pb-10">
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Sort Order</h3>
                 <div className="grid grid-cols-2 gap-3">
                   {[
                     { id: 'newest', label: 'Newest' },
                     { id: 'priceLow', label: '$ Low' },
                     { id: 'priceHigh', label: '$ High' },
                     { id: 'nameAZ', label: 'A-Z' }
                   ].map(opt => (
                     <button 
                       key={opt.id}
                       onClick={() => { setSortBy(opt.id as any); setIsFilterMobileOpen(false); }}
                       className={`py-4 rounded-xl text-xs font-black uppercase tracking-widest border ${sortBy === opt.id ? 'bg-white text-black border-white' : 'bg-gray-800/30 border-white/5 text-gray-500'}`}
                     >
                       {opt.label}
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
