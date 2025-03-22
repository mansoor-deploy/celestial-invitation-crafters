
import React from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapLocationProps {
  address: string;
  className?: string;
  variant?: 'default' | 'eternal' | 'celestial' | 'sacred' | 'radiant';
}

const MapLocation: React.FC<MapLocationProps> = ({ 
  address, 
  className,
  variant = 'default'
}) => {
  // Function to encode the address for the Google Maps URL
  const getGoogleMapsUrl = (address: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
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
        return 'bg-primary hover:bg-primary/80 text-primary-foreground';
    }
  };

  return (
    <a 
      href={getGoogleMapsUrl(address)} 
      target="_blank" 
      rel="noopener noreferrer"
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300',
        getButtonStyles(),
        className
      )}
    >
      <MapPin className="h-4 w-4" />
      <span>View Location</span>
    </a>
  );
};

export default MapLocation;
