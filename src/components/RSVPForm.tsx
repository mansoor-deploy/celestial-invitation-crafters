
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface RSVPFormProps {
  className?: string;
  variant?: 'default' | 'eternal' | 'celestial' | 'sacred' | 'radiant';
}

const RSVPForm: React.FC<RSVPFormProps> = ({ 
  className,
  variant = 'default'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attending: 'yes',
    guests: 0,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Thank you for your RSVP!', {
        description: 'We look forward to celebrating with you.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        attending: 'yes',
        guests: 0,
        message: ''
      });
    }, 1500);
  };

  const getContainerStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'bg-eternal-tertiary/70 border-eternal-primary/30';
      case 'celestial':
        return 'bg-celestial-tertiary/70 border-celestial-primary/30';
      case 'sacred':
        return 'bg-sacred-tertiary/50 border-sacred-primary/30';
      case 'radiant':
        return 'bg-radiant-secondary/60 border-radiant-tertiary/30';
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

  const getLabelStyles = () => {
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
        return 'text-gray-700';
    }
  };

  const getInputStyles = () => {
    switch (variant) {
      case 'eternal':
        return 'border-eternal-primary/20 focus:border-eternal-primary';
      case 'celestial':
        return 'border-celestial-primary/20 focus:border-celestial-primary';
      case 'sacred':
        return 'border-sacred-primary/20 focus:border-sacred-primary';
      case 'radiant':
        return 'border-radiant-primary/20 focus:border-radiant-primary';
      default:
        return 'border-gray-300 focus:border-primary';
    }
  };

  return (
    <div className={cn(
      'p-6 rounded-lg backdrop-blur-sm border',
      getContainerStyles(),
      className
    )}>
      <h3 className={cn(
        'text-xl sm:text-2xl font-medium mb-4 font-cormorant text-center',
        getLabelStyles()
      )}>
        RSVP
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className={cn('block text-sm font-medium', getLabelStyles())}>
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={cn(
              'w-full px-3 py-2 rounded-md border bg-white/70 focus:outline-none transition-colors duration-200',
              getInputStyles()
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={cn('block text-sm font-medium', getLabelStyles())}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={cn(
                'w-full px-3 py-2 rounded-md border bg-white/70 focus:outline-none transition-colors duration-200',
                getInputStyles()
              )}
            />
          </div>
          
          <div className="space-y-2">
            <label className={cn('block text-sm font-medium', getLabelStyles())}>
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={cn(
                'w-full px-3 py-2 rounded-md border bg-white/70 focus:outline-none transition-colors duration-200',
                getInputStyles()
              )}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={cn('block text-sm font-medium', getLabelStyles())}>
              Will you attend?
            </label>
            <select
              name="attending"
              value={formData.attending}
              onChange={handleChange}
              className={cn(
                'w-full px-3 py-2 rounded-md border bg-white/70 focus:outline-none transition-colors duration-200',
                getInputStyles()
              )}
            >
              <option value="yes">Yes, I will attend</option>
              <option value="no">No, I can't attend</option>
              <option value="maybe">Not sure yet</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className={cn('block text-sm font-medium', getLabelStyles())}>
              Number of Guests
            </label>
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              min="0"
              max="10"
              className={cn(
                'w-full px-3 py-2 rounded-md border bg-white/70 focus:outline-none transition-colors duration-200',
                getInputStyles()
              )}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className={cn('block text-sm font-medium', getLabelStyles())}>
            Message (Optional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className={cn(
              'w-full px-3 py-2 rounded-md border bg-white/70 focus:outline-none transition-colors duration-200',
              getInputStyles()
            )}
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'w-full py-2 rounded-md font-medium transition-all duration-300 mt-4',
            getButtonStyles(),
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          )}
        >
          {isSubmitting ? 'Submitting...' : 'Send RSVP'}
        </button>
      </form>
    </div>
  );
};

export default RSVPForm;
