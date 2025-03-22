
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				playfair: ['Playfair Display', 'serif'],
				cormorant: ['Cormorant Garamond', 'serif'],
				amiri: ['Amiri', 'serif'],
				nastaliq: ['Noto Nastaliq Urdu', 'serif'],
				noto: ['Noto Serif', 'serif'],
				raleway: ['Raleway', 'sans-serif']
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Template 1: Eternal Noor - Luxurious Emerald & Gold
				eternal: {
					primary: 'hsl(var(--eternal-primary))',
					secondary: 'hsl(var(--eternal-secondary))',
					tertiary: 'hsl(var(--eternal-tertiary))',
					accent: 'hsl(var(--eternal-accent))'
				},
				// Template 2: Celestial Imaan - Royal Blue & Gold
				celestial: {
					primary: 'hsl(var(--celestial-primary))',
					secondary: 'hsl(var(--celestial-secondary))',
					tertiary: 'hsl(var(--celestial-tertiary))',
					accent: 'hsl(var(--celestial-accent))'
				},
				// Template 3: Sacred Bond - Rich Teal & Burgundy
				sacred: {
					primary: 'hsl(var(--sacred-primary))',
					secondary: 'hsl(var(--sacred-secondary))',
					tertiary: 'hsl(var(--sacred-tertiary))',
					accent: 'hsl(var(--sacred-accent))'
				},
				// Template 4: Radiant Ummah - Midnight Indigo & Gold
				radiant: {
					primary: 'hsl(var(--radiant-primary))',
					secondary: 'hsl(var(--radiant-secondary))',
					tertiary: 'hsl(var(--radiant-tertiary))',
					accent: 'hsl(var(--radiant-accent))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: '1rem',
				'2xl': '1.5rem',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				slideDown: {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				slideLeft: {
					'0%': { transform: 'translateX(20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				slideRight: {
					'0%': { transform: 'translateX(-20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				pulse: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				rotate: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'spin-reverse': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(-360deg)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fadeIn 0.7s ease-out forwards',
				'slide-up': 'slideUp 0.7s ease-out forwards',
				'slide-down': 'slideDown 0.7s ease-out forwards',
				'slide-left': 'slideLeft 0.7s ease-out forwards',
				'slide-right': 'slideRight 0.7s ease-out forwards',
				'float': 'float 6s ease-in-out infinite',
				'pulse': 'pulse 3s ease-in-out infinite',
				'shimmer': 'shimmer 3s infinite',
				'rotate': 'rotate 20s linear infinite',
				'rotate-slow': 'rotate 40s linear infinite',
				'spin-reverse': 'spin-reverse 1.5s linear infinite',
				'scale-in': 'scale-in 0.5s ease-out forwards',
			},
			backgroundImage: {
				'eternal-pattern': "url('/patterns/geometric-pattern.svg')",
				'celestial-pattern': "url('/patterns/constellation-pattern.svg')",
				'sacred-pattern': "url('/patterns/mosaic-pattern.svg')",
				'radiant-pattern': "url('/patterns/arabesque-pattern.svg')"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
