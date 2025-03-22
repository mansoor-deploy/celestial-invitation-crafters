
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface PageLoaderProps {
  className?: string;
  template: 'eternal' | 'celestial' | 'sacred' | 'radiant';
}

const PageLoader: React.FC<PageLoaderProps> = ({ className, template }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (minimum 1.5 seconds for visual effect)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getLoaderStyles = () => {
    switch (template) {
      case 'eternal':
        return 'border-t-eternal-secondary border-eternal-primary/30';
      case 'celestial':
        return 'border-t-celestial-primary border-celestial-secondary/30';
      case 'sacred':
        return 'border-t-sacred-tertiary border-sacred-primary/30';
      case 'radiant':
        return 'border-t-radiant-tertiary border-radiant-primary/30';
      default:
        return 'border-t-eternal-secondary border-eternal-primary/30';
    }
  };

  const getBackgroundStyles = () => {
    switch (template) {
      case 'eternal':
        return 'bg-gradient-to-b from-eternal-primary/20 via-eternal-primary/10 to-eternal-tertiary';
      case 'celestial':
        return 'bg-gradient-to-b from-celestial-accent via-celestial-primary/40 to-celestial-tertiary';
      case 'sacred':
        return 'bg-gradient-to-b from-sacred-primary/30 via-sacred-secondary/20 to-sacred-tertiary/40';
      case 'radiant':
        return 'bg-gradient-to-b from-radiant-primary/40 via-radiant-primary/20 to-radiant-secondary/30';
      default:
        return 'bg-gradient-to-b from-eternal-primary/20 via-eternal-primary/10 to-eternal-tertiary';
    }
  };

  if (!loading) return null;

  return (
    <div 
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500',
        getBackgroundStyles(),
        className
      )}
    >
      <div className="w-20 h-20 mb-4 relative">
        <div className={cn(
          "w-20 h-20 border-4 rounded-full animate-spin",
          getLoaderStyles()
        )}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn(
            "w-14 h-14 border-4 rounded-full animate-spin-reverse",
            getLoaderStyles(),
            "opacity-70"
          )}></div>
        </div>
      </div>
      <div className="font-cormorant text-xl font-light tracking-widest animate-pulse mt-4">
        Loading...
      </div>
    </div>
  );
};

export default PageLoader;
