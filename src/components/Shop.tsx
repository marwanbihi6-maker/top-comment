
import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, Heart, AlertCircle } from 'lucide-react';
import { CategoryType } from '../App';

const products = [
  {
    id: 1,
    name: 'Here we are 2026',
    price: '$14.00',
    originalPrice: '$45.00',
    category: 'T-Shirt',
    image: 'https://i.postimg.cc/2S2ZF2ks/here-we-are-2026.png'
  },
  {
    id: 2,
    name: 'mr penis',
    price: '$14.00',
    originalPrice: '$85.00',
    category: 'Hoodie',
    image: 'https://i.postimg.cc/X7hMG0Fh/here-we-are-2026-(1).png'
  },
  {
    id: 3,
    name: 'ledragon',
    price: '$14.00',
    originalPrice: '$48.00',
    category: 'T-Shirt',
    image: 'https://i.postimg.cc/0ywLWLY3/here-we-are-2026-(2).png'
  },
  {
    id: 4,
    name: 'ANGRY AFRICAN DAD Gets SCAMMED',
    price: '$14.00',
    originalPrice: '$95.00',
    category: 'Hoodie',
    image: 'https://i.postimg.cc/hvZR6L82/here-we-are-2026-(6).png'
  },
  {
    id: 5,
    name: 'house',
    price: '$14.00',
    originalPrice: '$42.00',
    category: 'Hoodie',
    image: 'https://i.postimg.cc/FzHV13tJ/here-we-are-2026-(5).png'
  },
  {
    id: 6,
    name: 'JESUS IS KING',
    price: '$14.00',
    originalPrice: '$88.00',
    category: 'Hoodie',
    image: 'https://i.postimg.cc/GtMwsFHg/here-we-are-2026-(4).png'
  },
  {
    id: 7,
    name: 'Jane Doe',
    price: '$14.00',
    originalPrice: '$85.00',
    category: 'Hoodie',
    image: 'https://i.postimg.cc/hjmz4PyC/here-we-are-2026-(8).png'
  },
  {
    id: 8,
    name: 'Miyabi head scratches',
    price: '$14.00',
    originalPrice: '$85.00',
    category: 'Hoodie',
    image: 'https://i.postimg.cc/JhjL8s8S/here-we-are-2026-(9).png'
  },
  {
    id: 9,
    name: 'Office Dancing Zone',
    price: '$14.00',
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
    <div className="group relative flex flex-col w-[85vw] md:w-full shrink-0 snap-center md:snap-align-none">
      <div className="relative p-0 rounded-[18px] transition-all duration-500 ease-out 
                      border-[1px] border-white/10 hover:border-brandPurple/60 
                      bg-gray-900 shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:scale-[1.03] overflow-hidden">
        
        <div className="relative aspect-square overflow-hidden bg-white mb-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          <div className="absolute top-0 left-0 z-30">
            <div className={`px-4 py-2 text-[11px] font-black uppercase tracking-widest 
                            bg-gradient-to-r from-primary to-brandPurple text-white shadow-lg`}>
              {limitReached ? 'Offer Ended' : 'SPECIAL PRICE – $14.00 ONLY'}
            </div>
          </div>

          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center p-6">
            {!limitReached ? (
              <button 
                onClick={() => onClaim(product)}
                className="w-full py-4 bg-white text-gray-900 font-extrabold rounded-md shadow-2xl flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white"
              >
                <ShoppingBag className="w-5 h-5" />
                GET IT FOR $14
              </button>
            ) : (
              <div className="flex flex-col items-center gap-1 text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <AlertCircle className="w-8 h-8 mb-2 text-primary" />
                <span className="font-black text-lg">FULLY CLAIMED</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-3 bg-gray-900">
          <h3 className="text-lg md:text-2xl font-black text-white leading-[1.2] uppercase tracking-tight min-h-[3rem] line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex flex-col items-start gap-1">
             <div className="flex items-center gap-3">
               <span className="text-2xl md:text-3xl font-black text-primary">{product.price}</span>
               <span className="text-sm md:text-base font-medium text-gray-500 line-through decoration-primary/40">{product.originalPrice}</span>
             </div>
             <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-gray-400 uppercase">{product.category}</p>
          </div>
        </div>

        <div className="px-6 pb-6 md:hidden">
            <button 
              onClick={() => onClaim(product)}
              disabled={limitReached}
              className={`w-full py-4 font-black rounded-md text-xs tracking-widest uppercase transition-all shadow-lg
                        ${limitReached ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' : 'bg-primary text-white active:scale-95'}`}
            >
              {limitReached ? 'Fully Claimed' : 'Claim for $14'}
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

  return (
    <section id="shop" className={`py-24 md:py-40 px-6 bg-gray-950 relative overflow-hidden transition-all duration-700 ${filterCategory !== 'all' ? 'pt-40' : ''}`}>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,63,142,0.03),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.03),transparent_50%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-10">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3 text-primary font-black text-xs tracking-[0.3em] uppercase">
              <span className="w-10 h-[3px] bg-primary"></span>
              The Gear Shop
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
              {filterCategory === 'all' ? (
                <>CHECK OUT THE <span className="text-primary">LATEST!</span></>
              ) : (
                <><span className="text-primary">{filterCategory}</span> SERIES</>
              )}
            </h2>
            <p className="text-gray-400 text-base md:text-lg font-medium leading-relaxed">
              New, limited, and exclusive items are being added regularly for just $14!
            </p>
          </div>
          
          {onCategoryChange && (
            <div className="flex gap-6 md:gap-10 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
              {['all', 'Hoodie', 'T-Shirt'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => onCategoryChange(cat as CategoryType)}
                  className={`text-sm font-black tracking-[0.2em] uppercase transition-all whitespace-nowrap pb-2 border-b-2 
                            ${filterCategory === cat ? 'text-white border-primary' : 'text-gray-500 border-transparent hover:text-white'}`}
                >
                  {cat === 'all' ? 'SHOP ALL' : `${cat}S`}
                </button>
              ))}
            </div>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="flex md:grid md:grid-cols-3 gap-8 md:gap-16 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory px-0 -mx-6 md:mx-0 pl-6 md:pl-0">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                limitReached={isPromoFullyClaimed} 
                onClaim={handleAddToCart} 
              />
            ))}
            <div className="w-6 shrink-0 md:hidden"></div>
          </div>
        ) : (
          <div className="text-center py-32 border border-white/5 bg-gray-900/50 rounded-[18px]">
            <p className="text-gray-500 text-xl font-black uppercase tracking-widest">Nothing Found.</p>
            <button 
              onClick={() => onCategoryChange && onCategoryChange('all')}
              className="mt-6 text-primary font-black uppercase tracking-widest text-sm hover:underline"
            >
              Return to All Drops
            </button>
          </div>
        )}

        <div className="flex justify-center gap-3 mt-12 md:hidden">
            <div className="w-12 h-1 bg-primary rounded-full"></div>
            <div className="w-3 h-1 bg-gray-800 rounded-full"></div>
            <div className="w-3 h-1 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
