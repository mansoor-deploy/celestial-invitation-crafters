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

const EVENT = {
  title: "Yusuf & Zainab's Wedding",
  description: "Join us for our Nikah ceremony and Walima celebration.",
  startDate: new Date('2024-10-12T16:00:00'),
  endDate: new Date('2024-10-12T23:00:00'),
  location: "Emerald Palace, 789 Crescent Dr, Chicago, IL 60601",
};

const COUPLE = {
  partner1: "Yusuf",
  partner2: "Zainab"
};

const PHOTOS = [
  { id: 1, src: "https://images.unsplash.com/photo-1604017427527-31168072792c", alt: "Engagement Photo 1" },
  { id: 2, src: "https://images.unsplash.com/photo-1593696954577-1ac5b738a146", alt: "Engagement Photo 2" },
  { id: 3, src: "https://images.unsplash.com/photo-1620149776465-e18f0e913098", alt: "Engagement Photo 3" },
  { id: 4, src: "https://images.unsplash.com/photo-1545231565-4f5cf23ad0e1", alt: "Engagement Photo 4" },
  { id: 5, src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff", alt: "Engagement Photo 5" },
  { id: 6, src: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f", alt: "Engagement Photo 6" },
];

const EVENTS = [
  {
    id: 1,
    title: "Engagement Ceremony",
    time: "18:00",
    date: "October 5, 2024",
    description: "The official engagement ceremony at the couple's family home."
  },
  {
    id: 2,
    title: "Mehndi Night",
    time: "19:00",
    date: "October 10, 2024",
    description: "Traditional henna ceremony for the bride and close female family members and friends."
  },
  {
    id: 3,
    title: "Nikah Ceremony",
    time: "16:00",
    date: "October 12, 2024",
    description: "The Islamic marriage ceremony at Emerald Palace."
  },
  {
    id: 4,
    title: "Walima Reception",
    time: "19:00",
    date: "October 12, 2024",
    description: "Grand wedding reception with dinner and entertainment."
  }
];

const OUR_STORY = [
  {
    title: "How We Met",
    content: "We first met at a community service event organized by our local masjid. Yusuf was volunteering to teach children, and Zainab was coordinating the program. Our shared passion for community service created an immediate connection.",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a"
  },
  {
    title: "The Proposal",
    content: "After getting our families' blessings, Yusuf proposed during sunset at a beautiful Islamic garden. He had arranged for both families to be waiting nearby to celebrate together afterward.",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b"
  },
  {
    title: "Our Future",
    content: "We look forward to building a life together based on mutual respect, faith, and love. We hope to create a home filled with peace, joy, and blessings, Insha'Allah.",
    image: "https://images.unsplash.com/photo-1469571486292-b53601020a54"
  }
];

const SacredBond: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const isMobile = useIsMobile();
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sectionRefs.current.forEach((section) => {
        if (!section) return;
        
        const offset = section.offsetTop;
        const height = section.offsetHeight;
        
        if (scrollPosition >= offset && scrollPosition < offset + height) {
          section.classList.add('sacred-active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded]);

  const storyTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    
    storyTimer.current = setInterval(() => {
      setActiveStoryIndex((prev) => (prev + 1) % OUR_STORY.length);
    }, 8000);
    
    return () => {
      if (storyTimer.current) clearInterval(storyTimer.current);
    };
  }, [isLoaded, OUR_STORY.length]);

  const handleStoryClick = (index: number) => {
    setActiveStoryIndex(index);
    
    if (storyTimer.current) clearInterval(storyTimer.current);
    storyTimer.current = setInterval(() => {
      setActiveStoryIndex((prev) => (prev + 1) % OUR_STORY.length);
    }, 8000);
  };

  return (
    <div className="min-h-screen bg-sacred-tertiary overflow-x-hidden">
      <EnhancedLoader template="sacred" />
      
      {isLoaded && (
        <>
          <AudioPlayer audioSrc="/audio/background-nasheed.mp3" variant="sacred" />
          
          {/* Hero Section */}
          <section className="relative min-h-[100vh] flex flex-col items-center justify-center py-12 px-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-sacred-primary/30 via-sacred-secondary/10 to-transparent z-0"></div>
            
            <EnhancedPattern variant="sacred" intensity="medium" />
            
            <Parallax speed={0.15} className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-1/4 left-0 w-full h-px bg-sacred-tertiary/20"></div>
              <div className="absolute top-1/2 left-0 w-full h-px bg-sacred-tertiary/20"></div>
              <div className="absolute top-3/4 left-0 w-full h-px bg-sacred-tertiary/20"></div>
              
              <div className="absolute top-0 left-1/4 w-px h-full bg-sacred-tertiary/20"></div>
              <div className="absolute top-0 left-1/2 w-px h-full bg-sacred-tertiary/20"></div>
              <div className="absolute top-0 left-3/4 w-px h-full bg-sacred-tertiary/20"></div>
            </Parallax>
            
            <div className="relative z-10 w-full max-w-6xl mx-auto">
              <div className="flex flex-col items-center">
                <div 
                  className="mb-6 opacity-0 transform translate-y-8 transition-all duration-1000"
                  style={{ animationName: 'fadeIn', animationDuration: '1s', animationDelay: '0.3s', animationFillMode: 'forwards' }}
                >
                  <h3 className="text-center font-amiri text-sacred-primary text-xl md:text-2xl mb-2">بسم الله الرحمن الرحيم</h3>
                  <p className="text-center text-sacred-primary/80 font-cormorant text-lg md:text-xl italic">In the name of Allah, the Most Gracious, the Most Merciful</p>
                </div>
                
                <div 
                  className="text-center mb-6 opacity-0 transform translate-y-8 transition-all duration-1000"
                  style={{ animationName: 'fadeIn', animationDuration: '1s', animationDelay: '0.6s', animationFillMode: 'forwards' }}
                >
                  <h1 className="font-playfair text-5xl md:text-7xl font-bold text-sacred-secondary mb-4">
                    Sacred Bond
                  </h1>
                  <div className="h-0.5 w-32 bg-sacred-tertiary mx-auto mb-4"></div>
                  <h2 className="font-cormorant text-3xl md:text-4xl text-sacred-primary">Yusuf & Zainab</h2>
                </div>
                
                <div 
                  className="mb-8 opacity-0 transform translate-y-8 transition-all duration-1000"
                  style={{ animationName: 'fadeIn', animationDuration: '1s', animationDelay: '0.9s', animationFillMode: 'forwards' }}
                >
                  <p className="text-center text-sacred-primary/90 font-cormorant text-xl md:text-2xl max-w-2xl mx-auto">
                    We joyfully invite you to witness our union in marriage as we embark on our journey together with Allah's blessings
                  </p>
                </div>
                
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full max-w-3xl opacity-0 transform translate-y-8 transition-all duration-1000"
                  style={{ animationName: 'fadeIn', animationDuration: '1s', animationDelay: '1.2s', animationFillMode: 'forwards' }}
                >
                  <div className="bg-white/50 rounded-lg p-6 backdrop-blur-sm border border-sacred-primary/20 text-center shadow-md hover:shadow-lg transition-all">
                    <h3 className="font-amiri text-2xl text-sacred-secondary mb-2">Nikah Ceremony</h3>
                    <p className="font-cormorant text-xl mb-1">October 12th, 2024</p>
                    <p className="font-cormorant text-lg mb-2">4:00 PM</p>
                    <p className="font-cormorant text-md text-sacred-primary/80 mb-3">Emerald Palace, Main Hall</p>
                    <MapLocation 
                      address="Emerald Palace, 789 Crescent Dr, Chicago, IL 60601" 
                      variant="sacred" 
                    />
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-6 backdrop-blur-sm border border-sacred-primary/20 text-center shadow-md hover:shadow-lg transition-all">
                    <h3 className="font-amiri text-2xl text-sacred-secondary mb-2">Walima Reception</h3>
                    <p className="font-cormorant text-xl mb-1">October 12th, 2024</p>
                    <p className="font-cormorant text-lg mb-2">7:00 PM</p>
                    <p className="font-cormorant text-md text-sacred-primary/80 mb-3">Emerald Palace, Grand Ballroom</p>
                    <AddToCalendar 
                      event={EVENT} 
                      variant="sacred" 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-sacred-primary opacity-70">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </section>

          {/* Our Story Section */}
          <section 
            className="py-12 md:py-20 bg-gradient-to-b from-sacred-tertiary to-sacred-primary/5 relative overflow-hidden px-4 transition-all duration-700"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current[0] = el)}
          >
            <EnhancedPattern variant="sacred" intensity="light" />
            
            <div className="w-full max-w-6xl mx-auto relative z-10">
              <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-sacred-secondary mb-10">
                Our Journey Together
              </h2>

              <div className="bg-white/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-sacred-primary/20 shadow-lg">
                <div className="flex gap-3 md:gap-4 mb-6 justify-center">
                  {OUR_STORY.map((story, index) => (
                    <button
                      key={index}
                      onClick={() => handleStoryClick(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeStoryIndex === index ? 'bg-sacred-secondary w-6' : 'bg-sacred-primary/30'
                      }`}
                      aria-label={`Story ${index + 1}: ${story.title}`}
                    />
                  ))}
                </div>
                
                <div className="overflow-hidden">
                  <div 
                    className="transition-all duration-500 ease-out"
                    style={{ transform: `translateX(-${activeStoryIndex * 100}%)` }}
                  >
                    <div className="flex flex-nowrap">
                      {OUR_STORY.map((story, index) => (
                        <div 
                          key={index} 
                          className="w-full flex-shrink-0 flex flex-col md:flex-row gap-6 items-center"
                        >
                          <div className="md:w-1/3">
                            <div className="rounded-lg overflow-hidden shadow-md sacred-image-zoom">
                              <img 
                                src={story.image} 
                                alt={story.title} 
                                className="w-full h-60 md:h-80 object-cover transition-transform duration-700"
                              />
                            </div>
                          </div>
                          
                          <div className="md:w-2/3">
                            <h3 className="text-xl md:text-2xl font-playfair text-sacred-secondary mb-4">{story.title}</h3>
                            <p className="font-cormorant text-lg text-gray-700 leading-relaxed">{story.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RSVP & Countdown Section */}
          <section 
            className="py-12 md:py-20 bg-gradient-to-b from-sacred-primary/5 to-sacred-tertiary relative overflow-hidden px-4 transition-all duration-700"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current[1] = el)}
          >
            <EnhancedPattern variant="sacred" intensity="light" />
            
            <div className="w-full max-w-6xl mx-auto relative z-10">
              <div className="flex flex-col md:flex-row gap-6 items-stretch">
                <div className="flex-1 shadow-md hover:shadow-xl transition-all duration-300">
                  <CountdownTimer 
                    date={EVENT.startDate} 
                    title="Counting Down to Our Union" 
                    variant="sacred" 
                    className="h-full"
                  />
                </div>
                
                <div className="flex-1 shadow-md hover:shadow-xl transition-all duration-300">
                  <RSVPForm variant="sacred" className="h-full" />
                </div>
              </div>
            </div>
          </section>

          {/* Wedding Events Timeline */}
          <section 
            className="py-12 md:py-20 bg-gradient-to-b from-sacred-tertiary to-sacred-primary/5 relative overflow-hidden px-4 transition-all duration-700"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current[2] = el)}
          >
            <EnhancedPattern variant="sacred" intensity="light" />
            
            <div className="w-full max-w-6xl mx-auto relative z-10">
              <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-sacred-secondary mb-10">
                Wedding Events
              </h2>
              
              <div className="shadow-md hover:shadow-xl transition-all duration-300">
                <EventTimeline events={EVENTS} variant="sacred" />
              </div>
            </div>
          </section>

          {/* Interactive Quiz Section */}
          <section 
            className="py-12 md:py-20 bg-gradient-to-b from-sacred-primary/5 to-sacred-tertiary relative overflow-hidden px-4 transition-all duration-700"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current[3] = el)}
          >
            <EnhancedPattern variant="sacred" intensity="light" />
            
            <div className="w-full max-w-3xl mx-auto relative z-10">
              <div className="shadow-md hover:shadow-xl transition-all duration-300">
                <WeddingQuiz variant="sacred" coupleNames={COUPLE} />
              </div>
            </div>
          </section>

          {/* Photo Gallery & Blessings */}
          <section 
            className="py-12 md:py-20 bg-gradient-to-b from-sacred-tertiary to-sacred-primary/5 relative overflow-hidden px-4 transition-all duration-700"
            ref={(el: HTMLDivElement | null) => (sectionRefs.current[4] = el)}
          >
            <EnhancedPattern variant="sacred" intensity="light" />
            
            <div className="w-full max-w-6xl mx-auto relative z-10">
              <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-sacred-secondary mb-10">
                Our Memories
              </h2>
              
              <div className="mb-16 shadow-md hover:shadow-xl transition-all duration-300">
                <PhotoGallery photos={PHOTOS} variant="sacred" className="sacred-image-zoom" />
              </div>
              
              <div className="shadow-md hover:shadow-xl transition-all duration-300">
                <BlessingsWall variant="sacred" />
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-10 bg-sacred-primary text-sacred-tertiary">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-amiri text-2xl mb-2">Yusuf & Zainab</h2>
              <p className="font-cormorant mb-4">{new Date().getFullYear()}</p>
              <p className="font-cormorant text-sm opacity-80 max-w-2xl mx-auto">
                "And one of His signs is that He created mates for you from yourselves that you may find tranquility in them, and He placed between you affection and mercy. Indeed in that are signs for a people who give thought." - Quran 30:21
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default SacredBond;
