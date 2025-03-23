
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedLoaderProps {
  className?: string;
  template: 'eternal' | 'celestial' | 'sacred' | 'radiant';
  onLoadComplete?: () => void;
  minLoadTime?: number; // Minimum loading time in milliseconds
}

const EnhancedLoader: React.FC<EnhancedLoaderProps> = ({ 
  className, 
  template, 
  onLoadComplete,
  minLoadTime = 3000 // Default to 3 seconds minimum loading time
}) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Preparing your invitation...');

  useEffect(() => {
    const messages = [
      'Preparing your invitation...',
      'Adding a touch of elegance...',
      'Arranging floral details...',
      'Finalizing the venue...',
      'Almost ready...'
    ];
    
    // Simulate loading progress with minimum load time
    let currentProgress = 0;
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      // Calculate elapsed time as a percentage of minLoadTime
      const elapsedTime = Date.now() - startTime;
      const timeProgress = Math.min((elapsedTime / minLoadTime) * 100, 100);
      
      // Add some randomness but ensure we're at least following the time progress
      currentProgress = Math.max(timeProgress, currentProgress + Math.random() * 10);
      if (currentProgress > 100) currentProgress = 100;
      
      setProgress(Math.floor(currentProgress));
      
      // Update message based on progress
      const messageIndex = Math.floor((currentProgress / 100) * messages.length);
      setMessage(messages[Math.min(messageIndex, messages.length - 1)]);
      
      if (currentProgress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          if (onLoadComplete) {
            onLoadComplete();
          }
        }, 500);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [onLoadComplete, minLoadTime]);

  const getLoaderStyles = () => {
    switch (template) {
      case 'eternal':
        return 'from-eternal-primary to-eternal-secondary';
      case 'celestial':
        return 'from-celestial-primary to-celestial-accent';
      case 'sacred':
        return 'from-sacred-primary to-sacred-tertiary';
      case 'radiant':
        return 'from-radiant-primary to-radiant-tertiary';
      default:
        return 'from-eternal-primary to-eternal-secondary';
    }
  };

  const getBackgroundStyles = () => {
    switch (template) {
      case 'eternal':
        return 'bg-gradient-to-br from-eternal-primary/30 via-eternal-primary/20 to-eternal-tertiary';
      case 'celestial':
        return 'bg-gradient-to-br from-celestial-accent/40 via-celestial-primary/30 to-celestial-tertiary';
      case 'sacred':
        return 'bg-gradient-to-br from-sacred-primary/30 via-sacred-secondary/20 to-sacred-tertiary/30';
      case 'radiant':
        return 'bg-gradient-to-br from-radiant-primary/40 via-radiant-primary/20 to-radiant-secondary/20';
      default:
        return 'bg-gradient-to-br from-eternal-primary/30 via-eternal-primary/20 to-eternal-tertiary';
    }
  };

  const getTextColor = () => {
    switch (template) {
      case 'eternal':
        return 'text-eternal-tertiary';
      case 'celestial':
        return 'text-celestial-tertiary';
      case 'sacred':
        return 'text-sacred-tertiary';
      case 'radiant':
        return 'text-radiant-tertiary';
      default:
        return 'text-white';
    }
  };

  if (!loading) return null;

  return (
    <div 
      className={cn(
        'fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-500',
        getBackgroundStyles(),
        className
      )}
    >
      <div className="w-72 md:w-96 flex flex-col items-center">
        {/* Animated ornament */}
        <div className="relative w-24 h-24 mb-8">
          <div className={`absolute inset-0 rounded-full border-4 border-t-transparent animate-spin ${getTextColor()} opacity-70`}></div>
          <div className={`absolute inset-0 m-2 rounded-full border-4 border-r-transparent animate-spin-reverse ${getTextColor()} opacity-50`}></div>
          <div className={`absolute inset-0 m-4 rounded-full border-4 border-b-transparent animate-spin ${getTextColor()} opacity-30`}></div>
          
          {/* Islamic pattern in the center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" width="50" height="50" className={getTextColor()}>
              <path d="M50,10 L90,50 L50,90 L10,50 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1"/>
              <path d="M50,20 L80,50 L50,80 L20,50 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </svg>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/10 rounded-full h-2 mb-4 overflow-hidden">
          <div 
            className={`h-full rounded-full bg-gradient-to-r ${getLoaderStyles()} transition-all duration-300 ease-out`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Loading message */}
        <div className={`font-cormorant text-xl font-light ${getTextColor()} text-center animate-pulse`}>
          {message}
        </div>
        
        {/* Progress percentage */}
        <div className={`text-sm mt-2 ${getTextColor()} opacity-70`}>
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default EnhancedLoader;
