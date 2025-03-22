
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedPatternProps {
  className?: string;
  variant?: 'eternal' | 'celestial' | 'sacred' | 'radiant';
  intensity?: 'light' | 'medium' | 'strong';
  animate?: boolean;
}

const EnhancedPattern: React.FC<EnhancedPatternProps> = ({
  className,
  variant = 'eternal',
  intensity = 'medium',
  animate = true,
}) => {
  const patternRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate || !patternRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!patternRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = patternRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      // Apply subtle parallax effect to the pattern
      const moveX = (x - 0.5) * 20; // Move up to 20px
      const moveY = (y - 0.5) * 20; // Move up to 20px
      
      patternRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [animate]);

  const getPatternSvg = () => {
    switch (variant) {
      case 'eternal':
        return '/patterns/geometric-pattern.svg';
      case 'celestial':
        return '/patterns/constellation-pattern.svg';
      case 'sacred':
        return '/patterns/mosaic-pattern.svg';
      case 'radiant':
        return '/patterns/arabesque-pattern.svg';
      default:
        return '/patterns/geometric-pattern.svg';
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

  const getOpacity = () => {
    switch (intensity) {
      case 'light':
        return 'opacity-5';
      case 'medium':
        return 'opacity-10';
      case 'strong':
        return 'opacity-15';
      default:
        return 'opacity-10';
    }
  };

  return (
    <div className={cn(
      'absolute inset-0 pointer-events-none z-0 overflow-hidden',
      animate ? 'transition-transform duration-300 ease-out' : '',
      getColorClass(),
      getOpacity(),
      className
    )} ref={patternRef}>
      <div className="absolute inset-0" style={{
        backgroundImage: `url(${getPatternSvg()})`,
        backgroundSize: '300px 300px',
        backgroundRepeat: 'repeat',
      }}></div>
    </div>
  );
};

export default EnhancedPattern;
