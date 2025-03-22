
import React, { useState } from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AddToCalendarProps {
  event: {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: string;
  };
  className?: string;
  variant?: 'default' | 'eternal' | 'celestial' | 'sacred' | 'radiant';
}

const AddToCalendar: React.FC<AddToCalendarProps> = ({ 
  event, 
  className,
  variant = 'default'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const getGoogleCalendarUrl = () => {
    const startTime = formatDate(event.startDate);
    const endTime = formatDate(event.endDate);
    
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&sf=true&output=xml`;
  };

  const getOutlookCalendarUrl = () => {
    const startTime = formatDate(event.startDate);
    const endTime = formatDate(event.endDate);
    
    return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${startTime}&enddt=${endTime}&body=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
  };

  const getYahooCalendarUrl = () => {
    const startTime = formatDate(event.startDate);
    const endTime = formatDate(event.endDate);
    const duration = Math.floor((event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60 * 60));
    
    return `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${encodeURIComponent(event.title)}&st=${startTime}&dur=${duration}&desc=${encodeURIComponent(event.description)}&in_loc=${encodeURIComponent(event.location)}`;
  };

  const getICalendarUrl = () => {
    const startTime = formatDate(event.startDate);
    const endTime = formatDate(event.endDate);
    
    const iCalContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${startTime}`,
      `DTEND:${endTime}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');
    
    const blob = new Blob([iCalContent], { type: 'text/calendar;charset=utf-8' });
    return URL.createObjectURL(blob);
  };

  const getButtonStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'bg-eternal-primary hover:bg-eternal-accent text-eternal-tertiary';
      case 'celestial':
        return 'bg-celestial-primary hover:bg-celestial-accent text-celestial-tertiary';
      case 'sacred':
        return 'bg-sacred-primary hover:bg-sacred-accent text-sacred-tertiary';
      case 'radiant':
        return 'bg-radiant-primary hover:bg-radiant-accent text-radiant-tertiary';
      default:
        return '';
    }
  };

  const getLinkStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'text-eternal-primary hover:text-eternal-accent';
      case 'celestial':
        return 'text-celestial-primary hover:text-celestial-accent';
      case 'sacred':
        return 'text-sacred-primary hover:text-sacred-accent';
      case 'radiant':
        return 'text-radiant-primary hover:text-radiant-accent';
      default:
        return '';
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn('flex items-center gap-2 transition-all duration-300', getButtonStyles(), className)}
        >
          <Calendar className="h-4 w-4" />
          <span>Add to Calendar</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-4 rounded-lg shadow-lg bg-white/95 backdrop-blur-sm">
        <div className="flex flex-col gap-2">
          <h3 className="font-cormorant text-lg mb-2 border-b pb-2">Choose your calendar</h3>
          <a 
            href={getGoogleCalendarUrl()} 
            target="_blank" 
            rel="noopener noreferrer"
            className={cn("flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-gray-100 transition-colors", getLinkStyles())}
          >
            <ExternalLink className="h-4 w-4" />
            <span>Google Calendar</span>
          </a>
          <a 
            href={getOutlookCalendarUrl()} 
            target="_blank" 
            rel="noopener noreferrer"
            className={cn("flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-gray-100 transition-colors", getLinkStyles())}
          >
            <ExternalLink className="h-4 w-4" />
            <span>Outlook Calendar</span>
          </a>
          <a 
            href={getYahooCalendarUrl()} 
            target="_blank" 
            rel="noopener noreferrer"
            className={cn("flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-gray-100 transition-colors", getLinkStyles())}
          >
            <ExternalLink className="h-4 w-4" />
            <span>Yahoo Calendar</span>
          </a>
          <a 
            href={getICalendarUrl()} 
            download="event.ics"
            className={cn("flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-gray-100 transition-colors", getLinkStyles())}
          >
            <ExternalLink className="h-4 w-4" />
            <span>Download .ics</span>
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddToCalendar;
