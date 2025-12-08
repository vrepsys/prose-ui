import type {
  Base,
  ColorSpec,
  Components,
  ComponentsSpec,
  CoreSpec,
  DesignSystem,
  TextStyle,
} from './ds/index.js'
import { cssSystem, cssVariables, MEDIA_ABOVE_LARGE } from './ds/index.js'
import {
  greenDark,
  green as radixGreen,
} from '@radix-ui/colors'

import { hexToHsl } from './utils/hex-to-hsl.js'
import { selectTriggerStyles, selectPortalStyles } from './select.js'

const hsl = (color: string) => {
  return color.startsWith('#') ? hexToHsl(color) : color
}

const negative = (value: string) => `calc(${value} * -1)`

const transparent = (color: string, opacity: number) => `color-mix(in oklab, ${color} ${opacity}%, transparent)`

const mix = (color1: string, color2: string, ratio: number = 50, opacity: number = 100) => `color-mix(in oklab, color-mix(in oklab, ${color1} ${100 - ratio}%, ${color2} ${ratio}%) ${opacity}%, transparent)`

const slate = {
  50: 'oklch(0.984 0.003 247.858)',
  100: 'oklch(0.968 0.007 247.896)',
  200: 'oklch(0.929 0.013 255.508)',
  300: 'oklch(0.869 0.022 252.894)',
  400: 'oklch(0.704 0.04 256.788)',
  500: 'oklch(0.554 0.046 257.417)',
  600: 'oklch(0.446 0.043 257.281)',
  700: 'oklch(0.372 0.044 257.287)',
  800: 'oklch(0.279 0.041 260.031)',
  900: 'oklch(0.208 0.042 265.755)',
  950: 'oklch(0.129 0.042 264.695)',
}

const gray = {
  50: 'oklch(0.985 0.002 247.839)',
  100: 'oklch(0.967 0.003 264.542)',
  200: 'oklch(0.928 0.006 264.531)',
  300: 'oklch(0.872 0.01 258.338)',
  400: 'oklch(0.707 0.022 261.325)',
  500: 'oklch(0.551 0.027 264.364)',
  600: 'oklch(0.446 0.03 256.802)',
  700: 'oklch(0.373 0.034 259.733)',
  800: 'oklch(0.278 0.033 256.848)',
  900: 'oklch(0.21 0.034 264.665)',
  950: 'oklch(0.13 0.028 261.692)',
}

const zinc = {
  50: 'oklch(0.985 0 0)',
  100: 'oklch(0.967 0.001 286.375)',
  200: 'oklch(0.92 0.004 286.32)',
  300: 'oklch(0.871 0.006 286.286)',
  400: 'oklch(0.705 0.015 286.067)',
  500: 'oklch(0.552 0.016 285.938)',
  600: 'oklch(0.442 0.017 285.786)',
  700: 'oklch(0.37 0.013 285.805)',
  800: 'oklch(0.274 0.006 286.033)',
  900: 'oklch(0.21 0.006 285.885)',
  950: 'oklch(0.141 0.005 285.823)',
}

const neutral = {
  50: 'oklch(0.985 0 0)',
  100: 'oklch(0.97 0 0)',
  200: 'oklch(0.922 0 0)',
  300: 'oklch(0.87 0 0)',
  400: 'oklch(0.708 0 0)',
  500: 'oklch(0.556 0 0)',
  600: 'oklch(0.439 0 0)',
  700: 'oklch(0.371 0 0)',
  800: 'oklch(0.269 0 0)',
  900: 'oklch(0.205 0 0)',
  950: 'oklch(0.145 0 0)',
}



const stone = {
  50: 'oklch(0.985 0.001 106.423)',
  100: 'oklch(0.97 0.001 106.424)',
  200: 'oklch(0.923 0.003 48.717)',
  300: 'oklch(0.869 0.005 56.366)',
  400: 'oklch(0.709 0.01 56.259)',
  500: 'oklch(0.553 0.013 58.071)',
  600: 'oklch(0.444 0.011 73.639)',
  700: 'oklch(0.374 0.01 67.558)',
  800: 'oklch(0.268 0.007 34.298)',
  900: 'oklch(0.216 0.006 56.043)',
  950: 'oklch(0.147 0.004 49.25)',
}

const red = {
  50: 'oklch(0.971 0.013 17.38)',
  100: 'oklch(0.936 0.032 17.717)',
  200: 'oklch(0.885 0.062 18.334)',
  300: 'oklch(0.808 0.114 19.571)',
  400: 'oklch(0.704 0.191 22.216)',
  500: 'oklch(0.637 0.237 25.331)',
  600: 'oklch(0.577 0.245 27.325)',
  700: 'oklch(0.505 0.213 27.518)',
  800: 'oklch(0.444 0.177 26.899)',
  900: 'oklch(0.396 0.141 25.723)',
  950: 'oklch(0.258 0.092 26.042)',
}

const orange = {
  50: 'oklch(0.98 0.016 73.684)',
  100: 'oklch(0.954 0.038 75.164)',
  200: 'oklch(0.901 0.076 70.697)',
  300: 'oklch(0.837 0.128 66.29)',
  400: 'oklch(0.75 0.183 55.934)',
  500: 'oklch(0.705 0.213 47.604)',
  600: 'oklch(0.646 0.222 41.116)',
  700: 'oklch(0.553 0.195 38.402)',
  800: 'oklch(0.47 0.157 37.304)',
  900: 'oklch(0.408 0.123 38.172)',
  950: 'oklch(0.266 0.079 36.259)',
}

const amber = {
  50: 'oklch(0.987 0.022 95.277)',
  100: 'oklch(0.962 0.059 95.617)',
  200: 'oklch(0.924 0.12 95.746)',
  300: 'oklch(0.879 0.169 91.605)',
  400: 'oklch(0.828 0.189 84.429)',
  500: 'oklch(0.769 0.188 70.08)',
  600: 'oklch(0.666 0.179 58.318)',
  700: 'oklch(0.555 0.163 48.998)',
  800: 'oklch(0.473 0.137 46.201)',
  900: 'oklch(0.414 0.112 45.904)',
  950: 'oklch(0.279 0.077 45.635)',
}

const yellow = {
  50: 'oklch(0.987 0.026 102.212)',
  100: 'oklch(0.973 0.071 103.193)',
  200: 'oklch(0.945 0.129 101.54)',
  300: 'oklch(0.905 0.182 98.111)',
  400: 'oklch(0.852 0.199 91.936)',
  500: 'oklch(0.795 0.184 86.047)',
  600: 'oklch(0.681 0.162 75.834)',
  700: 'oklch(0.554 0.135 66.442)',
  800: 'oklch(0.476 0.114 61.907)',
  900: 'oklch(0.421 0.095 57.708)',
  950: 'oklch(0.286 0.066 53.813)',
}

const lime = {
  50: 'oklch(0.986 0.031 120.757)',
  100: 'oklch(0.967 0.067 122.328)',
  200: 'oklch(0.938 0.127 124.321)',
  300: 'oklch(0.897 0.196 126.665)',
  400: 'oklch(0.841 0.238 128.85)',
  500: 'oklch(0.768 0.233 130.85)',
  600: 'oklch(0.648 0.2 131.684)',
  700: 'oklch(0.532 0.157 131.589)',
  800: 'oklch(0.453 0.124 130.933)',
  900: 'oklch(0.405 0.101 131.063)',
  950: 'oklch(0.274 0.072 132.109)',
}

const green = {
  50: 'oklch(0.982 0.018 155.826)',
  100: 'oklch(0.962 0.044 156.743)',
  200: 'oklch(0.925 0.084 155.995)',
  300: 'oklch(0.871 0.15 154.449)',
  400: 'oklch(0.792 0.209 151.711)',
  500: 'oklch(0.723 0.219 149.579)',
  600: 'oklch(0.627 0.194 149.214)',
  700: 'oklch(0.527 0.154 150.069)',
  800: 'oklch(0.448 0.119 151.328)',
  900: 'oklch(0.393 0.095 152.535)',
  950: 'oklch(0.266 0.065 152.934)',
}

