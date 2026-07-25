import type {Config} from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'Tahoma', 'sans-serif'],
        display: ['Georgia', 'Times New Roman', 'serif']
      },
      boxShadow: {
        glow: '0 22px 64px rgba(13, 13, 13, .10)',
        luxury: '0 28px 80px rgba(13, 13, 13, .16)'
      }
    }
  },
  plugins: []
} satisfies Config;
