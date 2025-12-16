import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Shop } from './components/Shop';
import { Logo } from './components/Logo';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Shop />
      </main>
      
      <footer className="py-12 border-t border-white/10 bg-gray-900 text-center">
        <div className="flex flex-col items-center justify-center mb-4 group cursor-default">
          <Logo className="text-2xl" />
        </div>
        <p className="text-gray-500 text-sm">&copy; 2024 GetMyIdea. All rights reserved.</p>
      </footer>
    </div>
  );
}