import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, Heart, AlertCircle, LayoutGrid } from 'lucide-react';
import { CategoryType } from '../App';

const products = [
  {
    id: 1,
    name: 'Here we are 2026',
    price: '$0.00',
    originalPrice: '$45.00',
    category: 'T-Shirt',
    image: 'https://i.postimg.cc/2S2ZF2ks/here-we-are-2026.png'
  },
  {
    id: 2,
    name: 'mr penis',
    price: '$0.00',
    originalPrice: '$85.00',
    category: 'Hoodie',
    image: 'https://i.postimg.cc/X7hMG0Fh/here-we-are-2026-(1).png'
  },
  {
    id: 3,
    name: 'ledragon',
    price: '$0.00',
    originalPrice: '$48.00',
    category: 'T-Shirt',
    image: 'https://i.postimg.cc/0ywLWLY3/here-we-are-2026-(2).png'
  },
  {
    id: 4,
    name: 'ANGRY AFRICAN DAD Gets SCAMMED',
    price: '$0.00',
    originalPrice: '$95.00',
    category: 'Hoodie',
    image: 'https://i.postimg.cc/hvZR6L82/here-we-are-2026-(6).png'
  },
  {
    id: 5,
    name: 'house',
    price: '$0.00',
    originalPrice: '$42.00',
    category: 'Hoodie',
    image: 'https://i.postimg.cc/FzHV13tJ/here-we-are-2026-(5).png'
  },
  {
    id: 6,
    name: 'JESUS IS KING',
    price: '$0.00',
    originalPrice: '$88.00',
    category: 'Hoodie',
    image: 'https://i.postimg.cc/GtMwsFHg/here-we-are-2026-(4).png'
  },
  {
    id: 7,
    name: 'Jane Doe',
    price: '$0.00',
    originalPrice: '$85.00',
    category: 'Hoodie',
    image: 'https://i.postimg.cc/hjmz4PyC/here-we-are-2026-(8).png'
  },
  {
    id: 8,
    name: 'Miyabi head scratches',
    price: '$0.00',
    originalPrice: '$85.00',
    category: 'Hoodie',
    image: 'https://i.postimg.cc/JhjL8s8S/here-we-are-2026-(9).png'
  },
  {
    id: 9,
    name: 'Office Dancing Zone',
    price: '$0.00',
    originalPrice: '$85.00',
    category: 'Hoodie',
    image: 'https://i.postimg.cc/MpvB9SwG/here-we-are-2026-(11).png'
  }
];

interface ShopProps {
  onClaimProduct?: (product: any) => void;
  filterCategory?: CategoryType;
  onCategoryChange?: (category: CategoryType) => void;
}

