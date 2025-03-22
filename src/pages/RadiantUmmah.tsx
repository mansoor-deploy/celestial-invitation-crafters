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
import { ChevronDown } from 'lucide-react';

// Example data
const EVENT = {
  title: "Omar & Amina's Wedding",
  description: "Join us for our Nikah ceremony and Walima celebration.",
  startDate: new Date('2024-11-18T15:00:00'),
  endDate: new Date('2024-11-18T23:00:00'),
  location: "Royal Masjid Hall, 321 Gold Ave, Dallas, TX 75001",
};

const COUPLE = {
  partner1: "Omar",
  partner2: "Amina"
};

const PHOTOS = [
  { id: 1, src: "https://images.unsplash.com/photo-1583939411023-c23e7a2da61d", alt: "Engagement Photo 1" },
  { id: 2, src: "https://images.unsplash.com/photo-1604017011372-33f28e9076e5", alt: "Engagement Photo 2" },
  { id: 3, src: "https://images.unsplash.com/photo-1600096194735-ec70ba9d4d62", alt: "Engagement Photo 3" },
  { id: 4, src: "https://images.unsplash.com/photo-1597157639073-69284dc0fdaf", alt: "Engagement Photo 4" },
  { id: 5, src: "https://images.unsplash.com/photo-1600096194534-95f89c276803", alt: "Engagement Photo 5" },
  { id: 6, src: "https://images.unsplash.com/photo-1606098212405-b348450395c8", alt: "Engagement Photo 6" },
];

const EVENTS = [
  {
    id: 1,
    title: "Engagement",
    time: "18:00",
    date: "November 1, 2024",
    description: "The official engagement ceremony at Omar's family home."
  },
  {
    id: 2,
    title: "Mehndi Celebration",
    time: "19:00",
    date: "November 16, 2024",
    description: "Traditional henna ceremony with music and celebration."
  },
  {
    id: 3,
    title: "Nikah Ceremony",
    time: "15:00",
    date: "November 18, 2024",
    description: "The Islamic marriage ceremony at Royal Masjid Hall."
  },
  {
    id: 4,
    title: "Walima Reception",
    time: "19:00",
    date: "November 18, 2024",
    description: "Grand wedding reception to celebrate our union with family and friends."
  }
];

// Dua messages for the banner
const DUAS = [
  "May Allah grant you both happiness and fill your life with barakah.",
  "May your bond be blessed with love, compassion, and understanding.",
  "May Allah make your marriage a means of mercy and tranquility.",
  "May your union be filled with the light of faith and endless blessings.",
  "May Allah bless this marriage and keep you firm on the straight path.",
];

