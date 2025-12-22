
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, User, Heart } from 'lucide-react';
import { Logo } from './Logo';
import { CategoryType } from '../App';

interface NavbarProps {
  onCategorySelect?: (category: CategoryType) => void;
  onLogoClick?: () => void;
  activeCategory?: CategoryType;
}

export const Navbar: React.FC<NavbarProps> = ({ onCategorySelect, onLogoClick, activeCategory = 'all' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', action: 'home' },
    { name: 'Shop All', action: 'shop', category: 'all' as CategoryType },
    { name: 'Hoodies', action: 'shop', category: 'Hoodie' as CategoryType },
    { name: 'T-Shirts', action: 'shop', category: 'T-Shirt' as CategoryType },
    { name: 'Contact', action: 'none', disabled: true },
  ];

  const handleNavClick = (link: any, e: React.MouseEvent) => {
    e.preventDefault();
    if (link.disabled) return;
    
    if (link.action === 'home' && onLogoClick) {
      onLogoClick();
    } else if (link.action === 'shop' && onCategorySelect) {
      onCategorySelect(link.category);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={(e) => { e.preventDefault(); onLogoClick?.(); }} 
          className="flex items-center group cursor-pointer no-underline bg-transparent border-none p-0" 
          aria-label="GetMyIdea Home"
        >
          <Logo className="text-2xl sm:text-3xl" />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleNavClick(link, e)}
              className={`text-sm font-medium transition-colors relative group bg-transparent border-none p-0 ${
                activeCategory === link.category && !link.disabled ? 'text-white' : 'text-gray-400 hover:text-white'
              } ${link.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                activeCategory === link.category && !link.disabled ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          ))}
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-6 text-gray-300">
          <button className="hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="hover:text-white transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="hover:text-white transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-[10px] flex items-center justify-center rounded-full text-white font-bold">
              2
            </span>
          </button>
          <button className="hover:text-white transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-800 p-6 md:hidden flex flex-col space-y-4 shadow-2xl animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleNavClick(link, e)}
              className={`text-lg font-medium text-left bg-transparent border-none p-0 transition-colors ${
                activeCategory === link.category && !link.disabled ? 'text-primary' : 'text-gray-300 hover:text-white'
              } ${link.disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
