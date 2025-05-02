// tailwind.config.ts
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ["class"],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1400px" },
    },
    extend: {
      colors: {
        // Theme colors mapped to CSS variables
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))", // #FBF8F4
        foreground: "hsl(var(--foreground))", // #1A1A1A
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" }, // Maroon / White
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" }, // #F5F0ED / Black
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" }, // #ECE8E5 / #706C6A
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        'brand-maroon': { DEFAULT: 'hsl(var(--brand-maroon))', dark: 'hsl(var(--brand-maroon-dark))' }
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans], // Body font
        display: ["var(--font-playfair)", "serif"], // Heading font
      },
      borderRadius: {
        lg: "var(--radius)", // 0.7rem
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 6px)", // 17px
        '2xl': "calc(var(--radius) + 12px)",
        full: '9999px',
      },
      boxShadow: {
         sm: '0 2px 4px 0 hsla(var(--foreground) / 0.03)',
         DEFAULT: '0 4px 8px 0 hsla(var(--foreground) / 0.04)',
         md: '0 6px 12px -2px hsla(var(--foreground) / 0.05), 0 4px 8px -3px hsla(var(--foreground) / 0.04)',
         lg: '0 10px 20px -4px hsla(var(--foreground) / 0.06), 0 6px 10px -5px hsla(var(--foreground) / 0.05)',
         xl: '0 20px 30px -5px hsla(var(--foreground) / 0.07), 0 8px 15px -6px hsla(var(--foreground) / 0.06)',
         'lg-maroon': '0 10px 20px -3px hsla(var(--brand-maroon) / 0.18), 0 4px 8px -4px hsla(var(--brand-maroon) / 0.15)',
         'xl-maroon': '0 20px 35px -5px hsla(var(--brand-maroon) / 0.2), 0 8px 15px -6px hsla(var(--brand-maroon) / 0.15)',
         'inner-sm': 'inset 0 1px 2px 0 hsla(var(--foreground) / 0.05)',
         none: 'none',
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "slide-up": { from: { transform: 'translateY(110%)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        "slide-down": { from: { transform: 'translateY(0)', opacity: '1' }, to: { transform: 'translateY(110%)', opacity: '0' } },
        "subtle-pulse": {
          '0%, 100%': { opacity: 'var(--pulse-opacity, 0.5)', transform: 'scale(1)' },
          '50%': { opacity: 'calc(var(--pulse-opacity, 0.5) * 0.7)', transform: 'scale(1.02)' },
        },
        "fade-slide-up": {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        "gradient-shift": {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        "shine": {
          'to': { 'background-position': '200% center' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-up": "slide-up 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards",
        "slide-down": "slide-down 0.3s cubic-bezier(0.5, 0, 0.75, 0) forwards",
        "subtle-pulse": "subtle-pulse 7s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-slide-up": "fade-slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "gradient-shift": "gradient-shift 10s ease infinite",
        "shine": "shine 1s linear infinite"
      },
       backgroundImage: {
         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
         'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
         'gradient-subtle': 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--secondary)) 100%)',
         'gradient-shine': 'linear-gradient(110deg, transparent 20%, hsl(var(--primary-foreground) / 0.1) 50%, transparent 80%)',
       },
       backgroundSize: {
           '200%': '200% auto',
       },
       fontSize: {
        'xs': '0.75rem', 'sm': '0.875rem', 'base': '1rem', 'lg': '1.125rem',
        'xl': '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.5rem',
        '5xl': '3rem', '6xl': '3.75rem', '7xl': '4.5rem', '8xl': '6rem',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '16/9': '16 / 9',
        '3/4': '3 / 4', // Added portrait aspect ratio
      },
    },
  },
  plugins: [
      require("tailwindcss-animate"),
      require('@tailwindcss/typography'),
    ],
};

export default config;