const emerald = {
  50: 'oklch(0.979 0.021 166.113)',
  100: 'oklch(0.95 0.052 163.051)',
  200: 'oklch(0.905 0.093 164.15)',
  300: 'oklch(0.845 0.143 164.978)',
  400: 'oklch(0.765 0.177 163.223)',
  500: 'oklch(0.696 0.17 162.48)',
  600: 'oklch(0.596 0.145 163.225)',
  700: 'oklch(0.508 0.118 165.612)',
  800: 'oklch(0.432 0.095 166.913)',
  900: 'oklch(0.378 0.077 168.94)',
  950: 'oklch(0.262 0.051 172.552)',
}

const teal = {
  50: 'oklch(0.984 0.014 180.72)',
  100: 'oklch(0.953 0.051 180.801)',
  200: 'oklch(0.91 0.096 180.426)',
  300: 'oklch(0.855 0.138 181.071)',
  400: 'oklch(0.777 0.152 181.912)',
  500: 'oklch(0.704 0.14 182.503)',
  600: 'oklch(0.6 0.118 184.704)',
  700: 'oklch(0.511 0.096 186.391)',
  800: 'oklch(0.437 0.078 188.216)',
  900: 'oklch(0.386 0.063 188.416)',
  950: 'oklch(0.277 0.046 192.524)',
}

const cyan = {
  50: 'oklch(0.984 0.019 200.873)',
  100: 'oklch(0.956 0.045 203.388)',
  200: 'oklch(0.917 0.08 205.041)',
  300: 'oklch(0.865 0.127 207.078)',
  400: 'oklch(0.789 0.154 211.53)',
  500: 'oklch(0.715 0.143 215.221)',
  600: 'oklch(0.609 0.126 221.723)',
  700: 'oklch(0.52 0.105 223.128)',
  800: 'oklch(0.45 0.085 224.283)',
  900: 'oklch(0.398 0.07 227.392)',
  950: 'oklch(0.302 0.056 229.695)',
}

const sky = {
  50: 'oklch(0.977 0.013 236.62)',
  100: 'oklch(0.951 0.026 236.824)',
  200: 'oklch(0.901 0.058 230.902)',
  300: 'oklch(0.828 0.111 230.318)',
  400: 'oklch(0.746 0.16 232.661)',
  500: 'oklch(0.685 0.169 237.323)',
  600: 'oklch(0.588 0.158 241.966)',
  700: 'oklch(0.5 0.134 242.749)',
  800: 'oklch(0.443 0.11 240.79)',
  900: 'oklch(0.391 0.09 240.876)',
  950: 'oklch(0.293 0.066 243.157)',
}

const blue = {
  50: 'oklch(0.97 0.014 254.604)',
  100: 'oklch(0.932 0.032 255.585)',
  200: 'oklch(0.882 0.059 254.128)',
  300: 'oklch(0.809 0.105 251.813)',
  400: 'oklch(0.707 0.165 254.624)',
  500: 'oklch(0.623 0.214 259.815)',
  600: 'oklch(0.546 0.245 262.881)',
  700: 'oklch(0.488 0.243 264.376)',
  800: 'oklch(0.424 0.199 265.638)',
  900: 'oklch(0.379 0.146 265.522)',
  950: 'oklch(0.282 0.091 267.935)',
}

const indigo = {
  50: 'oklch(0.962 0.018 272.314)',
  100: 'oklch(0.93 0.034 272.788)',
  200: 'oklch(0.87 0.065 274.039)',
  300: 'oklch(0.785 0.115 274.713)',
  400: 'oklch(0.673 0.182 276.935)',
  500: 'oklch(0.585 0.233 277.117)',
  600: 'oklch(0.511 0.262 276.966)',
  700: 'oklch(0.457 0.24 277.023)',
  800: 'oklch(0.398 0.195 277.366)',
  900: 'oklch(0.359 0.144 278.697)',
  950: 'oklch(0.257 0.09 281.288)',
}

const violet = {
  50: 'oklch(0.969 0.016 293.756)',
  100: 'oklch(0.943 0.029 294.588)',
  200: 'oklch(0.894 0.057 293.283)',
  300: 'oklch(0.811 0.111 293.571)',
  400: 'oklch(0.702 0.183 293.541)',
  500: 'oklch(0.606 0.25 292.717)',
  600: 'oklch(0.541 0.281 293.009)',
  700: 'oklch(0.491 0.27 292.581)',
  800: 'oklch(0.432 0.232 292.759)',
  900: 'oklch(0.38 0.189 293.745)',
  950: 'oklch(0.283 0.141 291.089)',
}

const purple = {
  50: 'oklch(0.977 0.014 308.299)',
  100: 'oklch(0.946 0.033 307.174)',
  200: 'oklch(0.902 0.063 306.703)',
  300: 'oklch(0.827 0.119 306.383)',
  400: 'oklch(0.714 0.203 305.504)',
  500: 'oklch(0.627 0.265 303.9)',
  600: 'oklch(0.558 0.288 302.321)',
  700: 'oklch(0.496 0.265 301.924)',
  800: 'oklch(0.438 0.218 303.724)',
  900: 'oklch(0.381 0.176 304.987)',
  950: 'oklch(0.291 0.149 302.717)',
}

const fuchsia = {
  50: 'oklch(0.977 0.017 320.058)',
  100: 'oklch(0.952 0.037 318.852)',
  200: 'oklch(0.903 0.076 319.62)',
  300: 'oklch(0.833 0.145 321.434)',
  400: 'oklch(0.74 0.238 322.16)',
  500: 'oklch(0.667 0.295 322.15)',
  600: 'oklch(0.591 0.293 322.896)',
  700: 'oklch(0.518 0.253 323.949)',
  800: 'oklch(0.452 0.211 324.591)',
  900: 'oklch(0.401 0.17 325.612)',
  950: 'oklch(0.293 0.136 325.661)',
}

const pink = {
  50: 'oklch(0.971 0.014 343.198)',
  100: 'oklch(0.948 0.028 342.258)',
  200: 'oklch(0.899 0.061 343.231)',
  300: 'oklch(0.823 0.12 346.018)',
  400: 'oklch(0.718 0.202 349.761)',
  500: 'oklch(0.656 0.241 354.308)',
  600: 'oklch(0.592 0.249 0.584)',
  700: 'oklch(0.525 0.223 3.958)',
  800: 'oklch(0.459 0.187 3.815)',
  900: 'oklch(0.408 0.153 2.432)',
  950: 'oklch(0.284 0.109 3.907)',
}

const rose = {
  50: 'oklch(0.969 0.015 12.422)',
  100: 'oklch(0.941 0.03 12.58)',
  200: 'oklch(0.892 0.058 10.001)',
  300: 'oklch(0.81 0.117 11.638)',
  400: 'oklch(0.712 0.194 13.428)',
  500: 'oklch(0.645 0.246 16.439)',
  600: 'oklch(0.586 0.253 17.585)',
  700: 'oklch(0.514 0.222 16.935)',
  800: 'oklch(0.455 0.188 13.697)',
  900: 'oklch(0.41 0.159 10.272)',
  950: 'oklch(0.271 0.105 12.094)',
}

const palette = {
  slate,
  gray,
  zinc,
  neutral,
  stone,
  red,
  orange,
  amber,
  yellow,
  lime,
  green,
  emerald,
  teal,
  cyan,
  sky,
  blue,
  indigo,
  violet,
  purple,
  fuchsia,
  pink,
  rose,
}

const white = '#fff'
const black = '#000'

const custom = {
  50: 'oklch(0.985 0 0)',
  100: 'oklch(0.97 0 0)',
  200: 'oklch(0.922 0 0)',
  300: 'oklch(0.87 0 0)',
  400: 'oklch(0.708 0 0)',
  500: 'oklch(0.556 0 0)',
  600: 'oklch(0.439 0 0)',
  700: 'oklch(0.371 0 0)',
  800: 'oklch(0.269 0 0)',
  900: 'oklch(0.225 0 0)',
  950: 'oklch(0.165 0 0)',
}

// Change this to experiment with different color palettes (slate, gray, zinc, neutral, stone)
const scale = custom

