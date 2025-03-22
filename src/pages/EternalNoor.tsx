
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
  title: "Ahmad & Fatima's Wedding",
  description: "Join us to celebrate our Nikah ceremony followed by a reception dinner.",
  startDate: new Date('2024-08-15T14:00:00'),
  endDate: new Date('2024-08-15T22:00:00'),
  location: "Grand Islamic Center, 123 Crescent St, New York, NY 10001",
};

const PHOTOS = [
  { id: 1, src: "https://images.unsplash.com/photo-1604017011826-d3b4c57cd3ae", alt: "Engagement Photo 1" },
  { id: 2, src: "https://images.unsplash.com/photo-1600754562468-53a56f2a49da", alt: "Engagement Photo 2" },
  { id: 3, src: "https://images.unsplash.com/photo-1609154767012-331529e7d73b", alt: "Engagement Photo 3" },
  { id: 4, src: "https://images.unsplash.com/photo-1621113519277-9b63a9ceb42e", alt: "Engagement Photo 4" },
  { id: 5, src: "https://images.unsplash.com/photo-1549231339-f5b96d772122", alt: "Engagement Photo 5" },
  { id: 6, src: "https://images.unsplash.com/photo-1592453803662-42ec60b8cd88", alt: "Engagement Photo 6" },
];

const EVENTS = [
  {
    id: 1,
    title: "Mehndi Ceremony",
    time: "18:00",
    date: "August 13, 2024",
    description: "Traditional henna ceremony for the bride, family, and close friends."
  },
  {
    id: 2,
    title: "Nikah Ceremony",
    time: "14:00",
    date: "August 15, 2024",
    description: "The Islamic marriage ceremony at the Grand Islamic Center."
  },
  {
    id: 3,
    title: "Walima Reception",
    time: "18:00",
    date: "August 15, 2024",
    description: "Celebratory wedding feast with dinner, speeches, and entertainment."
  }
];

