/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
    './src/providers/**/*.{js,ts,jsx,tsx}',
    './src/utils/**/*.{js,ts,jsx,tsx}',
    './src/store/**/*.{js,ts,jsx,tsx}',
    './src/services/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'fold-cover': { 'max': '412px', 'min-height': '900px' },
      'fold-main': { 'min': '413px', 'max': '884px', 'min-height': '1100px' },
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Enhanced neutral system for better dark theme contrast
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },

        // Background and foreground for semantic usage
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Primary color system
        primary: {
          50: 'hsl(var(--primary-50))',
          100: 'hsl(var(--primary-100))',
          200: 'hsl(var(--primary-200))',
          300: 'hsl(var(--primary-300))',
          400: 'hsl(var(--primary-400))',
          500: 'hsl(var(--primary-500))',
          600: 'hsl(var(--primary-600))',
          700: 'hsl(var(--primary-700))',
          800: 'hsl(var(--primary-800))',
          900: 'hsl(var(--primary-900))',
          DEFAULT: 'hsl(var(--primary-500))',
        },

        // Accent/Secondary colors
        accent: {
          50: 'hsl(var(--accent-50))',
          100: 'hsl(var(--accent-100))',
          200: 'hsl(var(--accent-200))',
          300: 'hsl(var(--accent-300))',
          400: 'hsl(var(--accent-400))',
          500: 'hsl(var(--accent-500))',
          600: 'hsl(var(--accent-600))',
          700: 'hsl(var(--accent-700))',
          800: 'hsl(var(--accent-800))',
          900: 'hsl(var(--accent-900))',
          DEFAULT: 'hsl(var(--accent-500))',
        },

        // Blue variations
        blue: {
          50: 'hsl(var(--blue-50))',
          100: 'hsl(var(--blue-100))',
          200: 'hsl(var(--blue-200))',
          300: 'hsl(var(--blue-300))',
          400: 'hsl(var(--blue-400))',
          500: 'hsl(var(--blue-500))',
          600: 'hsl(var(--blue-600))',
          DEFAULT: 'hsl(var(--blue-500))',
        },

        // Teal variations
        teal: {
          50: 'hsl(var(--teal-50))',
          100: 'hsl(var(--teal-100))',
          200: 'hsl(var(--teal-200))',
          300: 'hsl(var(--teal-300))',
          400: 'hsl(var(--teal-400))',
          500: 'hsl(var(--teal-500))',
          600: 'hsl(var(--teal-600))',
          DEFAULT: 'hsl(var(--teal-500))',
        },

        // Semantic colors
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        error: 'hsl(var(--error))',
        info: 'hsl(var(--info))',

        // UI component colors
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'slide-in': {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        shimmer: 'shimmer 2s infinite',
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      boxShadow: {
        primary: '0 4px 6px -1px hsla(21, 100%, 50%, 0.1), 0 2px 4px -1px hsla(21, 100%, 50%, 0.06)',
        'primary-lg': '0 10px 15px -3px hsla(21, 100%, 50%, 0.1), 0 4px 6px -2px hsla(21, 100%, 50%, 0.05)',
        'primary-xl': '0 20px 25px -5px hsla(21, 100%, 50%, 0.1), 0 10px 10px -5px hsla(21, 100%, 50%, 0.04)',
        glow: '0 0 20px hsla(21, 100%, 50%, 0.3)',
        'glow-lg': '0 0 40px hsla(21, 100%, 50%, 0.2)',
      },

      backdropBlur: {
        xs: '2px',
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },

      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },

      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
      },
    },
  },
  plugins: [
    function ({ addUtilities, addComponents }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.text-gradient': {
          background: 'linear-gradient(to right, var(--primary-600), var(--accent-600))',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.glass-effect': {
          background: 'hsla(39, 67%, 95%, 0.1)',
          'backdrop-filter': 'blur(10px)',
          border: '1px solid hsla(39, 67%, 95%, 0.2)',
        },
      }

      const newComponents = {
        '.btn-primary': {
          background: 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-md)',
          fontWeight: '500',
          transition: 'all 150ms',
          border: '1px solid var(--primary-600)',
          '&:hover': {
            background: 'linear-gradient(135deg, var(--primary-400), var(--primary-500))',
            transform: 'translateY(-1px)',
            boxShadow: 'var(--shadow-md)',
          },
        },
        '.card-modern': {
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all 300ms',
          '&:hover': {
            boxShadow: 'var(--shadow-lg)',
            transform: 'translateY(-2px)',
          },
        },
      }

      addUtilities(newUtilities)
      addComponents(newComponents)
    },
  ],
}

export default config