export const getCoreSpec = (): CoreSpec => ({
  spacing: {
    'none': '0',
    'px': '1px',
    'space0-5': '0.125rem', // 2px
    'space1': '0.25rem', // 4px
    'space1-5': '0.375rem', // 6px
    'space2': '0.5rem', // 8px
    'space3': '0.75rem', // 12px
    'space4': '1rem', // 16px
    'space5': '1.5rem', // 24px
    'space6': '2rem', // 32px
    'space7': '2.5rem', // 40px
    'space8': '3rem', // 48px
    'space9': '4rem', // 64px
  },
  font: {
    family: {
      base: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu',
      heading: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu',
      mono: '"SF Mono", SFMono-Regular, ui-monospace, "DejaVu Sans Mono", Menlo, Consolas, monospace',
    },
    size: {
      base: '1rem',
      sm: '0.875rem',
    },
    weight: {
      normal: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
    },
    height: {
      base: '1.75rem',
      sm: '1.25rem',
    },
  },
  letterSpacing: {
    base: '0.0175rem',
    sm: '0',
  },
  border: {
    radius: '4px',
  },
  content: {
    gap: {
      base: '1.5rem',
      heading: '2.5rem',
      cluster: '0.5rem',
      [MEDIA_ABOVE_LARGE]: {
        base: '1.25rem',
        heading: '2.75rem',
        cluster: '0.625rem',
      },
    },
  },
})

export const getLightColorsSpec = (): ColorSpec => ({
  color: {
    text: {
      strong: black,
      base: black,
      
      muted: 'oklch(0.5 0 0)',
      xmuted: 'oklch(0.58 0 0)',
      disabled: scale[500],
      accent: 'oklch(0.54 0.22 143.88)',
      note: scale[950],
      info: blue[800],
      warning: amber[800],
      success: green[800],
      danger: red[700],
      syntax1: 'oklch(0.51 0.15 142.33)',
      syntax2: 'oklch(0.48 0.12 51.36)',
      syntax3: 'oklch(0.51 0.2 324.32)',
      syntax4: 'oklch(0.38 0.19 272.76)',
    },
    bg: {
      base: white,
      surface1: custom[100],
      surface1Hover: mix(custom[100], black, 3),
      surface2: custom[100],
      surface2Hover: mix(custom[100], black, 3),
      surface2Active: white,
      accent: transparent(green[700], 10),
      note: transparent(scale[950], 5),
      info: transparent(blue[800], 5),
      warning: transparent(amber[800], 5),
      success: transparent(green[800], 5),
      danger: transparent(red[700], 5),
    },
    border: {
      base: 'oklch(0 0 0 / 10%)',
      subtle: 'oklch(0 0 0 / 6%)',
      outline: hsl(radixGreen.green10),
    },
  },
})

const bg = {
  base: scale[900],
  surface1: mix(scale[900], scale[950], 60),
  surface2: scale[950],
}

export const getDarkColorsSpec = (): ColorSpec => ({
  color: {
    bg: {
      base: bg.base,
      surface1: bg.surface1,
      surface2: bg.surface2,
      surface1Hover: mix(bg.surface1, white, 3),
      surface2Hover: mix(bg.surface2, white, 10),
      surface2Active: mix(bg.surface2, white, 20),
      accent: transparent(green[50], 10),
      note: transparent(scale[50], 5),
      info: transparent(blue[200], 5),
      warning: transparent(amber[200], 5),
      success: transparent(green[200], 5),
      danger: transparent(red[300], 5),
    },
    text: {
      strong: white,
      base: scale[200],
      muted: scale[400],
      xmuted: scale[500],
      disabled: scale[600],
      accent: 'oklch(0.78 0.1 155.05)',
      note: scale[50],
      info: blue[200],
      warning: amber[200],
      success: green[200],
      danger: red[300],
      syntax1: 'oklch(0.83 0.13 159.66)',
      syntax2: 'oklch(0.79 0.08 84.07)',
      syntax3: 'oklch(0.74 0.11 249.51)',
      syntax4: 'oklch(0.77 0.08 357.45)',
    },
    border: {
      base: 'oklch(1 0 0 / 7%)',
      subtle: 'oklch(1 0 0 / 4%)',
      outline: hsl(greenDark.green10),
    },
  },
})

export const getComponentsSpec = (ds: Base): ComponentsSpec => {
  const h1 = {
    fontFamily: ds.font.family.heading,
    fontSize: '1.875rem',
    fontWeight: ds.font.weight.semiBold,
    lineHeight: '2.25rem',
    letterSpacing: '-0.065rem',
    color: ds.color.text.strong,
    [MEDIA_ABOVE_LARGE]: {
      fontSize: '2.125rem',
      lineHeight: '2.75rem',
      letterSpacing: '-0.085rem',
    },
  }
  const h2 = {
    fontFamily: ds.font.family.heading,
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    letterSpacing: '-0.035rem',
    fontWeight: ds.font.weight.semiBold,
    color: ds.color.text.strong,
    [MEDIA_ABOVE_LARGE]: {
      fontSize: '1.375rem',
      lineHeight: '2rem',
    },
  }
  const h3 = {
    fontFamily: ds.font.family.heading,
    fontSize: '1.09375rem',
    lineHeight: '1.5rem',
    letterSpacing: '-0.035rem',
    fontWeight: ds.font.weight.semiBold,
    color: ds.color.text.strong,
    [MEDIA_ABOVE_LARGE]: {
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
    },
  }
  const h4 = {
    fontFamily: ds.font.family.heading,
    fontSize: '0.9375rem',
    lineHeight: '1.5rem',
    letterSpacing: '-0.015rem',
    fontWeight: ds.font.weight.semiBold,
    color: ds.color.text.strong,
    [MEDIA_ABOVE_LARGE]: {
      fontSize: '1rem',
      lineHeight: '1.75rem',
    },
  }
  const h6 = {
    fontFamily: ds.font.family.heading,
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    letterSpacing: '-0.015rem',
    fontWeight: '500',
    color: ds.color.text.strong,
  }
  const baseTitle = {
    fontFamily: ds.font.family.heading,
    fontSize: ds.font.size.base,
    lineHeight: ds.font.height.base,
    letterSpacing: ds.letterSpacing.base,
    fontWeight: ds.font.weight.medium,
    color: ds.color.text.strong,
  }

  return {
    body: {
      font: {
        family: ds.font.family.base,
        size: ds.font.size.base,
        height: ds.font.height.base,
      },
      color: {
        bg: ds.color.bg.base,
        text: ds.color.text.base,
      },
    },
    h1: {
      ...h1,
    },
    h2: {
      ...h2,
    },
    h3: {
      ...h3,
    },
    h4: {
      ...h4,
    },
    h5: {
      fontFamily: ds.font.family.heading,
      fontSize: '0.90625rem',
      lineHeight: '1.25rem',
      letterSpacing: '-0.015rem',
      fontWeight: ds.font.weight.semiBold,
      color: ds.color.text.strong,
    },
    h6: {
      ...h6,
    },
    link: {
      text: {
        color: ds.color.text.accent,
        decorationLine: 'underline',
        decorationStyle: 'solid',
        decorationColor: transparent(ds.color.text.accent, 25),
      },
      fontWeight: 'inherit',
    },
    inlineCode: {
      font: {
        size: ds.font.size.sm,
        weight: ds.font.weight.normal,
        height: ds.font.height.sm,
        spacing: ds.letterSpacing.sm,
      },
      color: {
        bg: ds.color.bg.surface2,
      },
      letterSpacing: ds.letterSpacing.sm,
    },
    callout: {
      color: {
        text: ds.color.text.base,
      },
      note: {
        color: {
          text: ds.color.text.note,
          bg: ds.color.bg.note,
        },
      },
      info: {
        color: {
          text: ds.color.text.info,
          bg: ds.color.bg.info,
        },
      },
      warning: {
        color: {
          text: ds.color.text.warning,
          bg: ds.color.bg.warning,
        },
      },
      success: {
        color: {
          text: ds.color.text.success,
          bg: ds.color.bg.success,
        },
      },
      danger: {
        color: {
          text: ds.color.text.danger,
          bg: ds.color.bg.danger,
        },
      },
      font: {
        size: ds.font.size.sm,
        weight: ds.font.weight.medium,
        height: ds.font.height.sm,
      },
    },
    card: {
      color: {
        text: ds.color.text.base,
        muted: ds.color.text.muted,
        bg: ds.color.bg.surface1,
        bgHover: ds.color.bg.surface1Hover,
        border: ds.color.border.subtle,
        borderHover: ds.color.border.base,
        icon: ds.color.text.base,
        cta: ds.color.text.muted,
        ctaHover: ds.color.text.accent,
      },
      font: {
        title: {
          size: ds.font.size.sm,
          height: ds.font.height.sm,
          weight: ds.font.weight.medium,
        },
        body: {
          size: ds.font.size.sm,
          height: ds.font.height.sm,
          weight: ds.font.weight.normal,
        },
        cta: {
          size: ds.font.size.sm,
          height: ds.font.height.sm,
          weight: ds.font.weight.medium,
        },
      },
    },
    subtitle: {
      color: {
        text: ds.color.text.muted,
      },
      font: {
        size: '1rem',
        height: '1.5rem',
        weight: ds.font.weight.normal,
      },
      [MEDIA_ABOVE_LARGE]: {
        font: {
          size: '1.125rem',
          height: '1.75rem',
          weight: ds.font.weight.normal,
        },
      },
    },
    steps: {
      indicator: {
        bg: ds.color.bg.surface2,
        text: ds.color.text.strong,
        outline: ds.color.bg.surface2,
      },
      connector: ds.color.border.base,
      title: {
        base: { ...baseTitle },
        h1: { ...h1 },
        h2: { ...h2 },
        h3: { ...h3 },
        h4: { ...h4 },
        h5: {
          fontFamily: ds.font.family.heading,
          fontSize: '0.90625rem',
          lineHeight: '1.25rem',
          letterSpacing: '-0.015rem',
          fontWeight: ds.font.weight.semiBold,
          color: ds.color.text.strong,
        },
        h6: { ...h6 },
      },
      body: {
        color: ds.color.text.muted,
        size: ds.font.size.base,
        height: ds.font.height.base,
        weight: ds.font.weight.normal,
      },
    },
    blockquote: {
      color: {
        text: ds.color.text.base,
      },
      font: {
        size: ds.font.size.base,
        weight: ds.font.weight.normal,
        height: ds.font.height.base,
        style: 'italic',
      },
    },
    codeBlock: {
      color: {
        bg: ds.color.bg.surface2,
        text: ds.color.text.base,
        constant: ds.color.text.syntax1,
        string: ds.color.text.syntax2,
        comment: ds.color.text.muted,
        keyword: ds.color.text.syntax3,
        parameter: ds.color.text.base,
        function: ds.color.text.syntax4,
        stringExpression: ds.color.text.syntax2,
        punctuation: ds.color.text.base,
        link: ds.color.text.syntax2,
      },
      font: {
        size: ds.font.size.sm,
        weight: ds.font.weight.normal,
        height: ds.font.height.sm,
        spacing: ds.letterSpacing.sm,
      },
      lineNumber: {
        color: {
          text: ds.color.text.xmuted,
        },
      },
    },
    table: {
      font: {
        size: ds.font.size.sm,
        height: ds.font.height.sm,
        weight: ds.font.weight.normal,
      },
      th: {
        font: {
          size: ds.font.size.sm,
          height: ds.font.height.sm,
          weight: ds.font.weight.semiBold,
        },
        color: {
          text: ds.color.text.muted,
        },
      },
      border: {
        color: ds.color.border.base,
      },
    },
    frame: {
      caption: {
        color: {
          text: ds.color.text.muted,
        },
        font: {
          size: ds.font.size.sm,
          height: ds.font.height.sm,
          weight: ds.font.weight.medium,
          style: 'italic',
        },
      },
    },
  }
}

