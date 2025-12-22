
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
      case 'Hoodie': return <><span className="text-primary">Hoodies</span> Collection</>;
      case 'T-Shirt': return <><span className="text-primary">T-Shirts</span> Collection</>;
      default: return <>Latest <span className="text-primary">Drops</span></>;
    }
  };

  return (
    <section id="shop" className={`py-24 px-6 bg-gray-900 relative transition-all duration-500 ${filterCategory !== 'all' ? 'pt-32' : ''}`}>
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase mb-1">
              <LayoutGrid className="w-4 h-4" />
              {filterCategory === 'all' ? 'Explore All' : `Collection / ${filterCategory}s`}
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              {getTitle()}
            </h2>
            <p className="text-gray-400 max-w-lg text-lg leading-relaxed">
              Premium artist-designed apparel. <br className="hidden md:block" />
              Claim your exclusive 100% OFF drop below.
            </p>
          </div>
          {filterCategory !== 'all' && onCategoryChange && (
            <button 
              onClick={() => onCategoryChange('all')}
              className="flex items-center gap-2 text-gray-400 font-semibold hover:text-white transition-colors group"
            >
              View All Products 
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 lg:gap-x-8 lg:gap-y-16">
            {filteredProducts.map((product) => {
              const limitReached = isPromoFullyClaimed;

              return (
                <div key={product.id} className="group relative flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-800 mb-6 shadow-lg border border-white/5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    
                    {/* Promo Badge */}
                    <div className="absolute top-3 left-3 z-30 flex flex-col items-start gap-1">
                      <div className={`promoBadge px-2 py-1 md:px-3 text-[10px] md:text-[10px] leading-none max-w-fit font-bold uppercase tracking-wider rounded md:rounded-md shadow-lg ${limitReached ? 'bg-gray-700 text-gray-400' : 'bg-primary text-white animate-pulse'}`}>
                        {limitReached ? 'Offer Ended' : (
                          <>
                            <span className="md:hidden">100% OFF · First 10</span>
                            <span className="hidden md:inline">100% OFF – Limited to first 10</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute top-4 right-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-20">
                      <button className="p-2.5 bg-white text-gray-900 rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg" aria-label="Add to wishlist">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75 z-20">
                      {limitReached ? (
                        <div className="w-full py-2 md:py-3 bg-gray-900/95 backdrop-blur-sm text-gray-400 border border-gray-700 font-bold rounded-lg md:rounded-xl shadow-xl flex flex-col items-center justify-center gap-0.5 md:gap-1 text-center px-2 cursor-not-allowed">
                          <div className="flex items-center gap-1.5 md:gap-2">
                            <AlertCircle className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="text-xs md:text-base">Fully Claimed</span>
                          </div>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="promoCtaBtn w-full h-[36px] md:h-auto px-[10px] md:px-0 py-0 md:py-3 whitespace-nowrap text-center backdrop-blur-sm font-bold text-[12px] md:text-base rounded-[10px] md:rounded-xl shadow-xl flex items-center justify-center gap-1.5 md:gap-2 transition-colors bg-primary text-white hover:bg-red-600"
                        >
                          <ShoppingBag className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="md:hidden">100% OFF</span>
                          <span className="hidden md:inline">Claim 100% OFF</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                       <div>
                          <p className="text-xs font-semibold tracking-wider text-primary uppercase mb-1">{product.category}</p>
                          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors cursor-pointer leading-tight">
                            {product.name}
                          </h3>
                       </div>
                       <div className="text-right">
                         <p className="text-lg font-bold text-primary">
                           {product.price}
                         </p>
                         <p className="text-xs text-gray-500 line-through">{product.originalPrice}</p>
                       </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
            <button 
              onClick={() => onCategoryChange && onCategoryChange('all')}
              className="mt-4 text-primary font-bold hover:underline"
            >
              Back to all products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
