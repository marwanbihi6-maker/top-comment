
import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, Filter, X, ShoppingBag, AlertCircle, ArrowUpDown, Sparkles, Zap, Timer, LayoutGrid } from 'lucide-react';
import { CategoryType } from '../App';

// Product Data - Enhanced with more metadata for a premium feel
const products = [
  {
    id: 1,
    name: 'National Lampoon - Classy - Premium Steers',
    price: 0.00,
    originalPrice: 200.00,
    category: 'T-Shirt' as CategoryType,
    image: 'https://i.postimg.cc/HksRgXHr/here-we-are-2026.png',
    badge: 'Limited Drop',
    date: '2024-12-24',
    edition: 'ARTIST EDITION',
    tagColor: 'bg-primary'
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
    edition: 'PREMIUM SERIES',
    tagColor: 'bg-brandPurple'
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
    edition: 'SIGNATURE DROP',
    tagColor: 'bg-yellow-500'
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
    edition: 'SPECIAL RELEASE',
    tagColor: 'bg-red-600'
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
    edition: 'CORE COLLECTION',
    tagColor: 'bg-blue-600'
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
    edition: 'ESSENTIALS',
    tagColor: 'bg-gray-600'
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
      <section className="relative overflow-hidden border-b border-white/5 bg-gray-950 py-12 lg:py-0">
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brandPurple/10 blur-[120px] rounded-full animate-pulse delay-700"></div>

        {/* Desktop Hero Content */}
        <div className="hidden lg:grid grid-cols-2 min-h-[650px] max-w-[1600px] mx-auto px-12">
          {/* Left Text Block */}
          <div className="flex flex-col justify-center z-10 text-white py-24">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-[3px] w-12 bg-primary"></span>
              <span className="text-primary font-black tracking-[0.4em] text-xs uppercase italic">Direct From Studio</span>
            </div>
            <h1 className="text-6xl lg:text-[100px] font-black italic uppercase leading-[0.8] mb-10 tracking-tighter">
              GEAR <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-brandPurple to-white">COLLECTIVE</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-md mb-12 font-medium leading-relaxed border-l-2 border-white/10 pl-6">
              Exclusive artist drops and limited run streetwear essentials. Secure yours before the timer runs out.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="bg-white/5 border border-white/10 px-8 py-5 rounded-2xl flex items-center gap-5 backdrop-blur-xl group hover:border-primary/50 transition-all cursor-default">
                 <div className="relative">
                   <div className="absolute inset-0 bg-primary blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                   <Zap className="w-6 h-6 text-primary fill-current relative" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-xs font-black uppercase tracking-widest text-white leading-tight">Exclusive Benefit</span>
                   <span className="text-primary text-sm font-bold">100% Off for Early Access</span>
                 </div>
              </div>

              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-950 bg-gray-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-gray-950 bg-primary flex items-center justify-center text-[10px] font-bold text-white">
                  +2k
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Visual Section (Floating Composition) */}
          <div className="relative h-full flex items-center justify-center overflow-visible">
            <div className="relative w-full aspect-square max-w-[600px] flex items-center justify-center">
              {/* Back Item Left */}
              <div className="absolute left-[0%] top-[15%] w-[45%] z-10 transition-all duration-700 hover:scale-105 hover:-translate-y-2 opacity-60" 
                   style={{ transform: 'rotate(-12deg)' }}>
                <img src="https://i.postimg.cc/X7hMG0Fh/here-we-are-2026-(1).png" alt="Product" className="w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] rounded-3xl" />
              </div>
              
              {/* Back Item Right */}
              <div className="absolute right-[0%] bottom-[15%] w-[45%] z-10 transition-all duration-700 hover:scale-105 hover:-translate-y-2 opacity-60" 
                   style={{ transform: 'rotate(12deg)' }}>
                <img src="https://i.postimg.cc/0ywLWLY3/here-we-are-2026-(2).png" alt="Product" className="w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] rounded-3xl" />
              </div>

              {/* Center Main Hero */}
              <div className="absolute w-[65%] z-20 animate-float">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <img 
                    src="https://i.postimg.cc/HksRgXHr/here-we-are-2026.png" 
                    alt="Main Product"
                    className="w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)] relative z-10 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Hero */}
        <div className="block lg:hidden px-6">
          <div className="w-full flex flex-col items-center">
             <div className="relative w-full max-w-[340px] mb-12">
               <div className="absolute inset-0 bg-primary/10 blur-[60px] rounded-full"></div>
               <img 
                 src="https://i.postimg.cc/HksRgXHr/here-we-are-2026.png" 
                 alt="Featured Product" 
                 className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)] relative z-10" 
               />
             </div>
             <div className="text-center w-full">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  <span className="text-primary font-black uppercase text-[10px] tracking-widest italic">Live Drops</span>
                </div>
                <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 italic leading-none text-white">
                  GEAR <span className="text-primary">SHOP</span>
                </h1>
                <p className="text-sm font-medium text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
                  Limited series apparel designed by our community. Claim your 100% discount before they're gone.
                </p>
                <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md mb-8">
                  <Timer className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    Drop ends soon
                  </span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SHOP CONTENT */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-12 py-16 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* SIDEBAR - DESKTOP */}
          <aside className="hidden lg:block w-[280px] shrink-0 sticky top-32 h-fit">
            <div className="space-y-16">
              {/* Category Filter */}
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">Browse</h3>
                  <LayoutGrid className="w-3 h-3 text-gray-600" />
                </div>
                <div className="flex flex-col items-start gap-5">
                  {['all', 'Hoodie', 'T-Shirt'].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat as CategoryType)}
                      className={`text-xl font-bold transition-all hover:pl-2 flex items-center gap-4 ${selectedCategory === cat ? 'text-white' : 'text-gray-500'}`}
                    >
                      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedCategory === cat ? 'bg-primary scale-[2.5] shadow-[0_0_10px_rgba(255,63,142,0.8)]' : 'bg-gray-800'}`}></div>
                      {cat === 'all' ? 'The Collective' : `${cat}s`}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Claim Status Tool */}
              <div className="pt-10 border-t border-white/5">
                <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-[24px] p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                     <Zap className="w-12 h-12 text-primary" />
                   </div>
                   <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Stock Monitor</p>
                   <div className="flex justify-between items-end mb-3">
                      <span className="text-4xl font-black text-white italic tracking-tighter">{PROMO_LIMIT - promoClaimedCount}</span>
                      <span className="text-xs font-bold text-gray-500 mb-2">Items Left</span>
                   </div>
                   <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden shadow-inner mb-4">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-brandPurple transition-all duration-1000 ease-out relative" 
                        style={{ width: `${((PROMO_LIMIT - promoClaimedCount) / PROMO_LIMIT) * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                      </div>
                   </div>
                   <p className="text-[9px] font-bold text-gray-600 leading-tight uppercase tracking-wider">
                     Stock updates live. Reservations are held for 10 minutes once selected.
                   </p>
                </div>
              </div>
            </div>
          </aside>

          {/* PRODUCTS AREA */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white italic">
                  New <span className="text-primary">Drops</span>
                </h2>
                <div className="flex items-center gap-2 bg-gray-900 border border-white/5 px-4 py-2 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{filteredAndSortedProducts.length} Exclusive Items</span>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Mobile Filter Toggle */}
                <button 
                  onClick={() => setIsFilterMobileOpen(true)}
                  className="flex-1 lg:hidden flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl"
                >
                  <Filter className="w-4 h-4" /> Filter / Sort
                </button>

                {/* Desktop Sorting */}
                <div className="hidden lg:flex items-center gap-5">
                  <div className="flex items-center gap-2 text-gray-500">
                    <ArrowUpDown className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Sort By</span>
                  </div>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-gray-900/50 border border-white/5 text-white text-[11px] font-black uppercase tracking-widest px-5 py-3 rounded-xl focus:outline-none focus:border-primary transition-all cursor-pointer backdrop-blur-md"
                  >
                    <option value="newest">Latest Release</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="nameAZ">Alphabetical</option>
                  </select>
                </div>
              </div>
            </div>

            {/* PRODUCT GRID */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-20 gap-x-10">
                {filteredAndSortedProducts.map(product => {
                  const limitReached = isPromoFullyClaimed;
                  
                  return (
                    <div key={product.id} className="group flex flex-col h-full relative">
                      {/* Product Card Container */}
                      <div className="relative aspect-[4/5] bg-white rounded-[32px] overflow-hidden transition-all duration-500 md:group-hover:-translate-y-3 md:group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-white/5 flex flex-col items-center justify-center">
                        
                        {/* Decorative background circle */}
                        <div className="absolute inset-0 bg-gray-50 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Top Badges */}
                        <div className="absolute top-6 left-6 right-6 z-10 flex flex-wrap gap-2 pointer-events-none">
                           <div className={`px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-white rounded-lg shadow-lg ${limitReached ? 'bg-gray-800' : product.tagColor}`}>
                             {limitReached ? 'Fully Claimed' : product.badge}
                           </div>
                           {!limitReached && product.edition && (
                             <div className="px-4 py-2 text-[8px] font-bold uppercase tracking-widest text-black bg-white/80 backdrop-blur-md rounded-lg shadow-md border border-gray-200">
                               {product.edition}
                             </div>
                           )}
                        </div>

                        {/* Image Container */}
                        <div className="w-[85%] h-[85%] flex items-center justify-center p-6">
                           <img 
                             src={product.image} 
                             alt={product.name} 
                             className="w-full h-full object-contain transition-transform duration-700 ease-out md:group-hover:scale-110 drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                           />
                        </div>

                        {/* Quick View Overlay (Desktop) */}
                        <div className="absolute inset-0 bg-black/5 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-8">
                           {!limitReached ? (
                             <button 
                               onClick={() => handleClaim(product)}
                               className="w-full py-5 bg-black text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl shadow-2xl transform translate-y-10 lg:group-hover:translate-y-0 transition-all duration-500 hover:bg-primary hidden lg:flex items-center justify-center gap-3"
                             >
                               <ShoppingBag className="w-4 h-4" />
                               Secure Reservation
                             </button>
                           ) : (
                             <div className="flex flex-col items-center gap-3 text-gray-800 transform translate-y-10 lg:group-hover:translate-y-0 transition-all duration-500">
                               <AlertCircle className="w-8 h-8" />
                               <span className="font-black text-xs uppercase tracking-widest">Waitlist Only</span>
                             </div>
                           )}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="mt-8 space-y-4 px-2">
                        <div className="flex items-start justify-between">
                           <div className="flex flex-col gap-1">
                             <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] italic">{product.category}</span>
                             <h3 className="text-xl font-black text-white uppercase leading-[1.1] tracking-tighter line-clamp-2">
                               {product.name}
                             </h3>
                           </div>
                           <div className="text-right flex flex-col items-end">
                             <div className="flex items-center gap-3">
                               <span className="text-sm line-through text-gray-600 font-bold tracking-tight">${product.originalPrice.toFixed(0)}</span>
                               <span className="text-2xl font-black text-primary italic leading-none">FREE</span>
                             </div>
                             <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-1">100% Promo Applied</span>
                           </div>
                        </div>
                      </div>

                      {/* Claim Button (Mobile Primary Action) */}
                      <button 
                        onClick={() => handleClaim(product)}
                        disabled={limitReached}
                        className={`mt-8 w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-2xl lg:hidden
                                  ${limitReached ? 'bg-gray-800 text-gray-600 cursor-not-allowed border border-white/5' : 'bg-primary text-white active:scale-95'}`}
                      >
                        {limitReached ? 'Sold Out' : 'Claim Now'}
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-48 bg-gray-900/20 rounded-[40px] border-2 border-white/5 border-dashed">
                <div className="relative mb-10">
                   <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                   <AlertCircle className="w-24 h-24 text-gray-800 relative" />
                </div>
                <h4 className="text-3xl font-black uppercase italic tracking-tighter text-gray-700 mb-4">Stock Exhausted</h4>
                <p className="text-gray-500 font-medium mb-10 max-w-xs text-center">Try adjusting your filters or check back for the next drop.</p>
                <button 
                  onClick={() => setSelectedCategory('all')} 
                  className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all shadow-xl"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MOBILE FILTER OVERLAY */}
      {isFilterMobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setIsFilterMobileOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-gray-950 rounded-t-[48px] p-10 flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-500 max-h-[85vh] border-t border-white/10">
             <div className="w-16 h-1.5 bg-gray-800 rounded-full self-center mb-10 shadow-inner"></div>
             
             <div className="flex items-center justify-between mb-12">
               <div>
                 <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">REFINE</h2>
                 <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Select your preferences</p>
               </div>
               <button onClick={() => setIsFilterMobileOpen(false)} className="p-3 bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-colors">
                 <X className="w-6 h-6" />
               </button>
             </div>
             
             <div className="space-y-12 overflow-y-auto no-scrollbar pb-10">
               {/* Categories */}
               <div className="space-y-6">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">By Category</h3>
                 <div className="flex flex-col gap-3">
                   {['all', 'Hoodie', 'T-Shirt'].map(cat => (
                     <button 
                       key={cat}
                       onClick={() => { setSelectedCategory(cat as CategoryType); setIsFilterMobileOpen(false); }}
                       className={`w-full py-5 rounded-2xl text-lg font-black transition-all border-2 text-left px-8 flex items-center justify-between ${selectedCategory === cat ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' : 'bg-gray-900 border-white/5 text-gray-500'}`}
                     >
                       {cat === 'all' ? 'All Drops' : `${cat}s`}
                       {selectedCategory === cat && <Zap className="w-5 h-5 fill-current" />}
                     </button>
                   ))}
                 </div>
               </div>
               
               {/* Sort Order */}
               <div className="space-y-6">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Display Order</h3>
                 <div className="grid grid-cols-2 gap-4">
                   {[
                     { id: 'newest', label: 'Latest' },
                     { id: 'priceLow', label: 'Lowest Price' },
                     { id: 'priceHigh', label: 'Highest Price' },
                     { id: 'nameAZ', label: 'Name A-Z' }
                   ].map(opt => (
                     <button 
                       key={opt.id}
                       onClick={() => { setSortBy(opt.id as any); setIsFilterMobileOpen(false); }}
                       className={`py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 ${sortBy === opt.id ? 'bg-white text-black border-white shadow-xl' : 'bg-gray-900/50 border-white/5 text-gray-500'}`}
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

      {/* Styles for animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
};
