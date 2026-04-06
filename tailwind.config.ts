import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        AeonikProRegular:['AeonikProRegular' , 'sans-serif'],
        AeonikProBold:['AeonikProBold' , 'sans-serif'],
        AeonikProHeavy:['AeonikProHeavy' , 'sans-serif'],
        heading: ['var(--font-heading)', 'var(--font-sans)', 'ui-sans-serif', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        /** Lumen brand — maps to `src/styles/tokens.css` */
        lumen: {
          200: 'hsl(var(--lumen-200) / <alpha-value>)',
          300: 'hsl(var(--lumen-300) / <alpha-value>)',
          400: 'hsl(var(--lumen-400) / <alpha-value>)',
          500: 'hsl(var(--lumen-500) / <alpha-value>)',
          600: 'hsl(var(--lumen-600) / <alpha-value>)',
        },
      },
      boxShadow: {
        'lumen-sm': 'var(--lumen-shadow-sm)',
        'lumen-md': 'var(--lumen-shadow-md)',
        'lumen-lg': 'var(--lumen-shadow-lg)',
        'lumen-xl': 'var(--lumen-shadow-xl)',
        'lumen-cta': 'var(--lumen-shadow-cta)',
        'lumen-cta-soft': 'var(--lumen-shadow-cta-soft)',
      },
      keyframes: {
        'marquee-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'image-glow': {
          '0%': {
            opacity: '0',
            animationTimingFunction: 'cubic-bezier(.74, .25, .76, 1)',
          },
          '10%': {
            opacity: '0.5',
            animationTimingFunction: 'cubic-bezier(.12, .01, .08, .99)',
          },
          '100%': {
            opacity: '0.7',
          },
        },
        'border-beam': {
          '100%': {
            offsetDistance: '100%',
          },
        },
        flip: {
          to: { transform: 'rotate(360deg)' },
        },
        rotate: {
          to: { transform: 'rotate(90deg)' },
        },
      },
      animation: {
        'marquee-x': 'marquee-x var(--marquee-duration, var(--lumen-marquee-duration, 32s)) linear infinite',
        'image-glow': 'image-glow 4s ease-out 0.6s forwards',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        flip: 'flip 6s infinite steps(2, end)',
        rotate: 'rotate 3s linear infinite both',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
