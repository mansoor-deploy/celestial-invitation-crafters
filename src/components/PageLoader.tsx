
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface PageLoaderProps {
  className?: string;
  template: 'eternal' | 'celestial' | 'sacred' | 'radiant';
  minLoadTime?: number; // Minimum loading time in milliseconds
}

const PageLoader: React.FC<PageLoaderProps> = ({ 
  className, 
  template,
  minLoadTime = 2000 // Default to 2 seconds minimum loading time
}) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading time with minimum duration
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const percentage = Math.min((elapsedTime / minLoadTime) * 100, 100);
      
      setProgress(Math.floor(percentage));
      
      if (percentage >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [minLoadTime]);

  const getLoaderStyles = () => {
    switch (template) {
      case 'eternal':
        return 'border-t-eternal-secondary border-eternal-primary/30';
      case 'celestial':
        return 'border-t-celestial-tertiary border-celestial-primary/30';
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
        Loading... Inshallah
      </div>
      
      {/* Progress bar */}
      <div className="w-48 bg-white/10 rounded-full h-1 mt-4 overflow-hidden">
        <div 
          className="h-full rounded-full bg-white/30 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PageLoader;
