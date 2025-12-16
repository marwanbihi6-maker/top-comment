
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, User, Heart } from 'lucide-react';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
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
    { name: 'Home', href: '#' },
    { name: 'Shop', href: '#shop' },
    { name: 'Collections', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center group cursor-pointer no-underline" aria-label="GetMyIdea Home">
          <Logo className="text-2xl sm:text-3xl" />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
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
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center space-x-6 pt-4 border-t border-gray-800">
             <button className="text-gray-300 hover:text-white"><Search className="w-6 h-6" /></button>
             <button className="text-gray-300 hover:text-white"><ShoppingBag className="w-6 h-6" /></button>
             <button className="text-gray-300 hover:text-white"><User className="w-6 h-6" /></button>
          </div>
        </div>
      )}
    </nav>
  );
};