const EternalNoor: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('.eternal-scroll-reveal > *');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, [isLoaded]);

  return (
    <div className="min-h-screen bg-eternal-tertiary overflow-x-hidden">
      <PageLoader template="eternal" />

      {isLoaded && (
        <>
          {/* Hero Section */}
          <section className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden">
            <AnimatedPattern variant="eternal" className="opacity-5" />
            
            <Parallax speed={0.2} className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-[15%] left-[10%] w-16 h-16 md:w-24 md:h-24 border-2 border-eternal-secondary rounded-full opacity-20 animate-float" />
              <div className="absolute top-[30%] right-[15%] w-20 h-20 md:w-32 md:h-32 border border-eternal-secondary rounded-full opacity-10 animate-pulse" />
              <div className="absolute bottom-[20%] left-[20%] w-24 h-24 md:w-40 md:h-40 border border-eternal-primary rounded-full opacity-10 animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-[30%] right-[25%] w-16 h-16 md:w-28 md:h-28 border-2 border-eternal-primary rounded-full opacity-15 animate-pulse" style={{ animationDelay: '1.5s' }} />
            </Parallax>

            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col items-center eternal-scroll-reveal">
                <div className="mb-8 opacity-0 transform translate-y-4 transition-all duration-1000 delay-300">
                  <h3 className="text-center font-amiri text-eternal-primary text-xl md:text-2xl mb-2">بسم الله الرحمن الرحيم</h3>
                  <p className="text-center text-eternal-primary/80 font-cormorant text-lg md:text-xl italic">In the name of Allah, the Most Gracious, the Most Merciful</p>
                </div>
                
                <div className="text-center mb-6 opacity-0 transform translate-y-4 transition-all duration-1000 delay-500">
                  <h1 className="font-playfair text-5xl md:text-7xl font-bold text-eternal-primary mb-4">
                    Nikah
                  </h1>
                  <div className="h-1 w-32 bg-eternal-secondary mx-auto mb-4"></div>
                  <h2 className="font-cormorant text-3xl md:text-4xl text-eternal-accent">Ahmad & Fatima</h2>
                </div>
                
                <div className="mb-12 opacity-0 transform translate-y-4 transition-all duration-1000 delay-700">
                  <p className="text-center text-eternal-primary/90 font-cormorant text-xl md:text-2xl">
                    Request the honor of your presence at their wedding celebration
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-3xl w-full opacity-0 transform translate-y-4 transition-all duration-1000 delay-900">
                  <div className="bg-white/30 rounded-lg p-6 backdrop-blur-sm border border-eternal-primary/20 text-center">
                    <h3 className="font-amiri text-2xl text-eternal-primary mb-2">Nikah Ceremony</h3>
                    <p className="font-cormorant text-xl mb-1">August 15th, 2024</p>
                    <p className="font-cormorant text-lg mb-3">2:00 PM</p>
                    <p className="font-cormorant text-md text-eternal-primary/80 mb-4">Grand Islamic Center</p>
                    <MapLocation 
                      address="Grand Islamic Center, 123 Crescent St, New York, NY 10001" 
                      variant="eternal" 
                    />
                  </div>
                  
                  <div className="bg-white/30 rounded-lg p-6 backdrop-blur-sm border border-eternal-primary/20 text-center">
                    <h3 className="font-amiri text-2xl text-eternal-primary mb-2">Walima Reception</h3>
                    <p className="font-cormorant text-xl mb-1">August 15th, 2024</p>
                    <p className="font-cormorant text-lg mb-3">6:00 PM</p>
                    <p className="font-cormorant text-md text-eternal-primary/80 mb-4">Grand Islamic Center - Hall B</p>
                    <AddToCalendar 
                      event={EVENT} 
                      variant="eternal" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Countdown & RSVP Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-eternal-primary/5 to-eternal-tertiary relative overflow-hidden">
            <AnimatedPattern variant="eternal" className="opacity-5" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch justify-center eternal-scroll-reveal">
                <div className="flex-1 max-w-lg opacity-0 transform translate-y-4 transition-all duration-1000">
                  <CountdownTimer 
                    date={EVENT.startDate} 
                    title="Counting down to our Nikah" 
                    variant="eternal" 
                    className="h-full"
                  />
                </div>
                
                <div className="flex-1 max-w-lg opacity-0 transform translate-y-4 transition-all duration-1000 delay-200">
                  <RSVPForm variant="eternal" className="h-full" />
                </div>
              </div>
            </div>
          </section>

          {/* Our Story & Timeline Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-eternal-tertiary to-eternal-primary/5 relative overflow-hidden">
            <AnimatedPattern variant="eternal" className="opacity-5" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto mb-12 eternal-scroll-reveal">
                <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-eternal-primary mb-6 opacity-0 transform translate-y-4 transition-all duration-1000">
                  Our Love Story
                </h2>
                
                <div className="bg-white/50 p-6 md:p-8 rounded-lg backdrop-blur-sm border border-eternal-primary/20 opacity-0 transform translate-y-4 transition-all duration-1000 delay-200">
                  <p className="font-cormorant text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">
                    Our journey began three years ago when our paths crossed at a mutual friend's Eid celebration. What started as a conversation about our shared love for Islamic architecture blossomed into a deep connection rooted in faith and mutual respect.
                  </p>
                  <p className="font-cormorant text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">
                    Ahmad proposed during Ramadan last year, after Iftar under the stars, with both of our families present to share in our joy. It was a moment of pure blessing that we will forever cherish.
                  </p>
                  <p className="font-cormorant text-lg md:text-xl text-gray-700 leading-relaxed">
                    We look forward to beginning our life together, building a home founded on love, compassion, and the teachings of our faith. Insha'Allah, we are grateful to have you witness the start of our journey.
                  </p>
                </div>
              </div>
              
              <div className="max-w-4xl mx-auto opacity-0 transform translate-y-4 transition-all duration-1000 delay-400 eternal-scroll-reveal">
                <EventTimeline events={EVENTS} variant="eternal" />
              </div>
            </div>
          </section>

          {/* Gallery & Blessings Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-eternal-primary/5 to-eternal-tertiary relative overflow-hidden">
            <AnimatedPattern variant="eternal" className="opacity-5" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto mb-12 eternal-scroll-reveal">
                <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-eternal-primary mb-8 opacity-0 transform translate-y-4 transition-all duration-1000">
                  Our Moments
                </h2>
                
                <div className="opacity-0 transform translate-y-4 transition-all duration-1000 delay-200">
                  <PhotoGallery photos={PHOTOS} variant="eternal" className="mb-16" />
                </div>
                
                <div className="opacity-0 transform translate-y-4 transition-all duration-1000 delay-400">
                  <BlessingsWall variant="eternal" />
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 bg-eternal-primary text-eternal-tertiary">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-amiri text-2xl mb-2">Ahmad & Fatima</h2>
              <p className="font-cormorant mb-4">{new Date().getFullYear()}</p>
              <p className="font-cormorant text-sm opacity-80">
                "And among His Signs is this, that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts." - Quran 30:21
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default EternalNoor;
