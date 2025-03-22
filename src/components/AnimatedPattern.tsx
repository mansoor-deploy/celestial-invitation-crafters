
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedPatternProps {
  className?: string;
  variant?: 'eternal' | 'celestial' | 'sacred' | 'radiant';
  opacity?: number;
}

const AnimatedPattern: React.FC<AnimatedPatternProps> = ({
  className,
  variant = 'eternal',
  opacity = 0.1
}) => {
  const getPatternSvg = () => {
    switch (variant) {
      case 'eternal':
        return (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
            <defs>
              <pattern id="eternal-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 0L0 20L20 40L40 20Z" fill="currentColor" />
                <circle cx="20" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#eternal-pattern)" />
          </svg>
        );
      
      case 'celestial':
        return (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
            <defs>
              <pattern id="celestial-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                <circle cx="30" cy="10" r="1" fill="currentColor" />
                <circle cx="50" cy="10" r="1.8" fill="currentColor" />
                <circle cx="20" cy="20" r="1.2" fill="currentColor" />
                <circle cx="40" cy="20" r="1" fill="currentColor" />
                <circle cx="10" cy="30" r="1.3" fill="currentColor" />
                <circle cx="30" cy="30" r="1.5" fill="currentColor" />
                <circle cx="50" cy="30" r="1" fill="currentColor" />
                <circle cx="20" cy="40" r="1" fill="currentColor" />
                <circle cx="40" cy="40" r="1.8" fill="currentColor" />
                <circle cx="10" cy="50" r="1" fill="currentColor" />
                <circle cx="30" cy="50" r="1.2" fill="currentColor" />
                <circle cx="50" cy="50" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#celestial-pattern)" />
          </svg>
        );
      
      case 'sacred':
        return (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
            <defs>
              <pattern id="sacred-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M25,0 L50,25 L25,50 L0,25 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M12.5,12.5 L37.5,12.5 L37.5,37.5 L12.5,37.5 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="25" cy="25" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sacred-pattern)" />
          </svg>
        );
      
      case 'radiant':
        return (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
            <defs>
              <pattern id="radiant-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50,0 C50,27.6 27.6,50 0,50 C27.6,50 50,72.4 50,100 C50,72.4 72.4,50 100,50 C72.4,50 50,27.6 50,0" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M50,20 C50,37.7 37.7,50 20,50 C37.7,50 50,62.3 50,80 C50,62.3 62.3,50 80,50 C62.3,50 50,37.7 50,20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#radiant-pattern)" />
          </svg>
        );
      
      default:
        return (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
            <defs>
              <pattern id="default-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0,20 L40,20 M20,0 L20,40" strokeWidth="1" stroke="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#default-pattern)" />
          </svg>
        );
    }
  };

  const getColorClass = () => {
    switch (variant) {
      case 'eternal':
        return 'text-eternal-primary';
      case 'celestial':
        return 'text-celestial-primary';
      case 'sacred':
        return 'text-sacred-primary';
      case 'radiant':
        return 'text-radiant-primary';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className={cn(
      'absolute inset-0 pointer-events-none z-0 animate-float overflow-hidden',
      getColorClass(),
      className
    )}>
      {getPatternSvg()}
    </div>
  );
};

export default AnimatedPattern;
