
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
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.loop = true;
      audio.volume = volume;
      audio.preload = 'auto';
      
      // Debug logs
      console.log('Audio player initialized with source:', audioSrc);
      
      audio.addEventListener('canplaythrough', () => {
        setIsLoaded(true);
        console.log('Audio loaded and ready to play');
        if (autoPlay && !isMobile) {
          audio.play().catch((err) => {
            console.log('Auto-play prevented by browser policy:', err);
          });
          setIsPlaying(true);
        }
      });
      
      audio.addEventListener('playing', () => {
        console.log('Audio is now playing');
        setIsPlaying(true);
      });
      
      audio.addEventListener('pause', () => {
        console.log('Audio is now paused');
        setIsPlaying(false);
      });
      
      audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
      });
      
      audioRef.current = audio;
      
      return () => {
        console.log('Cleaning up audio player');
        audio.pause();
        audio.src = '';
        audio.remove();
      };
    }
  }, [audioSrc, autoPlay, volume, isMobile]);

  // Effect to handle external stop playback request
  useEffect(() => {
    if (stopPlayback && isPlaying && audioRef.current) {
      console.log('External request to stop playback received');
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [stopPlayback, isPlaying]);

  const toggleAudio = () => {
    if (!audioRef.current || !isLoaded) return;
    
    console.log('Toggle audio button clicked, current state:', isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.error('Error playing audio:', err);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current || !isLoaded) return;
    
    console.log('Toggling mute, current state:', isMuted);
    
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
    if (isMuted) {
      return <VolumeX className="w-6 h-6" />;
    } else {
      return isPlaying ? <Volume2 className="w-6 h-6" /> : <Volume1 className="w-6 h-6" />;
    }
  };

  return (
    <div className={cn('fixed bottom-6 right-6 z-50 flex gap-3', className)}>
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
      <div className="text-xs font-medium text-gray-500 absolute -top-6 right-0 bg-white/80 px-2 py-1 rounded-md shadow-sm">
        {isPlaying ? (isMuted ? 'Muted' : 'Playing') : 'Paused'}
      </div>
    </div>
  );
};

export default AudioPlayer;