const ProductCard: React.FC<{ 
  product: typeof products[0], 
  limitReached: boolean, 
  onClaim: (product: any) => void 
}> = ({ product, limitReached, onClaim }) => {
  return (
    <div className="group relative flex flex-col w-full max-w-[320px] md:max-w-none snap-center shrink-0">
      {/* Outer Card Wrapper with BullAirs Border Style */}
      <div className="relative p-2 rounded-xl-card transition-all duration-500 ease-out 
                      border-2 border-primary/10 hover:border-brandPurple/60 
                      bg-gray-800/20 backdrop-blur-sm shadow-xl hover:scale-[1.03]">
        
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-[14px] bg-gray-900 mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          
          {/* BullAirs Style Rectangular Badge */}
          <div className="absolute top-0 left-0 z-30">
            <div className={`px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-tighter 
                            bg-gradient-to-r from-primary to-brandPurple text-white shadow-lg`}>
              {limitReached ? 'Fully Claimed' : '100% OFF – First 10 Only'}
            </div>
          </div>

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
            {!limitReached ? (
              <button 
                onClick={() => onClaim(product)}
                className="w-full py-3 px-4 bg-white text-gray-900 font-extrabold rounded-lg shadow-2xl flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4" />
                CLAIM NOW
              </button>
            ) : (
              <div className="flex flex-col items-center gap-1 text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <AlertCircle className="w-6 h-6 mb-1" />
                <span className="font-bold">OUT OF STOCK</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="px-1 pb-2 space-y-1">
          <p className="text-[10px] font-bold tracking-[0.1em] text-primary/80 uppercase">{product.category}</p>
          <h3 className="text-base md:text-xl font-extrabold text-white leading-tight min-h-[3rem] line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-baseline gap-3 pt-1">
            <span className="text-xl font-black text-white">{product.price}</span>
            <span className="text-sm font-medium text-gray-500 line-through decoration-primary/50">{product.originalPrice}</span>
          </div>
        </div>

        {/* Mobile-only CTA (Visible when not hovered on mobile) */}
        <div className="mt-4 md:hidden">
            <button 
              onClick={() => onClaim(product)}
              disabled={limitReached}
              className={`w-full py-3 font-black rounded-lg text-xs tracking-widest uppercase transition-all
                        ${limitReached ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-primary text-white active:scale-95'}`}
            >
              {limitReached ? 'Offer Ended' : 'Claim 100% OFF'}
            </button>
        </div>
      </div>
    </div>
  );
};

export const Shop: React.FC<ShopProps> = ({ onClaimProduct, filterCategory = 'all', onCategoryChange }) => {
  const [promoClaimedCount, setPromoClaimedCount] = useState(0);
  const PROMO_LIMIT = 10;

  useEffect(() => {
    const savedCount = localStorage.getItem('getmyidea_promo_claims');
    if (savedCount) {
      setPromoClaimedCount(parseInt(savedCount, 10));
    }
  }, []);

  const filteredProducts = useMemo(() => {
    if (filterCategory === 'all') return products;
    return products.filter(p => p.category.toLowerCase() === filterCategory.toLowerCase());
  }, [filterCategory]);

  const handleAddToCart = (product: any) => {
    if (promoClaimedCount < PROMO_LIMIT) {
      if (onClaimProduct) {
        onClaimProduct(product);
      }
    } else {
      alert("Sorry, this offer has just ended.");
    }
  };

  const isPromoFullyClaimed = promoClaimedCount >= PROMO_LIMIT;

  const getTitle = () => {
    switch (filterCategory) {
      case 'Hoodie': return <><span className="text-primary">Hoodies</span></>;
      case 'T-Shirt': return <><span className="text-primary">T-Shirts</span></>;
      default: return <>Latest <span className="text-primary">Drops</span></>;
    }
  };

  return (
    <section id="shop" className={`py-20 md:py-32 px-6 bg-gray-950 relative overflow-hidden transition-all duration-500 ${filterCategory !== 'all' ? 'pt-36' : ''}`}>
      {/* Brand Aesthetic background glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-black text-[10px] tracking-[0.2em] uppercase">
              <span className="w-8 h-[2px] bg-primary"></span>
              {filterCategory === 'all' ? 'Exclusive Collection' : `${filterCategory} Series`}
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
              {getTitle()}
            </h2>
          </div>
          
          {onCategoryChange && (
            <div className="flex gap-4">
              <button 
                onClick={() => onCategoryChange('all')}
                className={`text-xs font-black tracking-widest uppercase transition-all pb-1 border-b-2 ${filterCategory === 'all' ? 'text-white border-primary' : 'text-gray-500 border-transparent hover:text-white'}`}
              >
                ALL
              </button>
              <button 
                onClick={() => onCategoryChange('Hoodie')}
                className={`text-xs font-black tracking-widest uppercase transition-all pb-1 border-b-2 ${filterCategory === 'Hoodie' ? 'text-white border-primary' : 'text-gray-500 border-transparent hover:text-white'}`}
              >
                HOODIES
              </button>
              <button 
                onClick={() => onCategoryChange('T-Shirt')}
                className={`text-xs font-black tracking-widest uppercase transition-all pb-1 border-b-2 ${filterCategory === 'T-Shirt' ? 'text-white border-primary' : 'text-gray-500 border-transparent hover:text-white'}`}
              >
                TEES
              </button>
            </div>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          /* Mobile Carousel vs Desktop Grid Wrapper */
          <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-12 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory pb-8 md:pb-0 px-1">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                limitReached={isPromoFullyClaimed} 
                onClaim={handleAddToCart} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[18px]">
            <p className="text-gray-500 text-lg font-bold">Sold Out.</p>
            <button 
              onClick={() => onCategoryChange && onCategoryChange('all')}
              className="mt-4 text-primary font-black uppercase tracking-widest text-xs hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Swipe indicator for mobile */}
        <div className="flex justify-center gap-2 mt-8 md:hidden">
            <div className="w-8 h-1 bg-primary rounded-full"></div>
            <div className="w-2 h-1 bg-gray-800 rounded-full"></div>
            <div className="w-2 h-1 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};