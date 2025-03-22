
import React, { useEffect, useState } from 'react';
import PageLoader from '@/components/PageLoader';
import AddToCalendar from '@/components/AddToCalendar';
import MapLocation from '@/components/MapLocation';
import CountdownTimer from '@/components/CountdownTimer';
import RSVPForm from '@/components/RSVPForm';
import BlessingsWall from '@/components/BlessingsWall';
import PhotoGallery from '@/components/PhotoGallery';
import EventTimeline from '@/components/EventTimeline';
import Parallax from '@/components/Parallax';
import AnimatedPattern from '@/components/AnimatedPattern';
import { cn } from '@/lib/utils';
import { Music, PauseCircle, PlayCircle } from 'lucide-react';

// Example data
const EVENT = {
  title: "Mohammed & Aisha's Wedding",
  description: "Join us for our Nikah ceremony and Walima celebration.",
  startDate: new Date('2024-09-20T15:00:00'),
  endDate: new Date('2024-09-20T23:00:00'),
  location: "Azure Palace, 456 Ocean Avenue, Miami, FL 33101",
};

const PHOTOS = [
  { id: 1, src: "https://images.unsplash.com/photo-1619650277752-9b853abf815b", alt: "Engagement Photo 1" },
  { id: 2, src: "https://images.unsplash.com/photo-1590099231782-30f736968761", alt: "Engagement Photo 2" },
  { id: 3, src: "https://images.unsplash.com/photo-1620619767641-acf922eb0ce6", alt: "Engagement Photo 3" },
  { id: 4, src: "https://images.unsplash.com/photo-1592842286127-c189bf7bfdb5", alt: "Engagement Photo 4" },
  { id: 5, src: "https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac", alt: "Engagement Photo 5" },
  { id: 6, src: "https://images.unsplash.com/photo-1543169108-32ac15a21e05", alt: "Engagement Photo 6" },
  { id: 7, src: "https://images.unsplash.com/photo-1609154767012-331529e7d73b", alt: "Engagement Photo 7" },
  { id: 8, src: "https://images.unsplash.com/photo-1611358382700-7498661649e3", alt: "Engagement Photo 8" },
];

const EVENTS = [
  {
    id: 1,
    title: "Henna Night",
    time: "19:00",
    date: "September 18, 2024",
    description: "A night of traditional henna application and celebration for the bride and female guests."
  },
  {
    id: 2,
    title: "Nikah Ceremony",
    time: "15:00",
    date: "September 20, 2024",
    description: "The Islamic marriage ceremony at the Azure Palace main hall."
  },
  {
    id: 3,
    title: "Walima Reception",
    time: "19:00",
    date: "September 20, 2024",
    description: "Grand wedding reception with dinner and entertainment to celebrate our union."
  }
];

