
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Blessing {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
}

interface BlessingsWallProps {
  className?: string;
  variant?: 'default' | 'eternal' | 'celestial' | 'sacred' | 'radiant';
}

const SAMPLE_BLESSINGS: Blessing[] = [
  {
    id: 1,
    name: 'Sarah & Ahmed',
    message: 'May Allah bless your union with love, patience, and understanding.',
    timestamp: new Date('2023-05-15T14:25:00')
  },
  {
    id: 2,
    name: 'Fatima Khan',
    message: 'Wishing you both a lifetime of happiness and love. May your marriage be full of blessings.',
    timestamp: new Date('2023-05-10T09:15:00')
  },
  {
    id: 3,
    name: 'Mohammad & Aisha',
    message: 'May your marriage be as sweet as halwa and as strong as imaan.',
    timestamp: new Date('2023-05-12T16:45:00')
  },
  {
    id: 4,
    name: 'Uncle Yusuf',
    message: 'Congratulations to the beautiful couple! May Allah shower His blessings upon you both.',
    timestamp: new Date('2023-05-08T11:30:00')
  }
];

const BlessingsWall: React.FC<BlessingsWallProps> = ({ 
  className,
  variant = 'default'
}) => {
  const [blessings, setBlessings] = useState<Blessing[]>(SAMPLE_BLESSINGS);
  const [newBlessing, setNewBlessing] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBlessing((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlessing.name.trim() || !newBlessing.message.trim()) {
      toast.error('Please provide both name and message');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission delay
    setTimeout(() => {
      const blessing: Blessing = {
        id: blessings.length + 1,
        name: newBlessing.name,
        message: newBlessing.message,
        timestamp: new Date()
      };
      
      setBlessings([blessing, ...blessings]);
      setNewBlessing({ name: '', message: '' });
      setIsSubmitting(false);
      setShowForm(false);
      
      toast.success('Your blessing has been added!', {
        description: 'Thank you for your kind words.',
      });
    }, 1000);
  };

  const getContainerStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'bg-eternal-tertiary/60 border-eternal-primary/30';
      case 'celestial':
        return 'bg-celestial-tertiary/60 border-celestial-primary/30';
      case 'sacred':
        return 'bg-sacred-tertiary/50 border-sacred-primary/30';
      case 'radiant':
        return 'bg-radiant-secondary/50 border-radiant-tertiary/30';
      default:
        return 'bg-white/80 border-gray-200';
    }
  };

  const getButtonStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'bg-eternal-primary hover:bg-eternal-accent text-eternal-tertiary';
      case 'celestial':
        return 'bg-celestial-primary hover:bg-celestial-accent text-celestial-tertiary';
      case 'sacred':
        return 'bg-sacred-primary hover:bg-sacred-accent text-sacred-tertiary';
      case 'radiant':
        return 'bg-radiant-primary hover:bg-radiant-accent text-radiant-tertiary';
      default:
        return 'bg-primary hover:bg-primary/80 text-primary-foreground';
    }
  };

  const getSecondaryButtonStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'border-eternal-primary/50 text-eternal-primary hover:bg-eternal-primary/10';
      case 'celestial':
        return 'border-celestial-primary/50 text-celestial-primary hover:bg-celestial-primary/10';
      case 'sacred':
        return 'border-sacred-primary/50 text-sacred-primary hover:bg-sacred-primary/10';
      case 'radiant':
        return 'border-radiant-primary/50 text-radiant-primary hover:bg-radiant-primary/10';
      default:
        return 'border-primary/50 text-primary hover:bg-primary/10';
    }
  };

  const getTitleStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'text-eternal-primary';
      case 'celestial':
        return 'text-celestial-accent';
      case 'sacred':
        return 'text-sacred-secondary';
      case 'radiant':
        return 'text-radiant-primary';
      default:
        return 'text-primary';
    }
  };

  const getInputStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'border-eternal-primary/30 focus:border-eternal-primary';
      case 'celestial':
        return 'border-celestial-primary/30 focus:border-celestial-primary';
      case 'sacred':
        return 'border-sacred-primary/30 focus:border-sacred-primary';
      case 'radiant':
        return 'border-radiant-primary/30 focus:border-radiant-primary';
      default:
        return 'border-gray-300 focus:border-primary';
    }
  };

  const getBlessingCardStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'bg-white/60 border-eternal-primary/20';
      case 'celestial':
        return 'bg-white/60 border-celestial-primary/20';
      case 'sacred':
        return 'bg-white/60 border-sacred-primary/20';
      case 'radiant':
        return 'bg-white/60 border-radiant-primary/20';
      default:
        return 'bg-white/60 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className={cn(
      'p-6 rounded-lg backdrop-blur-sm border',
      getContainerStyles(),
      className
    )}>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h3 className={cn(
          'text-xl sm:text-2xl font-medium font-cormorant mb-3 sm:mb-0',
          getTitleStyles()
        )}>
          Blessings Wall
        </h3>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className={cn(
            'px-4 py-2 rounded-md font-medium transition-all duration-300',
            showForm ? getSecondaryButtonStyles() : getButtonStyles(),
            showForm ? 'border' : ''
          )}
        >
          {showForm ? 'Cancel' : 'Add Your Blessing'}
        </button>
      </div>
      
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-md bg-white/50">
          <div className="space-y-4">
            <div>
              <label className={cn('block text-sm font-medium mb-1', getTitleStyles())}>
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={newBlessing.name}
                onChange={handleChange}
                required
                className={cn(
                  'w-full px-3 py-2 rounded-md border bg-white/80 focus:outline-none transition-colors duration-200',
                  getInputStyles()
                )}
              />
            </div>
            
            <div>
              <label className={cn('block text-sm font-medium mb-1', getTitleStyles())}>
                Your Blessing
              </label>
              <textarea
                name="message"
                value={newBlessing.message}
                onChange={handleChange}
                required
                rows={3}
                className={cn(
                  'w-full px-3 py-2 rounded-md border bg-white/80 focus:outline-none transition-colors duration-200',
                  getInputStyles()
                )}
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'w-full py-2 rounded-md font-medium transition-all duration-300',
                getButtonStyles(),
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              )}
            >
              {isSubmitting ? 'Submitting...' : 'Send Blessing'}
            </button>
          </div>
        </form>
      )}
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {blessings.map((blessing) => (
          <div 
            key={blessing.id}
            className={cn(
              'p-4 rounded-md border backdrop-blur-sm transition-all duration-300 hover:shadow-md',
              getBlessingCardStyles()
            )}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">{blessing.name}</h4>
              <span className="text-xs text-gray-500">{formatDate(blessing.timestamp)}</span>
            </div>
            <p className="text-gray-700">{blessing.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlessingsWall;
