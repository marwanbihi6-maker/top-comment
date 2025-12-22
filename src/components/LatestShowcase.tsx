
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LatestProduct {
  name: string;
  image: string;
  price: string;
  tag: string;
}

const latestProducts: LatestProduct[] = [
  {
    name: 'National Lampoon - Classy - Premium Steers',
    image: 'https://i.postimg.cc/2S2ZF2ks/here-we-are-2026.png',
    price: '$14.00',
    tag: 'Pre Order 12/24'
  },
  {
    name: 'National Lampoon - Rust Edition',
    image: 'https://i.postimg.cc/X7hMG0Fh/here-we-are-2026-(1).png',
    price: '$14.00',
    tag: 'Pre Order 12/24'
  },
  {
    name: 'National Lampoon - 4 Pack Bundle',
    image: 'https://i.postimg.cc/0ywLWLY3/here-we-are-2026-(2).png',
    price: '$14.00',
    tag: 'Pre Order 12/24'
  },
  {
    name: 'Reversed Greenie Meanie',
    image: 'https://i.postimg.cc/GtMwsFHg/here-we-are-2026-(4).png',
    price: '$14.00',
    tag: 'Pre Order 12/19'
  },
  {
    name: 'Classic CEC Enamel Pin Set',
    image: 'https://i.postimg.cc/FzHV13tJ/here-we-are-2026-(5).png',
    price: '$14.00',
    tag: 'Pre-Order'
  },
  {
    name: 'Greenie Meanie - Short Hair',
    image: 'https://i.postimg.cc/hvZR6L82/here-we-are-2026-(6).png',
    price: '$14.00',
    tag: 'Low Stock!'
  }
];

interface LatestShowcaseProps {
  onShopNowClick?: () => void;
}

export const LatestShowcase: React.FC<LatestShowcaseProps> = ({ onShopNowClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-32 bg-[#F9F9F9] text-gray-900 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase text-primary leading-none">
            CHECK OUT THE <span className="text-[#A855F7]">LATEST!</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            New, limited, and exclusive items are being added regularly for only $14.
          </p>
        </div>

        <div className="relative">
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-6 lg:-left-12 top-1/2 -translate-y-1/2 z-30 p-2 text-gray-300 hover:text-gray-900 hidden md:block transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-10 h-10 stroke-[1.5]" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute -right-6 lg:-right-12 top-1/2 -translate-y-1/2 z-30 p-2 text-gray-300 hover:text-gray-900 hidden md:block transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-10 h-10 stroke-[1.5]" />
          </button>

          <div 
            ref={scrollRef}
            className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8 px-2"
          >
            {latestProducts.map((product, idx) => (
              <div 
                key={idx}
                className="flex-none w-[85%] sm:w-[48%] md:w-[31%] lg:w-[23.5%] snap-center"
              >
                <div className="group bg-white h-full border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 flex flex-col relative rounded-sm">
                  <div className="absolute top-0 left-0 z-10">
                    <div className="bg-gradient-to-r from-primary to-brandPurple text-white text-[10px] md:text-xs font-black px-4 py-2 uppercase tracking-widest shadow-md">
                      {product.tag}
                    </div>
                  </div>
                  <div className="aspect-square w-full p-8 md:p-12 flex items-center justify-center bg-white overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-6 pt-0 mt-auto text-center">
                    <h3 className="text-sm md:text-base font-bold text-gray-800 uppercase tracking-tight mb-2 line-clamp-2 min-h-[2.5rem] px-2">
                      {product.name}
                    </h3>
                    <p className="text-xs md:text-sm text-primary font-black transition-colors group-hover:text-primary">
                      {product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12 md:mt-16">
          <button 
            onClick={onShopNowClick}
            className="bg-[#C1272D] hover:bg-[#A11B21] text-white px-12 py-4 text-lg font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl w-full sm:w-auto rounded-sm"
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};
