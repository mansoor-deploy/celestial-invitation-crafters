
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
  title: "Yousef & Zainab's Wedding",
  description: "Join us for our Nikah ceremony and Walima celebration.",
  startDate: new Date('2024-10-25T16:00:00'),
  endDate: new Date('2024-10-25T23:00:00'),
  location: "The Grand Mosque & Golden Palace Hall, 789 Desert Road, Phoenix, AZ 85001",
};

const PHOTOS = [
  { id: 1, src: "https://images.unsplash.com/photo-1600090799864-3e50e5e1d650", alt: "Engagement Photo 1" },
  { id: 2, src: "https://images.unsplash.com/photo-1583939411023-c1a56e5d642d", alt: "Engagement Photo 2" },
  { id: 3, src: "https://images.unsplash.com/photo-1561128290-000a3368862c", alt: "Engagement Photo 3" },
  { id: 4, src: "https://images.unsplash.com/photo-1535572290543-960a8046f5af", alt: "Engagement Photo 4" },
  { id: 5, src: "https://images.unsplash.com/photo-1596386461350-326ccb383e9f", alt: "Engagement Photo 5" },
  { id: 6, src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed", alt: "Engagement Photo 6" },
];

const EVENTS = [
  {
    id: 1,
    title: "Mehndi Ceremony",
    time: "18:00",
    date: "October 23, 2024",
    description: "Traditional henna ceremony for the bride with music and celebrations."
  },
  {
    id: 2,
    title: "Engagement Ceremony",
    time: "19:00",
    date: "October 24, 2024",
    description: "Formal engagement with exchange of rings and gifts between families."
  },
  {
    id: 3,
    title: "Nikah Ceremony",
    time: "16:00",
    date: "October 25, 2024",
    description: "The Islamic marriage ceremony at The Grand Mosque."
  },
  {
    id: 4,
    title: "Walima Reception",
    time: "19:00",
    date: "October 25, 2024",
    description: "Grand wedding reception at Golden Palace Hall with dinner and celebrations."
  }
];

const SacredBond: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setActiveSection(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [isLoaded]);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'pre-wedding', label: 'Pre-Wedding' },
    { id: 'nikah', label: 'Nikah & Walima' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blessings', label: 'Blessings' },
  ];

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="min-h-screen bg-sacred-tertiary/40 overflow-x-hidden">
      <PageLoader template="sacred" />

      {isLoaded && (
        <>
          {/* Navigation dots */}
          <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-center justify-center">
            <div className="space-y-4">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  className={cn(
                    'w-3 h-3 rounded-full transition-all duration-300 relative group',
                    activeSection === index
                      ? 'bg-sacred-primary scale-125'
                      : 'bg-sacred-primary/30 hover:bg-sacred-primary/50'
                  )}
                  aria-label={`Scroll to ${section.label}`}
                >
                  <span className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 whitespace-nowrap text-sm font-medium text-sacred-primary bg-white/80 px-2 py-1 rounded transition-opacity duration-200">
                    {section.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Hero Section */}
          <section
            ref={(el) => (sectionRefs.current[0] = el)}
            data-index={0}
            className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-sacred-primary/20 via-sacred-secondary/10 to-sacred-tertiary/30 z-0"></div>

            <AnimatedPattern variant="sacred" className="opacity-5" />

            <Parallax speed={0.2} className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-sacred-primary/20 rounded-full opacity-20" />
              <div className="absolute top-1/3 right-1/4 w-48 h-48 border border-sacred-secondary/20 rounded-full opacity-20" />
              <div className="absolute bottom-1/4 left-1/3 w-56 h-56 border border-sacred-tertiary/20 rounded-full opacity-20" />
            </Parallax>

            <div className="container mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <Parallax speed={0.15} direction="left" className="sacred-image-zoom">
                  <div className="rounded-xl overflow-hidden shadow-xl border border-sacred-tertiary/30 animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
                    <img
                      src="https://images.unsplash.com/photo-1634712282287-14ed57b9cc89"
                      alt="Bride and Groom"
                      className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </Parallax>

                <div className="flex flex-col items-start justify-center">
                  <div className="mb-4 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
                    <h3 className="font-amiri text-sacred-secondary text-xl mb-2">بسم الله الرحمن الرحيم</h3>
                    <p className="font-cormorant text-sacred-secondary/80 text-lg italic">
                      In the name of Allah, the Most Gracious, the Most Merciful
                    </p>
                  </div>

                  <div className="mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.9s' }}>
                    <h1 className="font-playfair text-4xl md:text-5xl font-bold text-sacred-primary mb-4">
                      Sacred Bond
                    </h1>
                    <div className="h-1 w-24 bg-sacred-tertiary mb-6"></div>
                    <h2 className="font-cormorant text-2xl md:text-3xl text-sacred-secondary mb-4">
                      Yousef & Zainab
                    </h2>
                    <p className="font-cormorant text-lg text-gray-700 max-w-lg">
                      Together with our families, we invite you to share in our joy as we unite in marriage
                      under the blessings of Allah.
                    </p>
                  </div>

                  <div className="animate-fade-in opacity-0" style={{ animationDelay: '1.2s' }}>
                    <CountdownTimer
                      date={EVENT.startDate}
                      title="Joining hearts in"
                      variant="sacred"
                      className="max-w-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <button
                onClick={() => scrollToSection(1)}
                className="text-sacred-primary opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Scroll to pre-wedding section"
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
          </section>

          {/* Pre-Wedding Rituals Section */}
          <section
            ref={(el) => (sectionRefs.current[1] = el)}
            data-index={1}
            className="py-20 bg-gradient-to-b from-sacred-tertiary/30 to-sacred-primary/10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-sacred-pattern opacity-5"></div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-sacred-primary mb-16 animate-fade-in opacity-0">
                  Pre-Wedding Rituals
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <div className="flex flex-col">
                    <div className="bg-white/40 rounded-lg p-6 backdrop-blur-sm border border-sacred-primary/20 shadow-md animate-slide-right opacity-0" style={{ animationDelay: '0.3s' }}>
                      <h3 className="font-amiri text-2xl text-sacred-secondary mb-4">Mehndi Ceremony</h3>
                      <p className="font-cormorant text-lg text-gray-700 mb-4">
                        Join us for a vibrant evening of henna artistry, music, and celebration as the bride's
                        hands and feet are adorned with intricate designs symbolizing beauty and joy.
                      </p>
                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center text-sacred-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>October 23, 2024 - 6:00 PM</span>
                        </div>
                        <div className="flex items-center text-sacred-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>Zainab's Family Residence</span>
                        </div>
                      </div>
                    </div>

                    <div className="sacred-image-zoom mt-6 rounded-lg overflow-hidden shadow-md animate-slide-right opacity-0" style={{ animationDelay: '0.6s' }}>
                      <img
                        src="https://images.unsplash.com/photo-1583939411023-c1a56e5d642d"
                        alt="Mehndi Ceremony"
                        className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="sacred-image-zoom mb-6 rounded-lg overflow-hidden shadow-md animate-slide-left opacity-0" style={{ animationDelay: '0.6s' }}>
                      <img
                        src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc"
                        alt="Engagement Ceremony"
                        className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className="bg-white/40 rounded-lg p-6 backdrop-blur-sm border border-sacred-primary/20 shadow-md animate-slide-left opacity-0" style={{ animationDelay: '0.9s' }}>
                      <h3 className="font-amiri text-2xl text-sacred-secondary mb-4">Engagement Ceremony</h3>
                      <p className="font-cormorant text-lg text-gray-700 mb-4">
                        Witness the formal announcement of our commitment as we exchange rings and gifts in the
                        presence of our loved ones, followed by a delightful dinner celebration.
                      </p>
                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center text-sacred-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>October 24, 2024 - 7:00 PM</span>
                        </div>
                        <div className="flex items-center text-sacred-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>Golden Palace Hall - Emerald Room</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="animate-fade-in opacity-0" style={{ animationDelay: '1.2s' }}>
                  <PhotoGallery photos={PHOTOS.slice(0, 3)} variant="sacred" />
                </div>
              </div>
            </div>
          </section>

          {/* Nikah & Walima Section */}
          <section
            ref={(el) => (sectionRefs.current[2] = el)}
            data-index={2}
            className="py-20 bg-gradient-to-b from-sacred-primary/10 to-sacred-tertiary/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-sacred-pattern opacity-5"></div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-sacred-primary mb-16 animate-fade-in opacity-0">
                  Nikah Ceremony & Walima
                </h2>

                <div className="flex flex-col md:flex-row gap-12 mb-16">
                  <div className="md:w-1/2 animate-slide-right opacity-0" style={{ animationDelay: '0.3s' }}>
                    <div className="bg-white/40 rounded-lg p-6 backdrop-blur-sm border border-sacred-primary/20 shadow-md h-full">
                      <h3 className="font-amiri text-2xl text-sacred-secondary mb-4">Nikah Ceremony</h3>
                      <p className="font-cormorant text-lg text-gray-700 mb-6">
                        Join us for the sacred Islamic marriage ceremony where we will exchange vows and begin
                        our journey as husband and wife, blessed by Allah and witnessed by our loved ones.
                      </p>
                      <div className="flex flex-col gap-4 mb-6">
                        <div className="flex items-center text-sacred-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>October 25, 2024 - 4:00 PM</span>
                        </div>
                        <div className="flex items-center text-sacred-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>The Grand Mosque, Phoenix</span>
                        </div>
                      </div>
                      <MapLocation
                        address="The Grand Mosque, 789 Desert Road, Phoenix, AZ 85001"
                        variant="sacred"
                      />
                    </div>
                  </div>

                  <div className="md:w-1/2 animate-slide-left opacity-0" style={{ animationDelay: '0.6s' }}>
                    <div className="bg-white/40 rounded-lg p-6 backdrop-blur-sm border border-sacred-primary/20 shadow-md h-full">
                      <h3 className="font-amiri text-2xl text-sacred-secondary mb-4">Walima Reception</h3>
                      <p className="font-cormorant text-lg text-gray-700 mb-6">
                        Celebrate with us at our wedding reception featuring a sumptuous dinner, heartfelt
                        speeches, and joyful festivities as we commemorate the beginning of our new life
                        together.
                      </p>
                      <div className="flex flex-col gap-4 mb-6">
                        <div className="flex items-center text-sacred-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>October 25, 2024 - 7:00 PM</span>
                        </div>
                        <div className="flex items-center text-sacred-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>Golden Palace Hall, Phoenix</span>
                        </div>
                      </div>
                      <AddToCalendar event={EVENT} variant="sacred" />
                    </div>
                  </div>
                </div>

                <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.9s' }}>
                  <EventTimeline events={EVENTS} variant="sacred" className="mb-16" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in opacity-0" style={{ animationDelay: '1.2s' }}>
                  <div>
                    <div className="sacred-image-zoom rounded-lg overflow-hidden shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1519225421980-715cb0215aed"
                        alt="Mosque Interior"
                        className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="sacred-image-zoom rounded-lg overflow-hidden shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1613487872414-262e6e721f7b"
                        alt="Wedding Hall"
                        className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section
            ref={(el) => (sectionRefs.current[3] = el)}
            data-index={3}
            className="py-20 bg-gradient-to-b from-sacred-tertiary/30 to-sacred-primary/10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-sacred-pattern opacity-5"></div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-sacred-primary mb-16 animate-fade-in opacity-0">
                  Our Journey in Pictures
                </h2>

                <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
                  <PhotoGallery photos={PHOTOS} variant="sacred" className="mb-16" />
                </div>

                <div className="bg-white/40 rounded-lg p-8 backdrop-blur-sm border border-sacred-primary/20 shadow-md animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
                  <h3 className="font-amiri text-2xl text-sacred-secondary mb-6 text-center">Story of Us</h3>

                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3">
                      <div className="sacred-image-zoom rounded-lg overflow-hidden shadow-md">
                        <img
                          src="https://images.unsplash.com/photo-1522000243595-42c412404679"
                          alt="Couple Story"
                          className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>

                    <div className="md:w-2/3">
                      <div className="space-y-4">
                        <p className="font-cormorant text-lg text-gray-700 leading-relaxed">
                          Our story began five years ago when we met at a community Eid celebration. What
                          started as a chance encounter blossomed into a deep friendship founded on shared
                          values and mutual respect.
                        </p>
                        <p className="font-cormorant text-lg text-gray-700 leading-relaxed">
                          After two years of getting to know each other's families and growing together in
                          faith and understanding, Yousef proposed during a family trip to Mecca, making it the
                          most blessed moment of our lives.
                        </p>
                        <p className="font-cormorant text-lg text-gray-700 leading-relaxed">
                          Now, with the blessings of Allah and the support of our families, we are ready to
                          embark on this beautiful journey of marriage, building a life based on love,
                          compassion, and devotion to our faith.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RSVP & Blessings Section */}
          <section
            ref={(el) => (sectionRefs.current[4] = el)}
            data-index={4}
            className="py-20 bg-gradient-to-b from-sacred-primary/10 to-sacred-tertiary/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-sacred-pattern opacity-5"></div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12 mb-16">
                  <div className="md:w-1/2 animate-slide-right opacity-0" style={{ animationDelay: '0.3s' }}>
                    <RSVPForm variant="sacred" className="h-full" />
                  </div>

                  <div className="md:w-1/2 animate-slide-left opacity-0" style={{ animationDelay: '0.6s' }}>
                    <BlessingsWall variant="sacred" className="h-full" />
                  </div>
                </div>

                <div className="text-center max-w-3xl mx-auto bg-white/40 rounded-lg p-8 backdrop-blur-sm border border-sacred-primary/20 shadow-md animate-fade-in opacity-0" style={{ animationDelay: '0.9s' }}>
                  <h3 className="font-amiri text-2xl text-sacred-secondary mb-4">Thank You</h3>
                  <p className="font-cormorant text-lg text-gray-700 mb-6">
                    We are truly blessed to have you share in our special day. Your presence and well-wishes
                    mean the world to us as we begin this new chapter of our lives together.
                  </p>
                  <p className="font-cormorant text-lg italic text-sacred-primary">
                    With love and gratitude,
                  </p>
                  <p className="font-playfair text-xl text-sacred-secondary mt-2">Yousef & Zainab</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-10 bg-sacred-primary text-sacred-tertiary">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-amiri text-2xl mb-2">Yousef & Zainab</h2>
              <p className="font-cormorant mb-6">{new Date().getFullYear()}</p>
              <p className="font-cormorant text-sm opacity-80 max-w-2xl mx-auto">
                "And among His Signs is this, that He created for you mates from among yourselves, that you
                may dwell in tranquility with them, and He has put love and mercy between your hearts."
                <br />
                - Quran 30:21
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default SacredBond;
