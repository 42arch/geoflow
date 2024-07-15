import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import { nextui } from '@nextui-org/react'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  prefix: '',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans]
      }
    }
  },
  plugins: [
    nextui({
      layout: {
        radius: {
          small: '2px',
          medium: '4px',
          large: '6px'
        },
        borderWidth: {
          small: '1px',
          medium: '1px',
          large: '3px'
        }
      }
    })
  ]
} satisfies Config

export default config
