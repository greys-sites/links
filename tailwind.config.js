import type { Config } from 'tailwindcss';
import flowbitePlugin from 'flowbite/plugin'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {
          50: '#F5F2FF',
          100: '#F1EEFF',
          200: '#E4DEFF',
          300: '#D5CCFF',
          400: '#BCADFF',
          500: '#795DFE',
          600: '#562FEF',
          700: '#4F27EB',
          800: '#4522CC',
          900: '#371BA5'
        }
      }
    }
  },
  plugins: [flowbitePlugin]
} as Config;