
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="py-6 border-b border-gray-200 bg-white/70 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-playfair font-semibold text-gray-900 text-center">Muslim Wedding Invitation Templates</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 mb-8 text-center font-cormorant">
            Welcome to our collection of premium wedding invitation templates, crafted to celebrate the beauty and traditions of Muslim weddings. Each template offers a unique experience that honors Islamic artistry while providing modern interactive features.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            <TemplateCard
              title="Eternal Noor"
              description="A grand elegance inspired by traditional Islamic artistry with intricate geometric patterns and Arabic calligraphy."
              colorClass="from-emerald-900/20 to-amber-500/20"
              textColorClass="text-emerald-800"
              borderColorClass="border-emerald-800/30"
              path="/eternal-noor"
            />
            
            <TemplateCard
              title="Celestial Imaan"
              description="A luxurious, modern twist on tradition with illuminated calligraphic details, featuring royal blue and silver accents."
              colorClass="from-blue-900/20 to-blue-400/20"
              textColorClass="text-blue-800"
              borderColorClass="border-blue-800/30"
              path="/celestial-imaan"
            />
            
            <TemplateCard
              title="Sacred Bond"
              description="A refined layout with rich textures, inspired by traditional calligraphy and mosaic art in deep teal and maroon."
              colorClass="from-teal-900/20 to-rose-700/20"
              textColorClass="text-teal-800"
              borderColorClass="border-teal-800/30"
              path="/sacred-bond"
            />
            
            <TemplateCard
              title="Radiant Ummah"
              description="Embraces spirituality and tradition with subtle modern flourishes in midnight indigo and soft lavender."
              colorClass="from-indigo-900/20 to-purple-300/20"
              textColorClass="text-indigo-800"
              borderColorClass="border-indigo-800/30"
              path="/radiant-ummah"
            />
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-gray-200 bg-white/70 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} Islamic Wedding Invitations. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

interface TemplateCardProps {
  title: string;
  description: string;
  colorClass: string;
  textColorClass: string;
  borderColorClass: string;
  path: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  title,
  description,
  colorClass,
  textColorClass,
  borderColorClass,
  path
}) => {
  return (
    <Link 
      to={path}
      className={cn(
        'block p-6 rounded-lg border bg-gradient-to-br shadow-sm transition-all duration-300',
        'hover:shadow-md hover:translate-y-[-2px]',
        colorClass,
        borderColorClass
      )}
    >
      <h2 className={cn(
        'text-2xl font-playfair font-semibold mb-3',
        textColorClass
      )}>
        {title}
      </h2>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className={cn(
        'text-sm font-medium inline-flex items-center',
        textColorClass
      )}>
        <span>View Template</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 ml-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
};

export default Index;
