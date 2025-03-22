
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  date: Date;
  title?: string;
  className?: string;
  variant?: 'default' | 'eternal' | 'celestial' | 'sacred' | 'radiant';
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  date, 
  title = 'Counting down to the big day', 
  className,
  variant = 'default'
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +date - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [date]);

  const getContainerStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'bg-eternal-tertiary/60 border-eternal-primary shadow-[0_0_20px_rgba(30,60,40,0.1)]';
      case 'celestial':
        return 'bg-celestial-tertiary/60 border-celestial-primary shadow-[0_0_20px_rgba(20,40,80,0.1)]';
      case 'sacred':
        return 'bg-sacred-tertiary/50 border-sacred-primary shadow-[0_0_20px_rgba(30,80,80,0.1)]';
      case 'radiant':
        return 'bg-radiant-secondary/50 border-radiant-tertiary shadow-[0_0_20px_rgba(40,30,80,0.1)]';
      default:
        return 'bg-white/80 border-gray-200 shadow-lg';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'text-eternal-primary';
      case 'celestial':
        return 'text-celestial-accent';
      case 'sacred':
        return 'text-sacred-secondary';
      case 'radiant':
        return 'text-radiant-primary';
      default:
        return 'text-primary';
    }
  };

  const getNumberStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'bg-eternal-primary text-eternal-tertiary';
      case 'celestial':
        return 'bg-celestial-primary text-celestial-tertiary';
      case 'sacred':
        return 'bg-sacred-primary text-sacred-tertiary';
      case 'radiant':
        return 'bg-radiant-primary text-radiant-tertiary';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className={cn(
      'p-6 rounded-lg backdrop-blur-sm border flex flex-col items-center transition-all',
      getContainerStyles(),
      className
    )}>
      <h3 className={cn(
        'text-lg font-medium mb-4 font-cormorant text-center',
        getTextStyles()
      )}>
        {title}
      </h3>
      
      <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full">
        <div className="flex flex-col items-center">
          <div className={cn(
            'w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-bold',
            getNumberStyles()
          )}>
            {timeLeft.days}
          </div>
          <span className="text-xs sm:text-sm mt-1 font-medium opacity-90">Days</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className={cn(
            'w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-bold',
            getNumberStyles()
          )}>
            {timeLeft.hours}
          </div>
          <span className="text-xs sm:text-sm mt-1 font-medium opacity-90">Hours</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className={cn(
            'w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-bold',
            getNumberStyles()
          )}>
            {timeLeft.minutes}
          </div>
          <span className="text-xs sm:text-sm mt-1 font-medium opacity-90">Minutes</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className={cn(
            'w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-bold',
            getNumberStyles()
          )}>
            {timeLeft.seconds}
          </div>
          <span className="text-xs sm:text-sm mt-1 font-medium opacity-90">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
