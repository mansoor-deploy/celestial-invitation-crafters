
import React, { useEffect, useState, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import EnhancedLoader from '@/components/EnhancedLoader';
import AudioPlayer from '@/components/AudioPlayer';
import AddToCalendar from '@/components/AddToCalendar';
import MapLocation from '@/components/MapLocation';
import CountdownTimer from '@/components/CountdownTimer';
import RSVPForm from '@/components/RSVPForm';
import BlessingsWall from '@/components/BlessingsWall';
import PhotoGallery from '@/components/PhotoGallery';
import EventTimeline from '@/components/EventTimeline';
import Parallax from '@/components/Parallax';
import EnhancedPattern from '@/components/EnhancedPattern';
import WeddingQuiz from '@/components/WeddingQuiz';
import { cn } from '@/lib/utils';

// Example data
const EVENT = {
  title: "Mohammed & Aisha's Wedding",
  description: "Join us for our Nikah ceremony and Walima celebration.",
  startDate: new Date('2024-09-20T15:00:00'),
  endDate: new Date('2024-09-20T23:00:00'),
  location: "Azure Palace, 456 Ocean Avenue, Miami, FL 33101",
};

const COUPLE = {
  partner1: "Mohammed",
  partner2: "Aisha"
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
  const [contentReady, setContentReady] = useState(false);
  const [stopBackgroundMusic, setStopBackgroundMusic] = useState(false);
  const isMobile = useIsMobile();
  const mainRef = useRef<HTMLDivElement>(null);
  
  const handleVideoPlay = () => {
    console.log("Video play triggered, stopping background music");
    setStopBackgroundMusic(true);
  };

  const handleLoaderComplete = () => {
    setContentReady(true);
  };

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!contentReady || !mainRef.current) return;
    
    // Add scroll animations
    const animatedElements = mainRef.current.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.getAttribute('data-delay') || '0';
            setTimeout(() => {
              el.classList.add('animate-fade-in');
            }, parseInt(delay));
          }
        });
      },
      { threshold: 0.1 }
    );
    
    animatedElements.forEach((el) => observer.observe(el));
    
    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, [contentReady]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#102956] via-[#183a7e] to-[#f0f8ff] overflow-x-hidden" ref={mainRef}>
      {!contentReady && <EnhancedLoader template="celestial" onLoadComplete={handleLoaderComplete} />}
      
      {contentReady && (
        <>
          <AudioPlayer 
            audioSrc="/audio/background-nasheed.mp3" 
            variant="celestial" 
            autoPlay={true}
            stopPlayback={stopBackgroundMusic}
          />
          
          {/* Hero Section */}
          <section className="relative min-h-[100vh] flex flex-col items-center justify-center py-12 px-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#102956]/80 via-[#183a7e]/70 to-[#1e4598]/60 z-0"></div>
            
            <EnhancedPattern variant="celestial" intensity="medium" />
            
            <Parallax speed={0.1} className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-[10%] left-[15%] w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#6a8cff] opacity-20 animate-pulse" />
              <div className="absolute top-[20%] right-[10%] w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#6a8cff] opacity-20 animate-float" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-[15%] left-[20%] w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#6a8cff] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-[25%] right-[25%] w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#6a8cff] opacity-20 animate-float" style={{ animationDelay: '1.5s' }} />
            </Parallax>

            <div className="w-full max-w-6xl mx-auto relative z-10">
              <div className="flex flex-col items-center">
                <div className="mb-6 animate-on-scroll" data-delay="300">
                  <h3 className="text-center font-amiri text-white text-xl md:text-2xl mb-2">بسم الله الرحمن الرحيم</h3>
                  <p className="text-center text-white/90 font-cormorant text-lg md:text-xl italic">In the name of Allah, the Most Gracious, the Most Merciful</p>
                </div>
                
                <div className="text-center mb-6 animate-on-scroll" data-delay="600">
                  <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-4">
                    Wedded Bliss
                  </h1>
                  <div className="h-0.5 w-32 bg-white mx-auto mb-4"></div>
                  <h2 className="font-cormorant text-3xl md:text-4xl text-white/90">Mohammed & Aisha</h2>
                </div>
                
                <div className="mb-8 animate-on-scroll" data-delay="900">
                  <p className="text-center text-white/90 font-cormorant text-xl md:text-2xl px-4">
                    With the grace of Allah, together with our families, we invite you to our wedding celebration
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-3xl animate-on-scroll" data-delay="1200">
                  <div className="bg-gradient-to-br from-white/20 to-white/10 p-6 rounded-xl backdrop-blur-md border border-white/20 text-center shadow-lg hover:shadow-xl transition-all">
                    <h3 className="font-amiri text-2xl text-white mb-2">Nikah Ceremony</h3>
                    <p className="font-cormorant text-xl mb-1 text-white/90">September 20th, 2024</p>
                    <p className="font-cormorant text-lg mb-2 text-white/90">3:00 PM</p>
                    <p className="font-cormorant text-md text-white/80 mb-3">Azure Palace, Main Hall</p>
                    <MapLocation 
                      address="Azure Palace, 456 Ocean Avenue, Miami, FL 33101" 
                      variant="celestial" 
                    />
                  </div>
                  
                  <div className="bg-gradient-to-br from-white/20 to-white/10 p-6 rounded-xl backdrop-blur-md border border-white/20 text-center shadow-lg hover:shadow-xl transition-all">
                    <h3 className="font-amiri text-2xl text-white mb-2">Walima Reception</h3>
                    <p className="font-cormorant text-xl mb-1 text-white/90">September 20th, 2024</p>
                    <p className="font-cormorant text-lg mb-2 text-white/90">7:00 PM</p>
                    <p className="font-cormorant text-md text-white/80 mb-3">Azure Palace, Grand Ballroom</p>
                    <AddToCalendar 
                      event={EVENT} 
                      variant="celestial" 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white opacity-70">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </section>

          {/* Countdown & RSVP Section */}
          <section className="py-12 md:py-20 bg-gradient-to-b from-[#f0f8ff] to-[#e1f0fc] relative overflow-hidden px-4">
            <EnhancedPattern variant="celestial" intensity="light" />
            
            <div className="w-full max-w-6xl mx-auto relative z-10">
              <div className="flex flex-col md:flex-row gap-6 items-stretch">
                <div className="flex-1 animate-on-scroll shadow-md hover:shadow-xl transition-all duration-300" data-delay="300">
                  <CountdownTimer 
                    date={EVENT.startDate} 
                    title="The Celebration Begins In" 
                    variant="celestial" 
                    className="h-full celestial-hover-glow"
                  />
                </div>
                
                <div className="flex-1 animate-on-scroll shadow-md hover:shadow-xl transition-all duration-300" data-delay="600">
                  <RSVPForm variant="celestial" className="h-full celestial-hover-glow" />
                </div>
              </div>
            </div>
          </section>

          {/* Wedding Quiz - Interactive Section */}
          <section className="py-12 md:py-20 bg-gradient-to-b from-[#e1f0fc] to-[#c8e3f7] relative overflow-hidden px-4">
            <EnhancedPattern variant="celestial" intensity="light" />
            
            <div className="w-full max-w-3xl mx-auto relative z-10">
              <div className="animate-on-scroll shadow-md hover:shadow-xl transition-all duration-300" data-delay="300">
                <WeddingQuiz 
                  variant="celestial" 
                  coupleNames={COUPLE}
                  onVideoPlay={handleVideoPlay}
                />
              </div>
            </div>
          </section>

          {/* Event Timeline & Special Rituals */}
          <section className="py-12 md:py-20 bg-gradient-to-b from-[#c8e3f7] to-[#afd6f5] relative overflow-hidden px-4">
            <EnhancedPattern variant="celestial" intensity="light" />
            
            <div className="w-full max-w-6xl mx-auto relative z-10">
              <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-[#102956] mb-10 animate-on-scroll" data-delay="300">
                Our Wedding Journey
              </h2>
              
              <div className="animate-on-scroll shadow-md hover:shadow-xl transition-all duration-300" data-delay="600">
                <EventTimeline events={EVENTS} variant="celestial" className="mb-12 celestial-hover-glow" />
              </div>
              
              <div className="bg-gradient-to-br from-white/80 to-white/60 p-6 md:p-8 rounded-xl backdrop-blur-sm border border-[#3461ad]/20 shadow-md hover:shadow-xl transition-all animate-on-scroll" data-delay="900">
                <h3 className="text-2xl font-playfair text-[#102956] mb-4 text-center">Special Ritual - The Henna Night</h3>
                
                <div className="flex flex-col md:flex-row gap-6 items-center">
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
          </section>

          {/* Gallery & Blessings Section */}
          <section className="py-12 md:py-20 bg-gradient-to-b from-[#afd6f5] to-[#f0f8ff] relative overflow-hidden px-4">
            <EnhancedPattern variant="celestial" intensity="light" />
            
            <div className="w-full max-w-6xl mx-auto relative z-10">
              <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-[#102956] mb-10 animate-on-scroll" data-delay="300">
                Our Moments Together
              </h2>
              
              <div className="animate-on-scroll shadow-md hover:shadow-xl transition-all duration-300" data-delay="600">
                <PhotoGallery photos={PHOTOS} variant="celestial" className="mb-12 celestial-hover-glow" />
              </div>
              
              <div className="animate-on-scroll shadow-md hover:shadow-xl transition-all duration-300" data-delay="900">
                <BlessingsWall variant="celestial" className="celestial-hover-glow" />
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-10 bg-gradient-to-b from-[#102956] to-[#0a1b38] text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-amiri text-2xl mb-2">Mohammed & Aisha</h2>
              <p className="font-cormorant mb-4">{new Date().getFullYear()}</p>
              <p className="font-cormorant text-sm md:text-base opacity-80 max-w-2xl mx-auto px-4">
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
