
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface Photo {
  id: number;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface PhotoGalleryProps {
  photos: Photo[];
  className?: string;
  variant?: 'default' | 'eternal' | 'celestial' | 'sacred' | 'radiant';
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ 
  photos, 
  className,
  variant = 'default'
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = '';
  };

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

  const getPhotoStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'border-eternal-primary/20 hover:border-eternal-primary/50';
      case 'celestial':
        return 'border-celestial-primary/20 hover:border-celestial-primary/50';
      case 'sacred':
        return 'border-sacred-primary/20 hover:border-sacred-primary/50';
      case 'radiant':
        return 'border-radiant-primary/20 hover:border-radiant-tertiary/50';
      default:
        return 'border-gray-200 hover:border-gray-300';
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

  return (
    <div className={cn(
      'p-6 rounded-lg backdrop-blur-sm border',
      getContainerStyles(),
      className
    )}>
      <h3 className={cn(
        'text-xl sm:text-2xl font-medium mb-4 font-cormorant text-center',
        getTitleStyles()
      )}>
        Photo Gallery
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {photos.map((photo) => (
          <div 
            key={photo.id}
            className={cn(
              'cursor-pointer overflow-hidden rounded-md border aspect-square transition-all duration-300 hover:shadow-lg',
              getPhotoStyles()
            )}
            onClick={() => openLightbox(photo)}
          >
            <img 
              src={photo.src} 
              alt={photo.alt} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        ))}
      </div>
      
      {/* Lightbox */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-2 right-2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors z-10"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={selectedPhoto.src} 
              alt={selectedPhoto.alt} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