export const componentsStyles = (ds: DesignSystem) => {
  const gap = ds.content.gap
  const color = ds.color

  // Container elements that should cluster together when consecutive
  const cluster = '.code-block, .code-group, .callout, .card, .cards, .frame'

  const headingStyle = (style: TextStyle) => ({
    'font-family': style.fontFamily,
    'font-size': style.fontSize,
    'font-weight': style.fontWeight,
    'letter-spacing': style.letterSpacing,
    'line-height': style.lineHeight,
    'color': style.color,
    'margin-top': gap.heading,
    'margin-bottom': gap.cluster,
  })
  return {
    '::selection': {
      'background-color': transparent(ds.color.text.strong, 15),
    },
    ':focus-visible': {
      'outline': `2px solid ${color.text.accent}`,
      'outline-offset': '2px',
    },
    'p': {
      'margin-top': gap.base,
      'margin-bottom': gap.cluster,
    },
    // Paragraph followed by cluster element or list → tight spacing
    [`p + :is(${cluster}, ul, ol:not(.steps))`]: {
      'margin-top': gap.cluster,
    },
    // Heading followed by any content → tight spacing
    [`:is(h1, h2, h3, h4, h5, h6) + :is(p, ul, ol:not(.steps), blockquote, table, ${cluster})`]: {
      'margin-top': gap.cluster,
    },
    // Consecutive headings → tight spacing
    ':is(h1, h2, h3, h4, h5, h6) + :is(h1, h2, h3, h4, h5, h6)': {
      'margin-top': gap.base,
    },
    // Consecutive cluster elements → tight spacing
    [`:is(${cluster}) + :is(${cluster})`]: {
      'margin-top': gap.cluster,
    },
    'code': {
      'font-family': ds.font.family.mono,
    },
    'li': {
      [`& > :is(${cluster}, table, ul, ol)`]: {
        'margin-top': gap.cluster,
        'margin-bottom': gap.cluster,
      },
      '& > .code-block': {
        'margin-bottom': gap.base,
      },
      '& > p': {
        'margin-top': '0',
        'margin-bottom': '0',
      },
    },
    'p, table, li': {
      'code': {
        'background-color': ds.inlineCode.color.bg,
        'padding-left': ds.spacing.space1,
        'padding-right': ds.spacing.space1,
        'padding-top': ds.spacing['space0-5'],
        'padding-bottom': ds.spacing['space0-5'],
        'border-radius': ds.border.radius,
        'letter-spacing': ds.inlineCode.letterSpacing,
        'font-size': ds.inlineCode.font.size,
        'line-height': ds.inlineCode.font.height,
        'font-weight': ds.inlineCode.font.weight,
      },
      'pre code': {
        'background-color': 'transparent',
        'display': 'inline',
        'padding': '0',
        'border-radius': '0',
      },
    },
    '.copy-button': {
      'position': 'relative',
      'background-color': ds.codeBlock.color.bg,
      'border-radius': ds.border.radius,
      'padding': ds.spacing.space1,
      'color': ds.color.text.xmuted,
      'transition': 'color 150ms ease, background-color 150ms ease',
      'cursor': 'pointer',

      '.icon-wrapper': {
        position: 'relative',
        width: '16px',
        height: '16px',
      },
      '.icon': {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        transition: 'opacity 150ms ease',
      },
      '.icon-default': {
        opacity: '1',
      },

      '.icon-hover': {
        opacity: '0',
      },
    },
    '.copy-button:hover': {
      'color': ds.color.text.base,
      'background-color': ds.color.bg.surface2Hover,
      '.icon-default': {
        opacity: '0',
      },
      '.icon-hover': {
        opacity: '1',
      },
    },
    '.copied-icon': {
      'background-color': ds.codeBlock.color.bg,
      'padding': ds.spacing.space1,
      'border-radius': ds.border.radius,
      'color': ds.color.text.success,
    },
    '.code-group': {
      'margin-top': gap.base,
      'margin-bottom': gap.cluster,
      'border-width': '1px',
      'border-color': ds.color.border.base,
      'border-radius': ds.border.radius,
      'background-color': ds.codeBlock.color.bg,
      'display': 'flex',
      'flex-direction': 'column',
        '.header': {
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        'gap': ds.spacing.space2,
        'border-bottom': `1px solid ${ds.color.border.base}`,
        'padding-top': ds.spacing['space1-5'],
        'padding-bottom': ds.spacing['space1-5'],
        'padding-left': ds.spacing.space3,
        'padding-right': ds.spacing['space1-5'],
        'border-color': ds.color.border.base,
        '.header-actions': {
          'display': 'flex',
          'align-items': 'center',
          'gap': ds.spacing['space0-5'],
        },
        '.tabs-list': {
          'display': 'flex',
          'gap': ds.spacing.space1,
          'margin-left': `calc(-1 * ${ds.spacing.space1})`,
          '.tab-trigger': {
            'color': ds.color.text.muted,
            'font-size': ds.font.size.sm,
            'font-weight': ds.font.weight.medium,
            'line-height': ds.font.height.sm,
            'letter-spacing': ds.letterSpacing.sm,
            'padding-left': ds.spacing['space1'],
            'padding-right': ds.spacing['space1'],
            'transition': 'color 150ms ease',
            'cursor': 'pointer',
            '&:hover': {
              'color': ds.color.text.accent,
            },
          },
          '.tab-trigger[data-state="active"]': {
            'color': ds.color.text.accent,
            'box-shadow': `0 7px 0 0 ${ds.codeBlock.color.bg}, 0 9px 0 0 currentColor`,
          },
        },
        '.title': {
          'color': ds.color.text.muted,
          'font-size': ds.font.size.sm,
          'line-height': ds.font.height.sm,
          'letter-spacing': ds.letterSpacing.sm,
          'font-weight': ds.font.weight.medium,
        },
        '.select-trigger': {
          'margin-left': 'auto',
        },
      },
    },
    '.tabs': {
      'margin-top': gap.base,
      'margin-bottom': gap.cluster,
      'display': 'flex',
      'flex-direction': 'column',
      '.header': {
        'display': 'flex',
        'align-items': 'center',
        'gap': ds.spacing.space2,
        // 'padding-top': ds.spacing['space1-5'],
        // 'padding-bottom': ds.spacing['space1-5'],
        '.tabs-list': {
          'display': 'flex',
          'background-color': ds.color.bg.surface2,
          'border-top-left-radius': ds.border.radius,
          'border-top-right-radius': ds.border.radius,
          'padding': ds.spacing.space1,
          'gap': ds.spacing.space1,
          // 'margin-left': `calc(-1 * ${ds.spacing.space2})`,
          '.tab-trigger': {
            'color': ds.color.text.muted,
            'font-size': ds.font.size.sm,
            'font-weight': ds.font.weight.medium,
            'line-height': ds.font.height.sm,
            'letter-spacing': ds.letterSpacing.sm,
            'padding-left': ds.spacing.space2,
            'padding-right': ds.spacing.space2,
            'padding-top': ds.spacing.space1,
            'padding-bottom': ds.spacing.space1,
            'border-radius': `calc(${ds.border.radius} - 1px)`,
            'cursor': 'pointer',
            'transition': 'color 150ms ease',
            '&:hover': {
              'color': ds.color.text.strong,
              'background-color': ds.color.bg.surface2Hover,
            },
          },
          '.tab-trigger[data-state="active"]': {
            'background-color': ds.color.bg.surface2Active,
            'color': ds.color.text.strong,
            'box-shadow': '1px 2px 4px -1px #0003',
          },
        },
      },
      '.tab-content': {
        'padding-top': ds.spacing.space3,
        'padding-bottom': ds.spacing.space3,
        // 'background-color': transparent(ds.color.bg.low, 20),
        'border': `1px solid ${ds.color.border.subtle}`,
        'border-bottom-left-radius': ds.border.radius,
        'border-bottom-right-radius': ds.border.radius,
        'border-top-right-radius': ds.border.radius,
        'padding': ds.spacing.space3,
        '> *:first-child': {
          'margin-top': '0',
        },
        '> *:last-child': {
          'margin-bottom': '0',
        },
      },
    },
    '.code-block': {
      'margin-top': gap.base,
      'margin-bottom': gap.cluster,
      'border-width': '1px',
      'border-color': ds.color.border.base,
      'border-radius': ds.border.radius,
      'background-color': ds.codeBlock.color.bg,
      'display': 'flex',
      'flex-direction': 'column',

      '.header': {
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        'border-bottom': `1px solid ${ds.color.border.base}`,
        'padding-top': ds.spacing['space1-5'],
        'padding-bottom': ds.spacing['space1-5'],
        'padding-left': ds.spacing.space3,
        'padding-right': ds.spacing['space1-5'],
        'border-color': ds.color.border.base,
        '.title': {
          'color': ds.color.text.muted,
          'font-size': ds.font.size.sm,
          'line-height': ds.font.height.sm,
          'letter-spacing': ds.letterSpacing.sm,
          'font-weight': ds.font.weight.medium,
        },
      },
    },
    '.code-block, .code-group': {
      '.body:has(> .copy-button), .body:has(> .copied-icon)': {
        'padding-right': ds.spacing.space6,
        '.scroll-area-root': {
          'position': 'relative',
          '&::after': {
            // fade on the right to hint horizontal scroll without covering the scrollbar
            'content': "''",
            'position': 'absolute',
            'top': 0,
            'right': 0,
            'width': ds.spacing.space6,
            'bottom': `calc(${ds.spacing['space1-5']} + ${ds.spacing['space0-5']} * 2)`,
            'pointer-events': 'none',
            'background': `linear-gradient(90deg, transparent, ${ds.codeBlock.color.bg})`,
          },
        },
      },
      '.body': {
        'position': 'relative',
        'display': 'flex',
        'width': '100%',
        'font-family': ds.font.family.mono,
        'font-size': ds.codeBlock.font.size,
        'line-height': ds.codeBlock.font.height,
        'font-weight': ds.codeBlock.font.weight,
        'letter-spacing': ds.codeBlock.font.spacing,
        'word-break': 'keep-all',
        'font-variant-ligatures': 'none',
        '.copy-button': {
          // 'visibility': 'hidden',
          // 'transition': 'opacity 100ms ease',
          // 'border-width': '1px',
          // 'border-color': ds.color.border,
          // 'opacity': 0,
          'position': 'absolute',
          'right': ds.spacing.space2,
          'top': ds.spacing.space2,
        },
        '.copied-icon': {
          'position': 'absolute',
          'right': ds.spacing.space2,
          'top': ds.spacing.space2,
        },
        '&:hover .copy-button': {
          // opacity: 1,
          visibility: 'visible',
        },
      },
      '.line-numbers': {
        'user-select': 'none',
        'padding': ds.spacing.space3,
        'text-align': 'right',
      },
      '.line-number': {
        color: ds.codeBlock.lineNumber.color.text,
      },
      '.code-container': {
        'padding-top': ds.spacing.space3,
        'padding-bottom': ds.spacing.space3,
        'padding-left': ds.spacing.space3,
        'padding-right': ds.spacing.space6,
      },
      'code': {
        'display': 'flex',
        'flex-direction': 'column',
      },
      '.line': {
        'font-family': ds.font.family.mono,
        'font-size': ds.codeBlock.font.size,
        'line-height': ds.codeBlock.font.height,
        'height': ds.codeBlock.font.height,
        'letter-spacing': ds.codeBlock.font.spacing,
        'word-break': 'keep-all',
      },
    },
    'blockquote': {
      'margin-top': gap.base,
      'margin-bottom': gap.cluster,
      'border-left-width': ds.spacing['space0-5'],
      'padding-left': ds.spacing.space2,
      'padding-right': ds.spacing.space2,
      'padding-top': ds.spacing.space1,
      'padding-bottom': ds.spacing.space1,
      'border-color': ds.color.text.note,
      'p, ul, ol, li': {
        'font-size': ds.blockquote.font.size,
        'line-height': ds.blockquote.font.height,
        'font-weight': ds.blockquote.font.weight,
        'font-style': ds.blockquote.font.style,
      },
      ':first-child': {
        'margin-top': '0',
      },
      ':last-child': {
        'margin-bottom': '0',
      },
    },
    '.callout': {
      'margin-top': gap.base,
      'margin-bottom': gap.cluster,
      'display': 'flex',
      'flex-direction': 'column',
      'gap': ds.spacing.space1,
      'border-radius': ds.border.radius,
      'padding': ds.spacing.space3,
      '.title': {
        'font-size': ds.font.size.sm,
        'font-weight': ds.font.weight.semiBold,
      },
      '.body': {
        ':first-child': {
          'margin-top': '0',
        },
        ':last-child': {
          'margin-bottom': '0',
        },
        'color': ds.callout.color.text,
        'p, ul, ol, li': {
          'font-size': ds.callout.font.size,
          'line-height': ds.callout.font.height,
          'font-weight': ds.callout.font.weight,
        },
      },
    },
    '.callout[data-variant="note"]': {
      'background-color': ds.callout.note.color.bg,
      '.title': {
        'color': ds.callout.note.color.text,
      },
      '.body': {
        'color': ds.callout.note.color.text,
      },
    },
    '.callout[data-variant="info"]': {
      'background-color': ds.callout.info.color.bg,
      '.title': {
        'color': ds.callout.info.color.text,
      },
      '.body': {
        'color': transparent(ds.callout.info.color.text, 90),
      },
    },
    '.callout[data-variant="tip"]': {
      'background-color': ds.callout.success.color.bg,
      '.title': {
        'color': ds.callout.success.color.text,
      },
      '.body': {
        'color': ds.callout.success.color.text,
      },
    },
    '.callout[data-variant="warning"]': {
      'background-color': ds.callout.warning.color.bg,
      '.title': {
        'color': ds.callout.warning.color.text,
      },
      '.body': {
        'color': ds.callout.warning.color.text,
      },
    },
    '.callout[data-variant="danger"]': {
      'background-color': ds.callout.danger.color.bg,
      '.title': {
        'color': ds.callout.danger.color.text,
      },
      '.body': {
        'color': ds.callout.danger.color.text,
      },
    },
    '.card': {
      'margin-top': gap.base,
      'margin-bottom': gap.cluster,
      'display': 'flex',
      'flex-direction': 'column',
      'gap': ds.spacing.space2,
      'border-radius': ds.border.radius,
      'border': `1px solid ${ds.card.color.border}`,
      'background-color': ds.card.color.bg,
      'padding': ds.spacing.space4,
      'text-decoration': 'none',
      'color': ds.card.color.text,
      'transition': 'background-color 150ms ease, border-color 150ms ease, transform 150ms ease',
      '&.interactive': {
        'cursor': 'pointer',
        '&:hover': {
          'background-color': ds.card.color.bgHover,
          'border-color': ds.card.color.borderHover,
        },
        '&:active': {
          'transform': 'translateY(1px)',
        },
      },
      '.card-content': {
        'display': 'flex',
        'flex-direction': 'column',
        'gap': ds.spacing.space2,
        'flex': '1',
      },
      '&.horizontal': {
        'flex-direction': 'row',
        'align-items': 'flex-start',
        'gap': ds.spacing.space3,
      },
      '&.horizontal .card-content': {
        'flex-direction': 'row',
        'align-items': 'flex-start',
        'justify-content': 'space-between',
        'gap': ds.spacing.space3,
      },
      '.card-header': {
        'display': 'flex',
        'align-items': 'center',
        'gap': ds.spacing.space2,
      },
      '.card-icon': {
        'display': 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'color': ds.card.color.icon,
        'flex-shrink': '0',
        'svg': {
          width: ds.spacing.space4,
          height: ds.spacing.space4,
        },
      },
      '.card-title': {
        'margin': '0',
        'font-size': ds.card.font.title.size,
        'line-height': ds.card.font.title.height,
        'font-weight': ds.card.font.title.weight,
        'color': ds.card.color.text,
      },
      '.card-body': {
        'margin': '0',
        'color': ds.card.color.muted,
        'font-size': ds.card.font.body.size,
        'line-height': ds.card.font.body.height,
        'font-weight': ds.card.font.body.weight,
        'min-width': '0',
        '> *': {
          'margin-top': '0',
          'margin-bottom': '0',
        },
        'p + p': {
          'margin-top': ds.spacing.space1,
        },
      },
      '&.horizontal .card-body': {
        'flex': '1',
      },
      '.card-footer': {
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'flex-end',
        'gap': ds.spacing.space1,
        'font-size': ds.card.font.cta.size,
        'line-height': ds.card.font.cta.height,
        'font-weight': ds.card.font.cta.weight,
        'color': ds.card.color.cta,
        'transition': 'color 150ms ease',
        'margin-top': 'auto',
        'padding-top': ds.spacing.space1,
        'width': '100%',
      },
      '&.horizontal .card-footer': {
        'margin-top': '0',
        'padding-top': '0',
        'align-self': 'center',
        'width': 'auto',
        'flex-shrink': '0',
      },
      '.card-arrow': {
        'display': 'inline-flex',
        'align-items': 'center',

        'justify-content': 'center',
        'width': ds.spacing.space4,
        'height': ds.spacing.space4,
        'transform': 'translateX(0)',
        'transition': 'transform 150ms ease',
      },
      '&:hover .card-arrow': {
        'transform': 'translateX(2px)',
      },
      '&:hover .card-footer': {
        'color': ds.card.color.ctaHover,
      },
    },
    '.cards > .card': {
      'margin': '0',
    },
    '.cards': {
      'margin-top': gap.base,
      'margin-bottom': gap.cluster,
      'display': 'grid',
      'grid-template-columns': 'repeat(var(--columns, 3), minmax(0, 1fr))',
      'column-gap': ds.spacing.space2,
      'row-gap': ds.spacing.space2,
      'align-items': 'stretch',
      '> *': {
        'height': '100%',
        'margin': '0',
      },
    },
    '.steps': {
      'margin-top': gap.base,
      'margin-bottom': gap.cluster,
      'list-style': 'none',
      'padding': '0',
      'display': 'flex',
      'flex-direction': 'column',
      'counter-reset': 'step',
      '--step-indicator-size': ds.spacing.space5,
      '--step-gap': ds.spacing.space3,
      '--step-connector-gap': ds.spacing.space2,
      '--step-title-line-height': ds.steps.title.base.lineHeight,
      '--step-indicator-offset': 'calc((var(--step-title-line-height) - var(--step-indicator-size)) / 2)',
      '--step-indicator-top': 'max(var(--step-indicator-offset), 0px)',
      '--step-connector-start': 'calc(var(--step-indicator-top) + var(--step-indicator-size) + var(--step-connector-gap))',
      '--step-connector-end': 'calc(var(--step-connector-gap) - var(--step-indicator-top))',
      '> li::before': {
        content: 'none',
      },
      '> li': {
        marginBottom: '0',
      },
    },
    '.step': {
      'display': 'grid',
      'grid-template-columns': 'auto 1fr',
      'column-gap': ds.spacing.space3,
      'align-items': 'flex-start',
      'position': 'relative',
      'counter-increment': 'step',
      'padding-top': 'max(0px, calc(var(--step-indicator-offset) * -1))',
      'padding-bottom': 'var(--step-gap)',
    },
    '.step:last-child': {
      'padding-bottom': '0',
    },
    '.step:not(:last-child)::after': {
      'content': "''",
      'position': 'absolute',
      'left': 'calc((var(--step-indicator-size) / 2) - 0.5px)',
      'top': 'var(--step-connector-start)',
      'bottom': 'var(--step-connector-end)',
      'width': '1px',
      'background-color': ds.steps.connector,
    },
    '.step:last-child::after': {
      'content': "''",
      'position': 'absolute',
      'left': 'calc((var(--step-indicator-size) / 2) - 0.5px)',
      'top': 'var(--step-connector-start)',
      'bottom': 'var(--step-connector-end)',
      'width': '1px',
      'background-image': `linear-gradient(to bottom, ${ds.steps.connector} 0%, ${ds.steps.connector} 80%, transparent 100%)`,
    },
    '.step-indicator': {
      'width': 'var(--step-indicator-size)',
      'height': 'var(--step-indicator-size)',
      'border-radius': '999px',
      'display': 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      'background-color': ds.steps.indicator.bg,
      'color': ds.steps.indicator.text,
      'font-weight': ds.font.weight.semiBold,
      'font-size': ds.font.size.sm,
      'line-height': ds.font.height.sm,
      'flex-shrink': '0',
      'position': 'relative',
      'box-shadow': `0 0 0 1px ${ds.steps.indicator.outline}`,
      'margin-top': 'var(--step-indicator-offset)',
    },
    '.step-number': {
      'display': 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      'width': '100%',
      'height': '100%',
    },
    '.step-number::before': {
      'content': 'counter(step)',
    },
    '.step-indicator svg': {
      width: '60%',
      height: '60%',
    },
    '.step-content': {
      'display': 'flex',
      'flex-direction': 'column',
      'gap': ds.spacing['space0-5'],
      'min-width': '0',
    },
    '.step-body > *:first-child': {
      'margin-top': '0',
    },
    '.step-body > *:last-child': {
      'margin-bottom': '0',
    },
    '.step-title': {
      'margin': '0',
      'color': ds.steps.title.base.color,
      'font-weight': ds.steps.title.base.fontWeight,
    },
    '.steps[data-title-size="base"] .step-title': {
      'font-size': ds.steps.title.base.fontSize,
      'line-height': ds.steps.title.base.lineHeight,
      'letter-spacing': ds.steps.title.base.letterSpacing,
      'font-family': ds.steps.title.base.fontFamily,
      'font-weight': ds.steps.title.base.fontWeight,
      'color': ds.steps.title.base.color,
    },
    '.steps[data-title-size="base"]': {
      '--step-title-line-height': ds.steps.title.base.lineHeight,
      '--step-indicator-size': ds.spacing.space5,
      '--step-gap': ds.spacing.space4,
    },
    '.steps[data-title-size="h1"] .step-title': {
      'font-size': ds.steps.title.h1.fontSize,
      'line-height': ds.steps.title.h1.lineHeight,
      'letter-spacing': ds.steps.title.h1.letterSpacing,
      'font-family': ds.steps.title.h1.fontFamily,
      'font-weight': ds.steps.title.h1.fontWeight,
      'color': ds.steps.title.h1.color,
    },
    '.steps[data-title-size="h1"]': {
      '--step-title-line-height': ds.steps.title.h1.lineHeight,
      '--step-indicator-size': '1.75rem',
      '--step-gap': ds.spacing.space5,
    },
    '.steps[data-title-size="h1"] .step-indicator': {
      'font-size': ds.font.size.base,
      'line-height': ds.font.height.base,
    },
    '.steps[data-title-size="h2"] .step-title': {
      'font-size': ds.steps.title.h2.fontSize,
      'line-height': ds.steps.title.h2.lineHeight,
      'letter-spacing': ds.steps.title.h2.letterSpacing,
      'font-family': ds.steps.title.h2.fontFamily,
      'font-weight': ds.steps.title.h2.fontWeight,
      'color': ds.steps.title.h2.color,
    },
    '.steps[data-title-size="h2"]': {
      '--step-title-line-height': ds.steps.title.h2.lineHeight,
      '--step-indicator-size': '1.75rem',
      '--step-gap': ds.spacing.space5,
    },
    '.steps[data-title-size="h2"] .step-indicator': {
      'font-size': ds.font.size.base,
      'line-height': ds.font.height.base,
    },
    '.steps[data-title-size="h3"] .step-title': {
      'font-size': ds.steps.title.h3.fontSize,
      'line-height': ds.steps.title.h3.lineHeight,
      'letter-spacing': ds.steps.title.h3.letterSpacing,
      'font-family': ds.steps.title.h3.fontFamily,
      'font-weight': ds.steps.title.h3.fontWeight,
      'color': ds.steps.title.h3.color,
    },
    '.steps[data-title-size="h3"]': {
      '--step-title-line-height': ds.steps.title.h3.lineHeight,
      '--step-indicator-size': '1.75rem',
      '--step-gap': ds.spacing.space4,
    },
    '.steps[data-title-size="h4"] .step-title': {
      'font-size': ds.steps.title.h4.fontSize,
      'line-height': ds.steps.title.h4.lineHeight,
      'letter-spacing': ds.steps.title.h4.letterSpacing,
      'font-family': ds.steps.title.h4.fontFamily,
      'font-weight': ds.steps.title.h4.fontWeight,
      'color': ds.steps.title.h4.color,
    },
    '.steps[data-title-size="h4"]': {
      '--step-title-line-height': ds.steps.title.h4.lineHeight,
      '--step-indicator-size': ds.spacing.space5,
      '--step-gap': ds.spacing.space4,
    },
    '.steps[data-title-size="h5"] .step-title': {
      'font-size': ds.steps.title.h5.fontSize,
      'line-height': ds.steps.title.h5.lineHeight,
      'letter-spacing': ds.steps.title.h5.letterSpacing,
      'font-family': ds.steps.title.h5.fontFamily,
      'font-weight': ds.steps.title.h5.fontWeight,
      'color': ds.steps.title.h5.color,
    },
    '.steps[data-title-size="h5"]': {
      '--step-title-line-height': ds.steps.title.h5.lineHeight,
      '--step-indicator-size': ds.spacing.space5,
      '--step-gap': ds.spacing.space4,
    },
    '.steps[data-title-size="h6"] .step-title': {
      'font-size': ds.steps.title.h6.fontSize,
      'line-height': ds.steps.title.h6.lineHeight,
      'letter-spacing': ds.steps.title.h6.letterSpacing,
      'font-family': ds.steps.title.h6.fontFamily,
      'font-weight': ds.steps.title.h6.fontWeight,
      'color': ds.steps.title.h6.color,
    },
    '.steps[data-title-size="h6"]': {
      '--step-title-line-height': ds.steps.title.h6.lineHeight,
      '--step-indicator-size': ds.spacing.space5,
      '--step-gap': ds.spacing.space4,
    },
    '@media (max-width: 768px)': {
      '.cards': {
        'grid-template-columns': 'repeat(1, minmax(0, 1fr))',
      },
    },
    'ul': {
      'margin-top': gap.base,
      'margin-bottom': gap.cluster,
      'list-style-type': 'disc',
      'list-style-position': 'outside',
      'padding-left': ds.spacing.space6,

      'li': {
        'margin-bottom': ds.spacing.space1,
        'padding-left': ds.spacing.space1,
      },

      '> li::marker': {
        color: ds.color.text.xmuted,
      },
    },
    'ol': {
      'counter-reset': 'index',
      'margin-top': gap.base,
      'margin-bottom': gap.cluster,
      'padding-left': ds.spacing.space6,
      'margin-left': '0',

      '> li': {
        'counter-increment': 'index',
        'margin-bottom': ds.spacing['space0-5'],
        'position': 'relative',
      },

      '> li::before': {
        'content': 'counters(index, ".", decimal) "."',
        'position': 'absolute',
        'width': ds.spacing.space6,
        'left': `calc(${ds.spacing.space6} * -1)`,
        'text-align': 'center',
        'white-space': 'nowrap',
      },

      'li > ol': {
        'padding-left': ds.spacing.space6,
        '> li::before': {
          width: ds.spacing.space7,
          left: negative(ds.spacing.space7),
        },
      },

      'li > ol > li > ol': {
        'padding-left': ds.spacing.space8,
        '> li::before': {
          width: ds.spacing.space8,
          left: negative(ds.spacing.space8),
        },
      },
    },
    'hr': {
      'margin-top': gap.base,
      'margin-bottom': gap.cluster,
      'border': '0',
      'border-top': '1px solid',
      'border-color': color.border.base,
    },
    'hr:has(+ :is(h1, h2, h3, h4, h5, h6))': {
      'margin-top': gap.heading,
    },
    'h1': headingStyle(ds.h1),
    'h2': headingStyle(ds.h2),
    'h3': headingStyle(ds.h3),
    'h4': headingStyle(ds.h4),
    'h5': headingStyle(ds.h5),
    'h6': headingStyle(ds.h6),
    '.subtitle': {
      'margin-top': gap.base,
      'margin-bottom': gap.base,
      'font-size': ds.font.size.base,
      'line-height': ds.font.height.base,
      'font-weight': ds.subtitle.font.weight,
      'color': ds.subtitle.color.text,
    },
    ':is(h1, h2, h3, h4, h5, h6):has(+ .subtitle)': {
      'margin-bottom': gap.cluster,
    },
    ':is(h1, h2, h3, h4, h5, h6) + .subtitle': {
      'margin-top': '0',
      'margin-bottom': gap.cluster,
    },
    'h1 + .subtitle': {
      'font-size': ds.subtitle.font.size,
      'line-height': ds.subtitle.font.height,
    },
    ':is(p, td, li) a': {
      'color': ds.link.text.color,
      'text-decoration-line': ds.link.text.decorationLine,
      'text-decoration-color': ds.link.text.decorationColor,
      'text-decoration-style': ds.link.text.decorationStyle,
      'font-weight': ds.link.fontWeight,
      'text-underline-offset': '0.25rem',
      'transition': 'color 0.15s ease, text-decoration-color 0.15s ease',

      '&:hover': {
        'color': color.text.accent,
        'text-decoration-color': transparent(ds.color.text.accent, 70),
      },

      '&:focus-visible': {
        'border-radius': ds.border.radius,
      },

      '&:active': {
        color: color.text.accent,
      },
    },
    'img': {
      'display': 'inline-block',
      'border-radius': ds.border.radius,
    },

    'table': {
      'margin-top': gap.base,
      'margin-bottom': gap.cluster,
      'border-collapse': 'collapse',
      'overflow': 'hidden',

      'td, th': {
        'border-bottom': `1px solid ${ds.color.border.base}`,
        'min-width': ds.spacing.space4,
        'padding-top': ds.spacing.space3,
        'padding-bottom': ds.spacing.space3,
        'padding-left': ds.spacing.space2,
        'padding-right': ds.spacing.space2,
        'font-size': ds.table.font.size,
        'line-height': ds.table.font.height,

        '> *': {
          'margin-bottom': '0',
        },
      },

      'td': {
        'font-weight': ds.table.font.weight,
      },

      'th': {
        'color': ds.table.th.color.text,
        'font-size': ds.table.th.font.size,
        'line-height': ds.table.th.font.height,
        'font-weight': ds.table.th.font.weight,
      },

      'p': {
        margin: '0',
      },
    },

    'table h1, table h2, table h3, table h4, table h5, table h6': {
      margin: '0',
    },

    '.frame': {
      'display': 'flex',
      'flex-direction': 'column',
      'margin-top': gap.base,
      'margin-bottom': gap.cluster,
      'gap': ds.spacing.space1,
      '&:first-child > *': {
        'margin-bottom': '0',
      },
      '&[data-align="left"]': {
        'align-items': 'flex-start',
      },
      '&[data-align="center"]': {
        'align-items': 'center',
        'text-align': 'center',
      },
      '&[data-align="right"]': {
        'align-items': 'flex-end',
      },
      '&[data-align="stretch"]': {
        'align-items': 'stretch',
        'overflow-x': 'scroll',
      },
      '&[data-align="stretch"] .caption': {
        'text-align': 'center',
      },
      '.caption': {
        'color': ds.frame.caption.color.text,
        'font-size': ds.frame.caption.font.size,
        'line-height': ds.frame.caption.font.height,
        'font-weight': ds.frame.caption.font.weight,
        'font-style': 'italic',
      },

      'table': {
        width: 'auto',
      },
    },
    '.scroll-area-root': {
      position: 'relative',
      overflow: 'hidden',
    },
    '.scroll-area-viewport': {
      width: '100%',
      height: '100%',
    },
    '.scroll-area-scrollbar': {
      'display': 'flex',
      'background-color': color.bg.surface1,
      'touch-action': 'none',
      'user-select': 'none',
      'border-radius': ds.spacing['space1-5'],
      '&[data-orientation="horizontal"]': {
        margin: '2px 0',
        padding: '0 2px',
        height: ds.spacing['space1-5'],
      },
    },
    '.scroll-area-thumb': {
      'background': color.bg.surface2,
      'border-radius': ds.spacing['space1-5'],
      'position': 'relative',
    },
    // Select trigger styles (inline, inside .prose-ui)
    ...selectTriggerStyles(ds),
  }
}

