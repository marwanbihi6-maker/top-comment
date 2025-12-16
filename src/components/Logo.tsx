import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <span className={`inline-flex items-center font-extrabold tracking-[0.5px] select-none font-sans ${className}`}>
      <span className="text-white">GetMy</span>
      <span className="text-primary transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_12px_rgba(255,77,109,0.4)]">
        Idea
      </span>
    </span>
  );
};