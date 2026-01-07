import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3a67ff',
          light: '#6b8aff',
          dark: '#2a4fd9',
          foreground: '#ffffff',
        },
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          300: '#D1D1D1',
          500: '#888888',
          700: '#4A4A4A',
          900: '#1A1A1A',
        },
        success: '#27AE60',
        warning: '#F39C12',
        error: '#E74C3C',
        info: '#3a67ff',
        // Dark mode specific colors
        dark: {
          base: '#0A0A0A',
          surface: '#1A1A1A',
          elevated: '#2A2A2A',
          text: {
            primary: '#FFFFFF',
            secondary: '#B3B3B3',
            muted: '#808080',
          },
          border: {
            default: '#2A2A2A',
            elevated: '#3A3A3A',
          },
        },
      },
      spacing: {
        // 8px grid system
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
        '5xl': '128px',
      },
      borderRadius: {
        card: '16px',
        button: '12px',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