export const shikiCssVariables = (ds: DesignSystem) => ({
  '--shiki-foreground': ds.codeBlock.color.text,
  '--shiki-background': ds.codeBlock.color.bg,
  '--shiki-token-constant': ds.codeBlock.color.constant,
  '--shiki-token-string': ds.codeBlock.color.string,
  '--shiki-token-comment': ds.codeBlock.color.comment,
  '--shiki-token-keyword': ds.codeBlock.color.keyword,
  '--shiki-token-parameter': ds.codeBlock.color.parameter,
  '--shiki-token-function': ds.codeBlock.color.function,
  '--shiki-token-string-expression': ds.codeBlock.color.stringExpression,
  '--shiki-token-punctuation': ds.codeBlock.color.punctuation,
  '--shiki-token-link': ds.codeBlock.color.link,
})

const darkColorSpec = getDarkColorsSpec()
const lightColorSpec: ColorSpec = getLightColorsSpec()
const coreSpec: CoreSpec = getCoreSpec()
const colors = cssSystem(lightColorSpec, '--p')
const core = cssSystem(coreSpec, '--p')

const base: Base = { ...core, ...colors }

const componentsSpec = getComponentsSpec(base)
const components: Components = cssSystem(componentsSpec, '--p')
const ds: DesignSystem = { ...base, ...components }

