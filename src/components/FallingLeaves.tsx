
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Leaf {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  fallSpeed: number;
  swayFactor: number;
  opacity: number;
  element: HTMLDivElement | null;
}

interface FallingLeavesProps {
  count?: number;
  variant?: 'eternal' | 'celestial' | 'sacred' | 'radiant';
  className?: string;
}

const FallingLeaves: React.FC<FallingLeavesProps> = ({
  count = 15,
  variant = 'eternal',
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<Leaf[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const getLeafColor = () => {
    switch (variant) {
      case 'eternal':
        return ['text-eternal-primary/30', 'text-eternal-secondary/40', 'text-eternal-accent/30'];
      case 'celestial':
        return ['text-celestial-primary/30', 'text-celestial-accent/30', 'text-celestial-tertiary/40'];
      case 'sacred':
        return ['text-sacred-primary/30', 'text-sacred-secondary/30', 'text-sacred-tertiary/40'];
      case 'radiant':
        return ['text-radiant-primary/30', 'text-radiant-secondary/40', 'text-radiant-tertiary/30'];
      default:
        return ['text-eternal-primary/30', 'text-eternal-secondary/40', 'text-eternal-accent/30'];
    }
  };

  const leafColors = getLeafColor();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Create leaves
    for (let i = 0; i < count; i++) {
      const leafElement = document.createElement('div');
      leafElement.className = `absolute -z-10 ${leafColors[i % leafColors.length]}`;
      
      // Randomly select a leaf shape
      const leafType = Math.random() > 0.5 ? 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path d="M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6z" /><path fill-rule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.918a.75.75 0 0 1 .634-.74A49.109 49.109 0 0 1 12 9c2.59 0 5.134.202 7.616.592a.75.75 0 0 1 .634.74zm-7.5 2.418a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75zm3-.75a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0v-6.75a.75.75 0 0 1 .75-.75zM9 12.75a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75z" clip-rule="evenodd" /></svg>` : 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3z" clip-rule="evenodd" /></svg>`;
      
      leafElement.innerHTML = leafType;
      container.appendChild(leafElement);

      const size = Math.random() * 15 + 10; // Between 10px and 25px
      leafElement.style.width = `${size}px`;
      leafElement.style.height = `${size}px`;

      const leaf: Leaf = {
        id: i,
        x: Math.random() * containerWidth,
        y: Math.random() * containerHeight * -1 - size, // Start above the container
        size,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        fallSpeed: Math.random() * 1 + 0.5,
        swayFactor: Math.random() * 3,
        opacity: Math.random() * 0.3 + 0.2,
        element: leafElement,
      };

      leavesRef.current.push(leaf);
    }

    // Animation loop
    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      leavesRef.current.forEach((leaf) => {
        if (!leaf.element) return;

        // Update leaf position
        leaf.y += leaf.fallSpeed * (deltaTime / 16);
        leaf.x += Math.sin(leaf.y * 0.01) * leaf.swayFactor * (deltaTime / 16) * 0.1;
        leaf.rotation += leaf.rotationSpeed * (deltaTime / 16);

        // Apply styles
        leaf.element.style.transform = `translate(${leaf.x}px, ${leaf.y}px) rotate(${leaf.rotation}deg)`;
        leaf.element.style.opacity = leaf.opacity.toString();

        // Reset leaf if it's out of the container
        if (leaf.y > containerHeight) {
          leaf.y = -leaf.size;
          leaf.x = Math.random() * containerWidth;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Clean up leaves
      leavesRef.current.forEach((leaf) => {
        if (leaf.element && container.contains(leaf.element)) {
          container.removeChild(leaf.element);
        }
      });
      
      leavesRef.current = [];
    };
  }, [count, variant]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        'absolute inset-0 overflow-hidden pointer-events-none',
        className
      )}
    />
  );
};

export default FallingLeaves;
