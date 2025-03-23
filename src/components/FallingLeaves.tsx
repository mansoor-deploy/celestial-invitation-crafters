
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
      
      // Select from more varied leaf shapes
      const leafShapes = [
        // Leaf shape 1 - Simple
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full animate-breeze-slow"><path d="M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6z" /><path fill-rule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.918a.75.75 0 0 1 .634-.74A49.109 49.109 0 0 1 12 9c2.59 0 5.134.202 7.616.592a.75.75 0 0 1 .634.74zm-7.5 2.418a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75zm3-.75a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0v-6.75a.75.75 0 0 1 .75-.75zM9 12.75a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75z" clip-rule="evenodd" /></svg>`,
        // Leaf shape 2 - Circle
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full animate-breeze"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3z" clip-rule="evenodd" /></svg>`,
        // Leaf shape 3 - Islamic pattern
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full animate-breeze-fast"><path d="M12 1.5a.75.75 0 0 1 .75.75V4.5a.75.75 0 0 1-1.5 0V2.25A.75.75 0 0 1 12 1.5M5.636 4.136a.75.75 0 0 1 1.06 0l1.592 1.591a.75.75 0 0 1-1.061 1.06l-1.591-1.59a.75.75 0 0 1 0-1.061m12.728 0a.75.75 0 0 1 0 1.06l-1.591 1.592a.75.75 0 0 1-1.06-1.061l1.59-1.591a.75.75 0 0 1 1.061 0m-6.816 4.496a.75.75 0 0 1 .82.311l5.228 7.917a.75.75 0 0 1-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 0 1-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 0 1-1.247-.606l.569-9.47a.75.75 0 0 1 .554-.68M3 10.5a.75.75 0 0 1 .75-.75H6a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 10.5m14.25 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H18a.75.75 0 0 1-.75-.75m-8.962 3.712a.75.75 0 0 1 0 1.061l-1.591 1.591a.75.75 0 1 1-1.061-1.06l1.591-1.592a.75.75 0 0 1 1.06 0m10.259-4.493a.75.75 0 0 1 .261 1.035l-1.505 2.505a.75.75 0 0 1-1.296-.775l1.505-2.505a.75.75 0 0 1 1.035-.26M5.636 18.363a.75.75 0 0 1 0-1.06l1.591-1.592a.75.75 0 1 1 1.061 1.06l-1.591 1.592a.75.75 0 0 1-1.06 0m12.728 0a.75.75 0 0 1-1.06 0l-1.591-1.592a.75.75 0 0 1 1.06-1.06l1.591 1.591a.75.75 0 0 1 0 1.061" /></svg>`,
        // Leaf shape 4 - Actual leaf
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full animate-breeze"><path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 16.714a.75.75 0 0 0-.48-1.339A7.25 7.25 0 0 1 8.496 9.25a.75.75 0 0 0 .729-.93 8.26 8.26 0 0 1 3.874-5.43.75.75 0 0 0-.136-1.071Z" clip-rule="evenodd" /></svg>`
      ];
      
      const leafType = leafShapes[Math.floor(Math.random() * leafShapes.length)];
      
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
