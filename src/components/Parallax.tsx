
import React, { useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  className,
  direction = 'up',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const getTransformStyle = (scroll: number) => {
    const yValue = direction === 'up' || direction === 'down' 
      ? (direction === 'up' ? -scroll : scroll) * speed
      : 0;
    
    const xValue = direction === 'left' || direction === 'right'
      ? (direction === 'left' ? -scroll : scroll) * speed
      : 0;
    
    return `translate3d(${xValue}px, ${yValue}px, 0)`;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrollTop = window.scrollY;
      const elementTop = ref.current.getBoundingClientRect().top + scrollTop;
      const relativeScroll = scrollTop - elementTop;
      
      // Only apply parallax when the element is in or near the viewport
      if (Math.abs(window.scrollY - elementTop) < window.innerHeight * 1.5) {
        ref.current.style.transform = getTransformStyle(relativeScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial position
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction]);

  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </div>
  );
};

export default Parallax;
