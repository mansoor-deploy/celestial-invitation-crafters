
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import AnimatedPattern from './AnimatedPattern';

interface EnhancedPatternProps {
  className?: string;
  variant?: 'eternal' | 'celestial' | 'sacred' | 'radiant';
  intensity?: 'light' | 'medium' | 'strong';
  animated?: boolean;
  breeze?: boolean;
}

const EnhancedPattern: React.FC<EnhancedPatternProps> = ({
  className,
  variant = 'eternal',
  intensity = 'medium',
  animated = true,
  breeze = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Effect for particle animations
  useEffect(() => {
    if (!animated || !containerRef.current) return;
    
    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    // Number of particles based on intensity
    const particleCount = intensity === 'light' ? 15 : intensity === 'medium' ? 30 : 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      createParticle(container, width, height, variant, breeze);
    }
    
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [animated, variant, intensity, breeze]);
  
  // Create a single particle
  const createParticle = (container: HTMLDivElement, width: number, height: number, variant: string, breeze: boolean) => {
    const particle = document.createElement('div');
    
    // Set base particle styles
    particle.className = 'absolute rounded-full pointer-events-none';
    
    // Set variant-specific styles
    let colorClass = '';
    let sizeRange = [2, 5]; // [min, max] in pixels
    let duration = Math.random() * 15 + 10; // seconds
    
    switch (variant) {
      case 'eternal':
        colorClass = Math.random() > 0.5 ? 'bg-eternal-secondary' : 'bg-eternal-primary';
        sizeRange = [2, 6];
        break;
      case 'celestial':
        colorClass = Math.random() > 0.5 ? 'bg-celestial-tertiary' : 'bg-celestial-primary';
        sizeRange = [1, 4];
        break;
      case 'sacred':
        colorClass = Math.random() > 0.3 
          ? Math.random() > 0.5 ? 'bg-sacred-primary' : 'bg-sacred-secondary'
          : 'bg-sacred-tertiary';
        sizeRange = [2, 5];
        break;
      case 'radiant':
        colorClass = Math.random() > 0.7 ? 'bg-radiant-tertiary' : 'bg-radiant-primary';
        sizeRange = [1, 4];
        break;
      default:
        colorClass = 'bg-white';
    }
    
    // Apply color with opacity
    particle.classList.add(`${colorClass}/10`);
    
    // Random size between min and max
    const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    const x = Math.random() * width;
    const y = Math.random() * height;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // Animation properties
    if (breeze) {
      // Enhanced breeze animation with more complex movement
      const animationDuration = duration;
      const swayAmount = Math.random() * 50 + 30; // How much it sways side to side
      const riseAmount = Math.random() * 40 + 20; // How much it rises and falls
      
      // Create a unique animation name
      const animationName = `breeze-${Math.floor(Math.random() * 10000)}`;
      
      // Create a style element for the keyframe animation
      const styleElement = document.createElement('style');
      styleElement.innerHTML = `
        @keyframes ${animationName} {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: ${Math.random() * 0.5 + 0.3};
          }
          25% {
            transform: translate(${Math.random() * swayAmount}px, -${Math.random() * riseAmount}px) rotate(${Math.random() * 45}deg);
          }
          50% {
            transform: translate(-${Math.random() * swayAmount}px, -${Math.random() * riseAmount * 2}px) rotate(${Math.random() * 90}deg);
            opacity: ${Math.random() * 0.6 + 0.4};
          }
          75% {
            transform: translate(${Math.random() * swayAmount}px, -${Math.random() * riseAmount}px) rotate(${Math.random() * 45}deg);
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: ${Math.random() * 0.5 + 0.3};
          }
        }
      `;
      document.head.appendChild(styleElement);
      
      // Apply the animation
      particle.style.animation = `${animationName} ${animationDuration}s ease-in-out infinite`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
    } else {
      // Simple float animation
      particle.style.animation = `float ${duration}s ease-in-out infinite`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
    }
    
    // Add to container
    container.appendChild(particle);
  };
  
  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      <AnimatedPattern 
        variant={variant} 
        intensity={intensity} 
      />
      
      {/* Particle container */}
      <div 
        ref={containerRef}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      />
    </div>
  );
};

export default EnhancedPattern;
