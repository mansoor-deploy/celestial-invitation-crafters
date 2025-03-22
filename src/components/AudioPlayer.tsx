
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface AudioPlayerProps {
  audioSrc: string;
  variant?: 'eternal' | 'celestial' | 'sacred' | 'radiant';
  className?: string;
  autoPlay?: boolean;
  volume?: number;
  stopPlayback?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioSrc,
  variant = 'eternal',
  className,
  autoPlay = false,
  volume = 0.4,
  stopPlayback = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'auto';
    
    audio.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
      if (autoPlay && !isMobile) {
        audio.play().catch(() => {
          console.log('Auto-play prevented by browser policy');
        });
        setIsPlaying(true);
      }
    });
    
    audioRef.current = audio;
    
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audioSrc, autoPlay, volume, isMobile]);

  // Effect to handle external stop playback request
  useEffect(() => {
    if (stopPlayback && isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [stopPlayback, isPlaying]);

  const toggleAudio = () => {
    if (!audioRef.current || !isLoaded) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => {
        console.error('Error playing audio:', err);
      });
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current || !isLoaded) return;
    
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const getButtonStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'bg-eternal-primary/90 hover:bg-eternal-primary text-eternal-tertiary';
      case 'celestial':
        return 'bg-celestial-primary/90 hover:bg-celestial-primary text-celestial-tertiary';
      case 'sacred':
        return 'bg-sacred-primary/90 hover:bg-sacred-primary text-sacred-tertiary';
      case 'radiant':
        return 'bg-radiant-primary/90 hover:bg-radiant-primary text-radiant-tertiary';
      default:
        return 'bg-primary/90 hover:bg-primary text-white';
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || !isPlaying) {
      return <VolumeX className="w-6 h-6" />;
    } else {
      return isPlaying ? <Volume2 className="w-6 h-6" /> : <Volume1 className="w-6 h-6" />;
    }
  };

  if (!isLoaded) return null;

  return (
    <div className={cn('fixed bottom-6 right-6 z-50', className)}>
      <button 
        onClick={toggleAudio}
        className={cn(
          'p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center',
          getButtonStyles()
        )}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {getVolumeIcon()}
      </button>
    </div>
  );
};

export default AudioPlayer;
