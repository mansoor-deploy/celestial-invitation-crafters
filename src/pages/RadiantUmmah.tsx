
import React, { useEffect, useState, useRef } from 'react';
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

// Example data
const EVENT = {
  title: "Ibrahim & Noor's Wedding",
  description: "Join us for our Nikah ceremony and Walima celebration.",
  startDate: new Date('2024-11-15T15:00:00'),
  endDate: new Date('2024-11-15T23:00:00'),
  location: "Moonlight Gardens & Crescent Hall, 101 Starlight Drive, Chicago, IL 60601",
};

const PHOTOS = [
  { id: 1, src: "https://images.unsplash.com/photo-1606216794079-e7e5539bdb3f", alt: "Engagement Photo 1" },
  { id: 2, src: "https://images.unsplash.com/photo-1529636798458-92182e662485", alt: "Engagement Photo 2" },
  { id: 3, src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2", alt: "Engagement Photo 3" },
  { id: 4, src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c", alt: "Engagement Photo 4" },
  { id: 5, src: "https://images.unsplash.com/photo-1513267048331-5611cad62e41", alt: "Engagement Photo 5" },
  { id: 6, src: "https://images.unsplash.com/photo-1614548539924-5c1f205b3747", alt: "Engagement Photo 6" },
];

const EVENTS = [
  {
    id: 1,
    title: "Engagement Celebration",
    time: "19:00",
    date: "November 8, 2024",
    description: "An intimate gathering to celebrate our engagement with close family and friends."
  },
  {
    id: 2,
    title: "Nikah Ceremony",
    time: "15:00",
    date: "November 15, 2024",
    description: "The Islamic marriage ceremony at Moonlight Gardens."
  },
  {
    id: 3,
    title: "Wedding Reception",
    time: "19:00",
    date: "November 15, 2024",
    description: "Elegant dinner reception with cultural traditions, music, and celebration."
  }
];

const RadiantUmmah: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  
  // For parallax scroll effect
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
      setScrollY(window.scrollY);
      
      // Find current section
      let current = 0;
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
          current = index;
        }
      });
      setCurrentSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded]);

  const getParallaxStyle = (multiplier: number) => {
    return {
      transform: `translateY(${scrollY * multiplier}px)`,
    };
  };

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-radiant-secondary/30 overflow-x-hidden">
      <PageLoader template="radiant" />

      {isLoaded && (
        <>
          {/* Progress Bar */}
          <div className="fixed top-0 left-0 w-full h-1 bg-radiant-secondary/20 z-50">
            <div 
              className="h-full bg-radiant-tertiary transition-all duration-200"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Navigation */}
          <nav className="fixed top-1/2 transform -translate-y-1/2 right-6 z-40 hidden lg:block">
            <ul className="space-y-6">
              {['Home', 'Ceremony', 'Timeline', 'Gallery', 'RSVP'].map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(index)}
                    className={cn(
                      'w-3 h-3 rounded-full block transition-all duration-300 relative',
                      currentSection === index 
                        ? 'bg-radiant-tertiary scale-150' 
                        : 'bg-radiant-primary/30 hover:bg-radiant-primary/50'
                    )}
                    aria-label={`Navigate to ${item} section`}
                  >
                    <span className="absolute right-full mr-4 opacity-0 whitespace-nowrap text-radiant-primary bg-white/80 px-2 py-1 rounded text-sm transition-opacity duration-200 pointer-events-none group-hover:opacity-100">
                      {item}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hero Section */}
          <section 
            ref={(el) => (sectionRefs.current[0] = el)}
            className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-radiant-primary/20 via-radiant-primary/10 to-radiant-secondary/30 z-0" />
            
            <AnimatedPattern variant="radiant" className="opacity-5" />
            
            <div 
              className="absolute inset-0 pointer-events-none z-0 opacity-10"
              style={getParallaxStyle(-0.15)}
            >
              <div className="absolute top-1/3 left-1/4 w-72 h-72 border border-radiant-tertiary rounded-full" />
              <div className="absolute top-1/2 right-1/4 w-56 h-56 border border-radiant-tertiary rounded-full" />
              <div className="absolute bottom-1/4 left-1/3 w-64 h-64 border border-radiant-tertiary rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div 
                  className="animate-fade-in opacity-0 order-2 md:order-1" 
                  style={{ animationDelay: '0.3s' }}
                >
                  <div className="flex flex-col items-start">
                    <div className="mb-6">
                      <h3 className="font-nastaliq text-radiant-primary text-xl mb-2">بسم الله الرحمن الرحيم</h3>
                      <p className="font-cormorant text-radiant-primary/80 text-lg italic">
                        In the name of Allah, the Most Gracious, the Most Merciful
                      </p>
                    </div>
                    
                    <div className="mb-8">
                      <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-radiant-primary mb-4">
                        Radiant Union
                      </h1>
                      <div className="h-0.5 w-24 bg-radiant-tertiary mb-6" />
                      <h2 className="font-cormorant text-2xl md:text-3xl text-radiant-primary/90 mb-4">
                        Ibrahim & Noor
                      </h2>
                      <p className="font-cormorant text-lg text-gray-700 max-w-lg">
                        With hearts full of gratitude to Allah, we joyfully invite you to share in our celebration 
                        as we begin our journey together as husband and wife.
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <AddToCalendar 
                        event={EVENT} 
                        variant="radiant" 
                      />
                      <button
                        onClick={() => scrollToSection(4)}
                        className="px-4 py-2 bg-radiant-primary hover:bg-radiant-accent text-radiant-tertiary rounded-md transition-all duration-300"
                      >
                        RSVP Now
                      </button>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="animate-fade-in opacity-0 order-1 md:order-2" 
                  style={{ animationDelay: '0.6s' }}
                >
                  <div className="relative max-w-md mx-auto">
                    <div className="absolute inset-0 bg-radiant-tertiary/20 rounded-full transform scale-105 blur-lg" />
                    <div className="relative rounded-full overflow-hidden border-4 border-radiant-tertiary/30 shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1624609579316-0e0fdc372ff4" 
                        alt="Couple Portrait" 
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <button
                  onClick={() => scrollToSection(1)}
                  className="text-radiant-primary opacity-70 hover:opacity-100 transition-opacity"
                  aria-label="Scroll to next section"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* Ceremony Details Section */}
          <section 
            ref={(el) => (sectionRefs.current[1] = el)}
            className="py-20 bg-gradient-to-b from-radiant-secondary/30 to-radiant-primary/10 relative overflow-hidden"
          >
            <AnimatedPattern variant="radiant" className="opacity-5" />
            
            <div 
              className="absolute inset-0 pointer-events-none z-0 opacity-10"
              style={getParallaxStyle(-0.1)}
            >
              <div className="absolute top-1/4 left-1/5 w-48 h-48 border border-radiant-tertiary/50 rounded-full" />
              <div className="absolute bottom-1/3 right-1/5 w-64 h-64 border border-radiant-tertiary/50 rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 radiant-text-glow animate-fade-in opacity-0">
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold text-radiant-primary mb-4">
                    Our Special Day
                  </h2>
                  <div className="h-0.5 w-24 bg-radiant-tertiary mx-auto mb-4" />
                  <p className="font-cormorant text-xl text-radiant-primary/80 max-w-3xl mx-auto">
                    We are blessed to celebrate our union in the presence of our loved ones. 
                    Below are the details of our ceremony and reception.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  <div className="animate-slide-right opacity-0" style={{ animationDelay: '0.3s' }}>
                    <div className="bg-white/40 p-6 rounded-lg backdrop-blur-sm border border-radiant-primary/20 shadow-md h-full">
                      <h3 className="font-nastaliq text-2xl text-radiant-primary mb-4 text-center">Nikah Ceremony</h3>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-radiant-primary/10 flex items-center justify-center mr-3">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-5 w-5 text-radiant-primary" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-cormorant text-lg">November 15, 2024</p>
                            <p className="text-radiant-primary/80 text-sm">Friday, 3:00 PM</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-radiant-primary/10 flex items-center justify-center mr-3">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-5 w-5 text-radiant-primary" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-cormorant text-lg">Moonlight Gardens</p>
                            <p className="text-radiant-primary/80 text-sm">101 Starlight Drive, Chicago</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-radiant-primary/10 flex items-center justify-center mr-3">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-5 w-5 text-radiant-primary" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-cormorant text-lg">Dress Code</p>
                            <p className="text-radiant-primary/80 text-sm">Formal Attire / Traditional Wear</p>
                          </div>
                        </div>
                      </div>
                      
                      <MapLocation 
                        address="Moonlight Gardens, 101 Starlight Drive, Chicago, IL 60601" 
                        variant="radiant" 
                      />
                    </div>
                  </div>
                  
                  <div className="animate-slide-left opacity-0" style={{ animationDelay: '0.6s' }}>
                    <div className="bg-white/40 p-6 rounded-lg backdrop-blur-sm border border-radiant-primary/20 shadow-md h-full">
                      <h3 className="font-nastaliq text-2xl text-radiant-primary mb-4 text-center">Walima Reception</h3>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-radiant-primary/10 flex items-center justify-center mr-3">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-5 w-5 text-radiant-primary" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-cormorant text-lg">November 15, 2024</p>
                            <p className="text-radiant-primary/80 text-sm">Friday, 7:00 PM</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-radiant-primary/10 flex items-center justify-center mr-3">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-5 w-5 text-radiant-primary" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-cormorant text-lg">Crescent Hall</p>
                            <p className="text-radiant-primary/80 text-sm">101 Starlight Drive, Chicago</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-radiant-primary/10 flex items-center justify-center mr-3">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-5 w-5 text-radiant-primary" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-cormorant text-lg">Reception Program</p>
                            <p className="text-radiant-primary/80 text-sm">Dinner, Speeches, Celebration</p>
                          </div>
                        </div>
                      </div>
                      
                      <CountdownTimer 
                        date={EVENT.startDate} 
                        title="Counting down to our special day" 
                        variant="radiant" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.9s' }}>
                  <div className="bg-white/40 p-8 rounded-lg backdrop-blur-sm border border-radiant-primary/20 shadow-md">
                    <h3 className="font-nastaliq text-2xl text-radiant-primary mb-6 text-center">Our Story</h3>
                    
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="md:w-1/3">
                        <div className="rounded-lg overflow-hidden shadow-md">
                          <img 
                            src="https://images.unsplash.com/photo-1519837245410-e15346e64813" 
                            alt="Our Journey" 
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                      
                      <div className="md:w-2/3">
                        <p className="font-cormorant text-lg text-gray-700 mb-4 leading-relaxed">
                          Our journey began four years ago when we met through mutual friends at a community charity event. 
                          Ibrahim was volunteering as an event coordinator, while Noor was managing the fundraising team.
                        </p>
                        <p className="font-cormorant text-lg text-gray-700 mb-4 leading-relaxed">
                          Through countless conversations about our shared values, dreams, and faith, our friendship blossomed into love. 
                          Ibrahim proposed last Ramadan under the stars after iftar, making it the most blessed moment of our lives.
                        </p>
                        <p className="font-cormorant text-lg text-gray-700 leading-relaxed">
                          Now, with the blessings of Allah and the support of our families, we are ready to begin our lifelong journey together, 
                          building a home founded on love, compassion, and the teachings of our beautiful faith.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section 
            ref={(el) => (sectionRefs.current[2] = el)}
            className="py-20 bg-gradient-to-b from-radiant-primary/10 to-radiant-secondary/30 relative overflow-hidden"
          >
            <AnimatedPattern variant="radiant" className="opacity-5" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 radiant-text-glow animate-fade-in opacity-0">
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold text-radiant-primary mb-4">
                    Wedding Timeline
                  </h2>
                  <div className="h-0.5 w-24 bg-radiant-tertiary mx-auto mb-4" />
                  <p className="font-cormorant text-xl text-radiant-primary/80 max-w-3xl mx-auto">
                    Join us as we celebrate our union through these special occasions.
                  </p>
                </div>
                
                <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
                  <EventTimeline events={EVENTS} variant="radiant" className="mb-16" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
                  <div className="bg-white/30 p-6 rounded-lg backdrop-blur-sm border border-radiant-primary/20 shadow-md flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-radiant-primary/10 flex items-center justify-center mb-4">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-8 w-8 text-radiant-primary" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-cormorant text-xl text-radiant-primary mb-2">Arrival Time</h3>
                    <p className="text-gray-700">
                      Please arrive 30 minutes before the ceremony begins to be seated comfortably before the proceedings start.
                    </p>
                  </div>
                  
                  <div className="bg-white/30 p-6 rounded-lg backdrop-blur-sm border border-radiant-primary/20 shadow-md flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-radiant-primary/10 flex items-center justify-center mb-4">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-8 w-8 text-radiant-primary" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-cormorant text-xl text-radiant-primary mb-2">Photography</h3>
                    <p className="text-gray-700">
                      We welcome you to take photos during the reception. For the ceremony, we kindly ask that you leave photography to our professional team.
                    </p>
                  </div>
                  
                  <div className="bg-white/30 p-6 rounded-lg backdrop-blur-sm border border-radiant-primary/20 shadow-md flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-radiant-primary/10 flex items-center justify-center mb-4">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-8 w-8 text-radiant-primary" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-cormorant text-xl text-radiant-primary mb-2">Questions?</h3>
                    <p className="text-gray-700">
                      If you have any questions about the wedding, please contact our wedding coordinator, Sarah, at sarah@email.com.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section 
            ref={(el) => (sectionRefs.current[3] = el)}
            className="py-20 bg-gradient-to-b from-radiant-secondary/30 to-radiant-primary/10 relative overflow-hidden"
          >
            <AnimatedPattern variant="radiant" className="opacity-5" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 radiant-text-glow animate-fade-in opacity-0">
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold text-radiant-primary mb-4">
                    Our Journey in Pictures
                  </h2>
                  <div className="h-0.5 w-24 bg-radiant-tertiary mx-auto mb-4" />
                  <p className="font-cormorant text-xl text-radiant-primary/80 max-w-3xl mx-auto">
                    Memories we've created together on our path to marriage.
                  </p>
                </div>
                
                <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
                  <PhotoGallery photos={PHOTOS} variant="radiant" className="mb-16" />
                </div>
                
                <div className="bg-white/30 p-8 rounded-lg backdrop-blur-sm border border-radiant-primary/20 shadow-md text-center animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
                  <h3 className="font-nastaliq text-2xl text-radiant-primary mb-4">Share Your Blessings</h3>
                  <p className="font-cormorant text-lg text-gray-700 mb-6">
                    Your warm wishes and blessings mean the world to us as we begin this new chapter in our lives.
                  </p>
                  
                  <button
                    onClick={() => scrollToSection(4)}
                    className="px-6 py-2 bg-radiant-primary hover:bg-radiant-accent text-radiant-tertiary rounded-md transition-all duration-300 inline-flex items-center"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Leave a Blessing
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* RSVP & Blessings Section */}
          <section 
            ref={(el) => (sectionRefs.current[4] = el)}
            className="py-20 bg-gradient-to-b from-radiant-primary/10 to-radiant-secondary/30 relative overflow-hidden"
          >
            <AnimatedPattern variant="radiant" className="opacity-5" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 radiant-text-glow animate-fade-in opacity-0">
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold text-radiant-primary mb-4">
                    RSVP & Blessings
                  </h2>
                  <div className="h-0.5 w-24 bg-radiant-tertiary mx-auto mb-4" />
                  <p className="font-cormorant text-xl text-radiant-primary/80 max-w-3xl mx-auto">
                    Let us know if you can attend and share your blessings with us.
                  </p>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/2 animate-slide-right opacity-0" style={{ animationDelay: '0.3s' }}>
                    <RSVPForm variant="radiant" />
                  </div>
                  
                  <div className="lg:w-1/2 animate-slide-left opacity-0" style={{ animationDelay: '0.6s' }}>
                    <BlessingsWall variant="radiant" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-10 bg-radiant-primary text-radiant-tertiary">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-nastaliq text-2xl mb-2">Ibrahim & Noor</h2>
              <p className="font-cormorant mb-6">{new Date().getFullYear()}</p>
              <p className="font-cormorant text-sm opacity-80 max-w-2xl mx-auto">
                "And one of His signs is that He created for you spouses from among yourselves, so that you may find tranquility in them; and He placed between you affection and mercy. In this are signs for people who reflect." - Quran 30:21
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default RadiantUmmah;
