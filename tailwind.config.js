/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        calligraphy: ['"Great Vibes"', 'cursive'],
        script: ['"Dancing Script"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
        body: ['"Quicksand"', 'sans-serif'],
      },
      colors: {
        rose: {
          50: '#FFF5F7',
          100: '#FFE4EC',
          200: '#FBCFE0',
          300: '#F8B4D9',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
        },
        blush: {
          50: '#FFF0F5',
          100: '#FFE0EB',
          200: '#FFC1D9',
          300: '#FFA3C6',
          400: '#FF84B4',
          500: '#FF66A0',
        },
        cream: {
          50: '#FFFBF5',
          100: '#FFF6EB',
          200: '#FFF0E0',
        },
        wine: {
          400: '#C9184A',
          500: '#A4133C',
          600: '#800F2F',
        },
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '10%': { transform: 'scale(1.1)' },
          '20%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.08)' },
          '40%': { transform: 'scale(1)' },
        },
        floatUp: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.8' },
          '100%': { transform: 'translateY(-100vh) scale(0.5)', opacity: '0' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
        floatUp: 'floatUp 4s ease-in forwards',
        sparkle: 'sparkle 2s ease-in-out infinite',
        gradientShift: 'gradientShift 8s ease infinite',
        shimmer: 'shimmer 3s linear infinite',
        bounceSoft: 'bounceSoft 2s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        blink: 'blink 1s step-end infinite',
        wiggle: 'wiggle 0.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
