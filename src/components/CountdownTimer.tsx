
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
        return 'bg-gradient-to-br from-eternal-tertiary/90 to-eternal-tertiary/70 border-eternal-primary/20 shadow-[0_10px_25px_rgba(30,60,40,0.2)]';
      case 'celestial':
        return 'bg-gradient-to-br from-celestial-tertiary/90 to-celestial-tertiary/70 border-celestial-primary/20 shadow-[0_10px_25px_rgba(20,40,80,0.2)]';
      case 'sacred':
        return 'bg-gradient-to-br from-sacred-tertiary/80 to-sacred-tertiary/60 border-sacred-primary/20 shadow-[0_10px_25px_rgba(30,80,80,0.2)]';
      case 'radiant':
        return 'bg-gradient-to-br from-radiant-secondary/80 to-radiant-secondary/60 border-radiant-tertiary/20 shadow-[0_10px_25px_rgba(40,30,80,0.2)]';
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
        return 'bg-gradient-to-br from-eternal-primary to-eternal-primary/90 text-eternal-tertiary';
      case 'celestial':
        return 'bg-gradient-to-br from-celestial-primary to-celestial-accent/90 text-celestial-tertiary';
      case 'sacred':
        return 'bg-gradient-to-br from-sacred-primary to-sacred-secondary/90 text-sacred-tertiary';
      case 'radiant':
        return 'bg-gradient-to-br from-radiant-primary to-radiant-primary/90 text-radiant-tertiary';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className={cn(
      'p-6 rounded-2xl backdrop-blur-sm border-2 flex flex-col items-center transition-all',
      getContainerStyles(),
      className
    )}>
      <h3 className={cn(
        'text-xl font-medium mb-5 font-cormorant text-center',
        getTextStyles()
      )}>
        {title}
      </h3>
      
      <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full">
        <div className="flex flex-col items-center">
          <div className={cn(
            'w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-lg',
            getNumberStyles()
          )}>
            {timeLeft.days}
          </div>
          <span className="text-xs sm:text-sm mt-2 font-medium opacity-90">Days</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className={cn(
            'w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-lg',
            getNumberStyles()
          )}>
            {timeLeft.hours}
          </div>
          <span className="text-xs sm:text-sm mt-2 font-medium opacity-90">Hours</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className={cn(
            'w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-lg',
            getNumberStyles()
          )}>
            {timeLeft.minutes}
          </div>
          <span className="text-xs sm:text-sm mt-2 font-medium opacity-90">Minutes</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className={cn(
            'w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-lg',
            getNumberStyles()
          )}>
            {timeLeft.seconds}
          </div>
          <span className="text-xs sm:text-sm mt-2 font-medium opacity-90">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