const RadiantUmmah: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [activeDua, setActiveDua] = useState(0);
  const isMobile = useIsMobile();
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  
  const sections = [
    { id: 'home', title: 'Home' },
    { id: 'invitation', title: 'Invitation' },
    { id: 'events', title: 'Events' },
    { id: 'gallery', title: 'Gallery' },
    { id: 'rsvp', title: 'RSVP' },
  ];
  
  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    
    // Track sections for navigation
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better UX
      
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        
        const offset = section.offsetTop;
        const height = section.offsetHeight;
        
        if (scrollPosition >= offset && scrollPosition < offset + height) {
          setCurrentSection(index);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    // Rotate through duas
    const duaInterval = setInterval(() => {
      setActiveDua((prev) => (prev + 1) % DUAS.length);
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(duaInterval);
    };
  }, [isLoaded]);

  const scrollToSection = (index: number) => {
    if (!sectionRefs.current[index]) return;
    
    window.scrollTo({
      top: sectionRefs.current[index]?.offsetTop,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-radiant-secondary overflow-x-hidden">
      <EnhancedLoader template="radiant" />
      
      {isLoaded && (
        <>
          <AudioPlayer audioSrc="/audio/background-nasheed.mp3" variant="radiant" />
          
          {/* Fixed Navigation */}
          <nav className="fixed top-0 left-0 w-full bg-radiant-primary/90 backdrop-blur-md z-50 text-radiant-secondary">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <div className="font-amiri text-xl">Omar & Amina</div>
                
                {!isMobile ? (
                  <div className="flex space-x-8">
                    {sections.map((section, index) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(index)}
                        className={`font-cormorant text-lg transition-all duration-300 ${
                          currentSection === index 
                            ? 'text-radiant-tertiary font-medium'
                            : 'text-radiant-secondary/90 hover:text-radiant-tertiary'
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="relative group">
                    <button className="flex items-center gap-1 text-radiant-tertiary">
                      <span>{sections[currentSection].title}</span>
                      <ChevronDown size={16} />
                    </button>
                    <div className="absolute right-0 w-36 mt-2 bg-radiant-primary border border-radiant-tertiary/20 rounded-md shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      {sections.map((section, index) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(index)}
                          className="block w-full text-left px-4 py-2 hover:bg-radiant-primary/80 transition-colors"
                        >
                          {section.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
          
          {/* Dua Banner */}
          <div className="bg-radiant-primary/20 backdrop-blur-sm text-radiant-primary border-y border-radiant-primary/10 py-2 px-4 fixed bottom-0 left-0 w-full z-40">
            <div className="max-w-6xl mx-auto">
              <div className="overflow-hidden h-6">
                <div 
                  className="transition-all duration-1000 ease-in-out"
                  style={{ transform: `translateY(-${activeDua * 1.5}rem)` }}
                >
                  {DUAS.map((dua, index) => (
                    <p key={index} className="text-center font-cormorant h-6">{dua}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Section */}
          <section 
            className="min-h-[100vh] pt-16 flex flex-col items-center justify-center py-12 px-4 overflow-hidden bg-gradient-to-b from-radiant-primary/40 via-radiant-primary/20 to-transparent"
            ref={(el) => (sectionRefs.current[0] = el as HTMLElement)}
            id="home"
          >
            <EnhancedPattern variant="radiant" intensity="medium" />
            
            <Parallax speed={0.1} className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-1/3 right-1/4 w-16 h-16 md:w-24 md:h-24 opacity-10">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50,0 L95,50 L50,100 L5,50 Z" stroke="currentColor" strokeWidth="1" className="text-radiant-tertiary" />
                </svg>
              </div>
              <div className="absolute bottom-1/4 left-1/5 w-24 h-24 md:w-32 md:h-32 opacity-10">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" className="text-radiant-tertiary" />
                </svg>
              </div>
              <div className="absolute top-2/3 right-1/6 w-20 h-20 md:w-28 md:h-28 opacity-10">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50,10 C50,35 35,50 10,50 C35,50 50,65 50,90 C50,65 65,50 90,50 C65,50 50,35 50,10 Z" stroke="currentColor" strokeWidth="1" className="text-radiant-tertiary" />
                </svg>
              </div>
            </Parallax>

            <div className="w-full max-w-6xl mx-auto relative z-10">
              <div className="flex flex-col items-center text-center">
                <div 
                  className="mb-6 opacity-0 animate-fade-in"
                  style={{ animationDelay: '0.3s' }}
                >
                  <h3 className="text-center font-amiri text-radiant-tertiary text-xl md:text-2xl mb-2">بسم الله الرحمن الرحيم</h3>
                  <p className="text-center text-radiant-tertiary/90 font-cormorant text-lg md:text-xl italic">In the name of Allah, the Most Gracious, the Most Merciful</p>
                </div>
                
                <div 
                  className="text-center mb-6 opacity-0 animate-fade-in"
                  style={{ animationDelay: '0.6s' }}
                >
                  <h1 className="font-playfair text-5xl md:text-7xl font-bold text-radiant-tertiary mb-4">
                    Radiant Union
                  </h1>
                  <div className="h-0.5 w-32 bg-radiant-tertiary mx-auto mb-4"></div>
                  <h2 className="font-cormorant text-3xl md:text-4xl text-radiant-tertiary">Omar & Amina</h2>
                </div>
                
                <div 
                  className="mb-8 opacity-0 animate-fade-in"
                  style={{ animationDelay: '0.9s' }}
                >
                  <p className="text-center text-radiant-tertiary/90 font-cormorant text-xl md:text-2xl max-w-2xl mx-auto px-4">
                    With hearts full of gratitude to Allah, we invite you to share in our joy as we unite in marriage
                  </p>
                </div>
                
                <div 
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: '1.2s' }}
                >
                  <button 
                    onClick={() => scrollToSection(1)} 
                    className="bg-radiant-tertiary text-radiant-primary px-6 py-3 rounded-md font-medium hover:bg-radiant-tertiary/90 transition-colors shadow-md hover:shadow-lg"
                  >
                    View Invitation
                  </button>
                </div>
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div 
              className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-radiant-tertiary opacity-70 opacity-0 animate-fade-in"
              style={{ animationDelay: '1.5s' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </section>

          {/* Invitation Details Section */}
          <section 
            className="py-20 px-4 bg-gradient-to-b from-radiant-primary/10 to-radiant-secondary relative overflow-hidden"
            ref={(el) => (sectionRefs.current[1] = el as HTMLElement)}
            id="invitation"
          >
            <EnhancedPattern variant="radiant" intensity="light" />
            
            <div className="w-full max-w-6xl mx-auto relative z-10">
              <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-radiant-primary mb-10 opacity-0 animate-fade-in">
                Wedding Invitation
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="bg-white/50 rounded-lg p-6 backdrop-blur-sm border border-radiant-primary/20 text-center shadow-md hover:shadow-lg transition-all">
                  <h3 className="font-amiri text-2xl text-radiant-primary mb-2">Nikah Ceremony</h3>
                  <p className="font-cormorant text-xl mb-1">November 18th, 2024</p>
                  <p className="font-cormorant text-lg mb-2">3:00 PM</p>
                  <p className="font-cormorant text-md text-radiant-primary/80 mb-3">Royal Masjid Hall, Main Prayer Hall</p>
                  <div className="mb-4">
                    <MapLocation 
                      address="Royal Masjid Hall, 321 Gold Ave, Dallas, TX 75001" 
                      variant="radiant" 
                    />
                  </div>
                  <div className="text-sm text-gray-600 mt-4 border-t border-radiant-primary/10 pt-4">
                    <p className="mb-2"><span className="font-medium">Dress Code:</span> Formal Islamic attire</p>
                    <p><span className="font-medium">Note:</span> Separate seating for men and women</p>
                  </div>
                </div>
                
                <div className="bg-white/50 rounded-lg p-6 backdrop-blur-sm border border-radiant-primary/20 text-center shadow-md hover:shadow-lg transition-all">
                  <h3 className="font-amiri text-2xl text-radiant-primary mb-2">Walima Reception</h3>
                  <p className="font-cormorant text-xl mb-1">November 18th, 2024</p>
                  <p className="font-cormorant text-lg mb-2">7:00 PM</p>
                  <p className="font-cormorant text-md text-radiant-primary/80 mb-3">Royal Masjid Hall, Celebration Ballroom</p>
                  <div className="mb-4">
                    <AddToCalendar 
                      event={EVENT} 
                      variant="radiant" 
                    />
                  </div>
                  <div className="text-sm text-gray-600 mt-4 border-t border-radiant-primary/10 pt-4">
                    <p className="mb-2"><span className="font-medium">Dinner:</span> Full buffet with halal options</p>
                    <p><span className="font-medium">Note:</span> Family-friendly celebration</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="shadow-md hover:shadow-lg transition-all">
                  <CountdownTimer 
                    date={EVENT.startDate} 
                    title="Counting Down to our Special Day" 
                    variant="radiant" 
                  />
                </div>
                
                <div className="shadow-md hover:shadow-lg transition-all">
                  <WeddingQuiz variant="radiant" coupleNames={COUPLE} />
                </div>
              </div>
            </div>
          </section>

          {/* Events Section */}
          <section 
            className="py-20 px-4 bg-gradient-to-b from-radiant-secondary to-radiant-primary/10 relative overflow-hidden"
            ref={(el) => (sectionRefs.current[2] = el as HTMLElement)}
            id="events"
          >
            <EnhancedPattern variant="radiant" intensity="light" />
            
            <div className="w-full max-w-6xl mx-auto relative z-10">
              <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-radiant-primary mb-10 opacity-0 animate-fade-in">
                Wedding Events
              </h2>
              
              <div className="shadow-md hover:shadow-lg transition-all opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <EventTimeline events={EVENTS} variant="radiant" />
              </div>
              
              <div className="mt-16 bg-white/60 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-radiant-primary/20 shadow-md opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <h3 className="text-2xl font-playfair text-radiant-primary mb-6 text-center">Our Love Story</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="rounded-full bg-radiant-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-radiant-primary text-2xl font-semibold">1</span>
                    </div>
                    <h4 className="font-medium text-lg mb-2">How We Met</h4>
                    <p className="text-gray-700">We first met at an Islamic charity event where we were both volunteers. Our shared values and commitment to serving others created an immediate connection.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="rounded-full bg-radiant-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-radiant-primary text-2xl font-semibold">2</span>
                    </div>
                    <h4 className="font-medium text-lg mb-2">Our Journey</h4>
                    <p className="text-gray-700">After a traditional courtship with our families' involvement, we discovered our compatibility and shared dreams for building a life centered on faith.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="rounded-full bg-radiant-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-radiant-primary text-2xl font-semibold">3</span>
                    </div>
                    <h4 className="font-medium text-lg mb-2">The Proposal</h4>
                    <p className="text-gray-700">Omar proposed during Ramadan after receiving the blessings of both families. It was a beautiful moment that honored our faith and traditions.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section 
            className="py-20 px-4 bg-gradient-to-b from-radiant-primary/10 to-radiant-secondary relative overflow-hidden"
            ref={(el) => (sectionRefs.current[3] = el as HTMLElement)}
            id="gallery"
          >
            <EnhancedPattern variant="radiant" intensity="light" />
            
            <div className="w-full max-w-6xl mx-auto relative z-10">
              <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-radiant-primary mb-10 opacity-0 animate-fade-in">
                Photo Gallery
              </h2>
              
              <div className="shadow-md hover:shadow-lg transition-all opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <PhotoGallery photos={PHOTOS} variant="radiant" />
              </div>
              
              <div className="mt-16 shadow-md hover:shadow-lg transition-all opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <BlessingsWall variant="radiant" />
              </div>
            </div>
          </section>

          {/* RSVP Section */}
          <section 
            className="py-20 px-4 bg-gradient-to-b from-radiant-secondary to-radiant-primary/10 relative overflow-hidden"
            ref={(el) => (sectionRefs.current[4] = el as HTMLElement)}
            id="rsvp"
          >
            <EnhancedPattern variant="radiant" intensity="light" />
            
            <div className="w-full max-w-3xl mx-auto relative z-10">
              <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-radiant-primary mb-10 opacity-0 animate-fade-in">
                RSVP
              </h2>
              
              <div className="shadow-md hover:shadow-lg transition-all opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <RSVPForm variant="radiant" />
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-10 bg-radiant-primary text-radiant-tertiary mt-12">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-amiri text-2xl mb-2">Omar & Amina</h2>
              <p className="font-cormorant mb-4">{new Date().getFullYear()}</p>
              <p className="font-cormorant text-sm opacity-80 max-w-2xl mx-auto">
                "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought." - Quran 30:21
              </p>
              
              <div className="mt-8 text-sm font-cormorant">
                <p>Created with love for our special day</p>
              </div>
            </div>
          </footer>
          
          {/* Space for the fixed dua banner */}
          <div className="h-10"></div>
        </>
      )}
    </div>
  );
};

export default RadiantUmmah;
