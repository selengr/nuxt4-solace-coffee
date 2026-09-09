import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#14110f',
        roast: '#2a231e',
        stone: '#ddd8d0',
        mist: '#f1efe9',
        foam: '#faf8f4',
        leaf: {
          DEFAULT: '#355648',
          soft: '#4d7260',
        },
        brass: '#9c8760',
        mute: '#6a635b',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Sora', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '72rem',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(1.25rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'ease-zoom': {
          from: { transform: 'scale(1.05)' },
          to: { transform: 'scale(1)' },
        },
      },
      animation: {
        rise: 'rise 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'ease-zoom': 'ease-zoom 14s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [],
} satisfies Config