const CelestialImaan: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    // Initialize audio element
    const audio = new Audio('/audio/background-nasheed.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    setAudioElement(audio);

    return () => {
      clearTimeout(timer);
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioElement) return;
    
    if (isAudioPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <div className="min-h-screen bg-celestial-tertiary overflow-x-hidden">
      <PageLoader template="celestial" />

      {isLoaded && (
        <>
          {/* Audio Control */}
          <div className="fixed bottom-6 right-6 z-50">
            <button 
              onClick={toggleAudio}
              className="bg-celestial-primary/90 hover:bg-celestial-primary p-3 rounded-full text-white shadow-lg transition-all duration-300 flex items-center justify-center"
              aria-label={isAudioPlaying ? 'Pause music' : 'Play music'}
            >
              {isAudioPlaying ? (
                <PauseCircle className="w-6 h-6" />
              ) : (
                <Music className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Hero Section */}
          <section className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-celestial-accent/30 via-celestial-primary/20 to-celestial-tertiary z-0"></div>
            
            <AnimatedPattern variant="celestial" className="opacity-5" />
            
            <Parallax speed={0.1} className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-[10%] left-[15%] w-12 h-12 md:w-16 md:h-16 rounded-full bg-white opacity-10 animate-pulse" />
              <div className="absolute top-[20%] right-[10%] w-8 h-8 md:w-12 md:h-12 rounded-full bg-white opacity-10 animate-float" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-[15%] left-[20%] w-10 h-10 md:w-14 md:h-14 rounded-full bg-white opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-[25%] right-[25%] w-16 h-16 md:w-20 md:h-20 rounded-full bg-white opacity-10 animate-float" style={{ animationDelay: '1.5s' }} />
            </Parallax>

            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col items-center space-y-8">
                <div className="mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
                  <h3 className="text-center font-amiri text-celestial-tertiary text-xl md:text-2xl mb-2">بسم الله الرحمن الرحيم</h3>
                  <p className="text-center text-celestial-tertiary/90 font-cormorant text-lg md:text-xl italic">In the name of Allah, the Most Gracious, the Most Merciful</p>
                </div>
                
                <div className="text-center mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
                  <h1 className="font-playfair text-5xl md:text-7xl font-bold text-celestial-tertiary mb-4">
                    Wedded Bliss
                  </h1>
                  <div className="h-0.5 w-32 bg-celestial-secondary mx-auto mb-6"></div>
                  <h2 className="font-cormorant text-3xl md:text-4xl text-celestial-tertiary">Mohammed & Aisha</h2>
                </div>
                
                <div className="mb-10 animate-fade-in opacity-0" style={{ animationDelay: '0.9s' }}>
                  <p className="text-center text-celestial-tertiary/90 font-cormorant text-xl md:text-2xl px-4">
                    With the grace of Allah, together with our families, we invite you to our wedding celebration
                  </p>
                </div>
                
                <div className="animate-fade-in opacity-0" style={{ animationDelay: '1.2s' }}>
                  <div className="glass-card p-8 rounded-lg text-center max-w-lg">
                    <div className="mb-6">
                      <h3 className="font-amiri text-2xl text-celestial-tertiary mb-3">Nikah & Walima</h3>
                      <p className="font-cormorant text-xl mb-1 text-celestial-tertiary/90">September 20th, 2024</p>
                      <p className="font-cormorant text-lg mb-4 text-celestial-tertiary/90">Nikah at 3:00 PM / Walima at 7:00 PM</p>
                      <p className="font-cormorant text-md text-celestial-tertiary/80 mb-6">Azure Palace, Miami, FL</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <MapLocation 
                        address="Azure Palace, 456 Ocean Avenue, Miami, FL 33101" 
                        variant="celestial" 
                      />
                      <AddToCalendar 
                        event={EVENT} 
                        variant="celestial" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Countdown & RSVP Section */}
          <section className="py-20 bg-gradient-to-b from-celestial-tertiary to-celestial-primary/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-celestial-pattern opacity-5"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 items-stretch">
                  <div className="flex-1 animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
                    <CountdownTimer 
                      date={EVENT.startDate} 
                      title="The Celebration Begins In" 
                      variant="celestial" 
                      className="h-full celestial-hover-glow"
                    />
                  </div>
                  
                  <div className="flex-1 animate-slide-up opacity-0" style={{ animationDelay: '0.6s' }}>
                    <RSVPForm variant="celestial" className="h-full celestial-hover-glow" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Event Timeline & Special Rituals */}
          <section className="py-20 bg-gradient-to-b from-celestial-primary/10 to-celestial-tertiary relative overflow-hidden">
            <div className="absolute inset-0 bg-celestial-pattern opacity-5"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-celestial-accent mb-12 animate-fade-in opacity-0">
                  Our Wedding Journey
                </h2>
                
                <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
                  <EventTimeline events={EVENTS} variant="celestial" className="mb-16 celestial-hover-glow" />
                </div>
                
                <div className="bg-white/20 p-8 rounded-lg backdrop-blur-sm border border-celestial-primary/20 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
                  <h3 className="text-2xl font-playfair text-celestial-accent mb-4 text-center">Special Ritual - The Henna Night</h3>
                  
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3">
                      <div className="rounded-lg overflow-hidden shadow-lg celestial-hover-glow">
                        <img 
                          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a" 
                          alt="Henna Design" 
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <p className="font-cormorant text-lg text-gray-800 mb-4 leading-relaxed">
                        The henna night (or Laylat al-Henna) is a significant pre-wedding tradition where intricate henna designs are applied to the bride's hands and feet. It symbolizes beauty, joy, and offers blessings for the marriage.
                      </p>
                      <p className="font-cormorant text-lg text-gray-800 leading-relaxed">
                        Female family members and friends gather to celebrate with the bride through music, dancing, and sharing advice for married life. It's a beautiful ceremony of sisterhood and celebration before the wedding day.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery & Blessings Section */}
          <section className="py-20 bg-gradient-to-b from-celestial-tertiary to-celestial-primary/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-celestial-pattern opacity-5"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-celestial-accent mb-12 animate-fade-in opacity-0">
                  Our Moments Together
                </h2>
                
                <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
                  <PhotoGallery photos={PHOTOS} variant="celestial" className="mb-16 celestial-hover-glow" />
                </div>
                
                <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
                  <BlessingsWall variant="celestial" className="celestial-hover-glow" />
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-10 bg-celestial-accent text-celestial-tertiary">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-amiri text-2xl mb-2">Mohammed & Aisha</h2>
              <p className="font-cormorant mb-6">{new Date().getFullYear()}</p>
              <p className="font-cormorant text-sm opacity-80 max-w-2xl mx-auto">
                "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought." - Quran 30:21
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default CelestialImaan;
