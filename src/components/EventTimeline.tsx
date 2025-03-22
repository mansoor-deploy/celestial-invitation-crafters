
import React from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Event {
  id: number;
  title: string;
  time: string;
  date: string;
  description: string;
}

interface EventTimelineProps {
  events: Event[];
  className?: string;
  variant?: 'default' | 'eternal' | 'celestial' | 'sacred' | 'radiant';
}

const EventTimeline: React.FC<EventTimelineProps> = ({
  events,
  className,
  variant = 'default'
}) => {
  const getContainerStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'bg-eternal-tertiary/60 border-eternal-primary/30';
      case 'celestial':
        return 'bg-celestial-tertiary/60 border-celestial-primary/30';
      case 'sacred':
        return 'bg-sacred-tertiary/50 border-sacred-primary/30';
      case 'radiant':
        return 'bg-radiant-secondary/50 border-radiant-tertiary/30';
      default:
        return 'bg-white/80 border-gray-200';
    }
  };

  const getTitleStyles = () => {
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

  const getTimelineStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'border-eternal-primary';
      case 'celestial':
        return 'border-celestial-primary';
      case 'sacred':
        return 'border-sacred-primary';
      case 'radiant':
        return 'border-radiant-primary';
      default:
        return 'border-primary';
    }
  };

  const getDotStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'bg-eternal-primary border-eternal-tertiary';
      case 'celestial':
        return 'bg-celestial-primary border-celestial-tertiary';
      case 'sacred':
        return 'bg-sacred-primary border-sacred-tertiary';
      case 'radiant':
        return 'bg-radiant-primary border-radiant-tertiary';
      default:
        return 'bg-primary border-white';
    }
  };

  const getEventCardStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'bg-white/70 border-eternal-primary/20';
      case 'celestial':
        return 'bg-white/70 border-celestial-primary/20';
      case 'sacred':
        return 'bg-white/70 border-sacred-primary/20';
      case 'radiant':
        return 'bg-white/70 border-radiant-primary/20';
      default:
        return 'bg-white/70 border-gray-200';
    }
  };

  const getEventTimeStyles = () => {
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
      'p-6 rounded-lg backdrop-blur-sm border',
      getContainerStyles(),
      className
    )}>
      <h3 className={cn(
        'text-xl sm:text-2xl font-medium mb-6 font-cormorant text-center',
        getTitleStyles()
      )}>
        Event Timeline
      </h3>
      
      <div className="relative pl-10">
        {/* Timeline line */}
        <div className={cn(
          'absolute left-4 top-0 bottom-0 w-0.5 border-l-2',
          getTimelineStyles()
        )} />
        
        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={event.id} className="relative group">
              {/* Timeline dot */}
              <div className={cn(
                'absolute -left-10 top-4 w-4 h-4 rounded-full border-2 transition-all duration-300 group-hover:scale-125',
                getDotStyles()
              )} />
              
              <div className={cn(
                'p-4 rounded-lg border shadow-sm transition-all duration-300 group-hover:shadow-md',
                getEventCardStyles()
              )}>
                <div className="flex flex-col sm:flex-row justify-between mb-2">
                  <h4 className="font-semibold text-lg">{event.title}</h4>
                  <div className="mt-1 sm:mt-0 flex items-center gap-2">
                    <span className="text-sm text-gray-500">{event.date}</span>
                    <span className={cn(
                      'px-2 py-0.5 rounded text-xs font-medium',
                      getEventTimeStyles()
                    )}>
                      {event.time}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventTimeline;
