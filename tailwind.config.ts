import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary
        primary: {
          50: '#EAF4FF',
          100: '#D7EAFF',
          200: '#B5D6FF',
          300: '#8FC1FF',
          400: '#6AACFF',
          500: '#4D9FFF',
          600: '#3689EA',
          700: '#236FD0',
          800: '#1A58A8',
          900: '#143F77',
        },
        // Secondary
        secondary: {
          500: '#8FC0FF',
        },
        // Success
        success: '#2FBF71',
        // Warning
        warning: '#D58A00',
        // Error
        error: '#E15B64',
        // Info
        info: '#4D9FFF',
        // Dark theme backgrounds
        app: '#0F1724',
        sidebar: '#131C2B',
        header: '#121B2A',
        'surface-1': '#182233',
        'surface-2': '#1D293D',
        // Borders
        'border-default': '#263347',
        'border-active': '#4D9FFF',
        // Text
        'text-primary': '#F5F7FA',
        'text-secondary': '#B8C0CC',
        'text-muted': '#7A8699',
      },
      backgroundColor: {
        app: '#0F1724',
        sidebar: '#131C2B',
        header: '#121B2A',
        'surface-1': '#182233',
        'surface-2': '#1D293D',
      },
      textColor: {
        primary: '#F5F7FA',
        secondary: '#B8C0CC',
        muted: '#7A8699',
      },
      borderColor: {
        default: '#263347',
        active: '#4D9FFF',
      },
    },
  },
  plugins: [],
} satisfies Config;
