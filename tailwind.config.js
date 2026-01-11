/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Premium Light Theme Palette
        'primary-bg': '#ffffff',
        'secondary-bg': '#f8fafc',
        'tertiary-bg': '#f1f5f9',
        'card-bg': 'rgba(255, 255, 255, 0.8)',

        // Accent colors - Professional Teal/Blue
        'accent': '#0891b2',
        'accent-light': '#22d3ee',
        'accent-dark': '#0e7490',
        'accent-glow': 'rgba(8, 145, 178, 0.3)',

        // Secondary accent - Emerald Green for geospatial
        'geo-accent': '#10b981',
        'geo-light': '#34d399',
        'geo-dark': '#059669',

        // Text colors
        'text-primary': '#0f172a',
        'text-secondary': '#475569',
        'text-muted': '#94a3b8',
        'text-light': '#64748b',

        // Glass effects for light theme
        'glass-light': 'rgba(255, 255, 255, 0.6)',
        'glass-medium': 'rgba(255, 255, 255, 0.8)',
        'glass-heavy': 'rgba(255, 255, 255, 0.95)',
        'glass-border': 'rgba(148, 163, 184, 0.3)',

        // Gradients
        'gradient-start': '#0891b2',
        'gradient-mid': '#06b6d4',
        'gradient-end': '#10b981',
      },
      fontFamily: {
        'display': ['Outfit', 'system-ui', 'sans-serif'],
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #10b981 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(8, 145, 178, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
        'text-gradient': 'linear-gradient(135deg, #0891b2 0%, #10b981 100%)',
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(8, 145, 178, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(16, 185, 129, 0.08) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(6, 182, 212, 0.08) 0px, transparent 50%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(15, 23, 42, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.5)',
        'glass-hover': '0 16px 48px rgba(8, 145, 178, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.6)',
        'card': '0 4px 24px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 12px 40px rgba(8, 145, 178, 0.15)',
        'glow': '0 0 40px rgba(8, 145, 178, 0.25)',
        'glow-lg': '0 0 60px rgba(8, 145, 178, 0.35)',
        'soft': '0 2px 15px rgba(15, 23, 42, 0.04)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.7, transform: 'scale(1.05)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-30px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(30px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        '2xl': '40px',
        '3xl': '64px',
      },
    },
  },
  plugins: [],
}