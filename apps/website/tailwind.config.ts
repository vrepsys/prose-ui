import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: 'selector',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/srcs/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      textColor: {
        color: {
          high: 'hsl(var(--p-color-text-high))',
          base: 'hsl(var(--p-color-text))',
          low: 'hsl(var(--p-color-text-low))',
          lower: 'hsl(var(--p-color-text-lower))',
          lowest: 'hsl(var(--p-color-text-lowest))',
        },
      },
      stroke: {
        color: {
          high: 'hsl(var(--p-color-text-high))',
          base: 'hsl(var(--p-color-text))',
          low: 'hsl(var(--p-color-text-low))',
          lower: 'hsl(var(--p-color-text-lower))',
          lowest: 'hsl(var(--p-color-text-lowest))',
        },
      },
      backgroundColor: {
        color: {
          high: 'hsl(var(--p-color-bg-high))',
          base: 'hsl(var(--p-color-bg))',
          low: 'hsl(var(--p-color-bg-low))',
          lower: 'hsl(var(--p-color-bg-lower))',
          lowest: 'hsl(var(--p-color-bg-lowest))',
        },
      },
      borderColor: {
        color: {
          base: 'hsl(var(--p-color-border))',
        },
      },
      colors: {
        color: {
          accent: {
            high: 'hsl(var(--p-color-accent-high))',
            base: 'hsl(var(--p-color-accent))',
            low: 'hsl(var(--p-color-accent-low))',
          },
        },
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
      },
      fontSize: {
        sm: [
          'var(--p-font-size-sm)',
          {
            lineHeight: 'var(--p-font-height-sm)',
            letterSpacing: 'var(--p-letter-spacing-sm)',
          },
        ],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