const styles = componentsStyles(ds)

// Modal styles need to be unscoped since the modal is rendered outside .prose-ui container
const modalStyles = {
  '[data-rmiz-ghost]': {
    'position': 'absolute',
    'pointer-events': 'none',
  },
  '[data-rmiz-btn-zoom], [data-rmiz-btn-unzoom]': {
    'display': 'none',
  },
  '[data-rmiz-content="found"] img, [data-rmiz-content="found"] svg, [data-rmiz-content="found"] [role="img"], [data-rmiz-content="found"] [data-zoom]': {
    'cursor': 'zoom-in',
  },
  '[data-rmiz-modal]': {
    'border': '0',
    'outline': 'none',
    'box-shadow': 'none',
  },
  '[data-rmiz-modal]::backdrop': {
    'display': 'none',
  },
  '[data-rmiz-modal][open]': {
    'position': 'fixed',
    'width': '100vw',
    'height': '100vh',
    'max-width': 'none',
    'max-height': 'none',
    'margin': '0',
    'padding': '0',
    'border': '0',
    'outline': 'none',
    'background': 'transparent',
    'overflow': 'hidden',
    'pointer-events': 'all',
    '@supports (width: 100dvw)': {
      'width': '100dvw',
      'height': '100dvh',
    },
  },
  '[data-rmiz-modal]:focus': {
    'outline': 'none',
  },
  '[data-rmiz-modal]:focus-visible': {
    'outline': 'none',
  },
  '[data-rmiz-modal-overlay]': {
    'position': 'absolute',
    'inset': '0',
    'transition': 'background-color 0.3s',
  },
  '[data-rmiz-modal-overlay="hidden"]': {
    'background-color': 'rgba(255, 255, 255, 0)',
  },
  '[data-rmiz-modal-overlay="visible"]': {
    'background-color': ds.color.bg.base,
  },
  '[data-rmiz-modal-content]': {
    'position': 'relative',
    'width': '100%',
    'height': '100%',
    'outline': 'none',
    'border': '0',
  },
  '[data-rmiz-modal-img]': {
    'position': 'absolute',
    'cursor': 'zoom-out',
    'image-rendering': 'high-quality',
    'transform-origin': 'top left',
    'transition': 'transform 0.3s',
    'outline': 'none',
    'border': '0',
  },
  '@media (prefers-reduced-motion: reduce)': {
    '[data-rmiz-modal-overlay], [data-rmiz-modal-img]': {
      'transition-duration': '0.01ms !important',
    },
  },
}

const shikiCssVars = shikiCssVariables(ds)
const lightCssVars = cssVariables(lightColorSpec, '--p')
const darkCssVars = cssVariables(darkColorSpec, '--p')
const cssVars = cssVariables({ ...coreSpec, ...componentsSpec }, '--p')
export const allStyles = [
  { '.prose-ui': shikiCssVars },
  { ':root': lightCssVars }, // Default light theme
  { '@media (prefers-color-scheme: dark)': { ':root': darkCssVars } }, // System dark theme
  { ':is(.dark)': darkCssVars }, // Explicit dark (overrides system)
  { ':is(.light)': lightCssVars }, // Explicit light (overrides system)
  { ':root': cssVars },

  {
    '.prose-ui': {
      'background-color': ds.body.color.bg,
      'font-family': ds.body.font.family,
      'font-size': ds.body.font.size,
      'line-height': ds.body.font.height,
      'color': ds.body.color.text,
      'letter-spacing': ds.letterSpacing.base,
    },
  },
  { '.prose-ui': styles },
  modalStyles, // Unscoped styles for modal elements rendered outside .prose-ui
  selectPortalStyles(ds), // Unscoped styles for select dropdown rendered via portal
]
