import type { CssValue, DesignSpec } from './ds.js'

export type Base = Core & Colors
export type DesignSystem = Base & Components

export type ColorScale = {
  50: CssValue
  100: CssValue
  200: CssValue
  300: CssValue
  400: CssValue
  500: CssValue
  600: CssValue
  700: CssValue
  800: CssValue
  900: CssValue
  950: CssValue
}

export type Palette = {
  slate: ColorScale
  gray: ColorScale
  zinc: ColorScale
  neutral: ColorScale
  stone: ColorScale
  red: ColorScale
  orange: ColorScale
  amber: ColorScale
  yellow: ColorScale
  lime: ColorScale
  green: ColorScale
  emerald: ColorScale
  teal: ColorScale
  cyan: ColorScale
  sky: ColorScale
  blue: ColorScale
  indigo: ColorScale
  violet: ColorScale
  purple: ColorScale
  fuchsia: ColorScale
  pink: ColorScale
  rose: ColorScale
}

export type Core = {
  spacing: {
    'none': CssValue
    'px': CssValue
    'space0-5': CssValue
    'space1': CssValue
    'space1-5': CssValue
    'space2': CssValue
    'space3': CssValue
    'space4': CssValue
    'space5': CssValue
    'space6': CssValue
    'space7': CssValue
    'space8': CssValue
    'space9': CssValue
  }
  font: {
    family: {
      base: CssValue
      heading: CssValue
      mono: CssValue
    }
    size: {
      base: CssValue
      sm: CssValue
    }
    weight: {
      normal: CssValue
      medium: CssValue
      semiBold: CssValue
      bold: CssValue
    }
    height: {
      base: CssValue
      sm: CssValue
    }
  }
  letterSpacing: {
    base: CssValue
    sm: CssValue
  }
  content: {
    gap: {
      base: CssValue
      heading: CssValue
      cluster: CssValue
    }
  }
  border: {
    radius: CssValue
  }
}

export type Colors = {
  color: {
    text: {
      strong: CssValue
      base: CssValue
      muted: CssValue
      xmuted: CssValue
      disabled: CssValue
      accent: CssValue
      note: CssValue
      info: CssValue
      warning: CssValue
      success: CssValue
      danger: CssValue
      syntax1: CssValue
      syntax2: CssValue
      syntax3: CssValue
      syntax4: CssValue
    },
    bg: {
      base: CssValue
      surface1: CssValue
      surface1Hover: CssValue
      surface2: CssValue
      surface2Hover: CssValue
      surface2Active: CssValue
      accent: CssValue
      note: CssValue
      info: CssValue
      warning: CssValue
      success: CssValue
      danger: CssValue
    }
    border: {
      base: CssValue
      subtle: CssValue
      outline: CssValue
    }
  }
}

export type Components = {
  body: {
    color: {
      bg: CssValue
      text: CssValue
    }
    font: {
      family: CssValue
      size: CssValue
      height: CssValue
    }
  }
  h1: TextStyle
  h2: TextStyle
  h3: TextStyle
  h4: TextStyle
  h5: TextStyle
  h6: TextStyle
  link: {
    fontWeight: CssValue
    text: {
      color: CssValue
      decorationLine: CssValue
      decorationColor: CssValue
      decorationStyle: CssValue
    }
  }
  inlineCode: {
    font: {
      size: CssValue
      height: CssValue
      weight: CssValue
      spacing: CssValue
    }
    color: {
      bg: CssValue
    }
    letterSpacing: CssValue
  }
  callout: {
    color: {
      text: CssValue
    }
    note: {
      color: {
        text: CssValue
        bg: CssValue
      }
    }
    info: {
      color: {
        text: CssValue
        bg: CssValue
      }
    }
    warning: {
      color: {
        text: CssValue
        bg: CssValue
      }
    }
    success: {
      color: {
        text: CssValue
        bg: CssValue
      }
    }
    danger: {
      color: {
        text: CssValue
        bg: CssValue
      }
    }
    font: {
      size: CssValue
      weight: CssValue
      height: CssValue
    }
  }
  card: {
    color: {
      text: CssValue
      muted: CssValue
      bg: CssValue
      bgHover: CssValue
      border: CssValue
      borderHover: CssValue
      icon: CssValue
      cta: CssValue
      ctaHover: CssValue
    }
    font: {
      title: {
        size: CssValue
        height: CssValue
        weight: CssValue
      }
      body: {
        size: CssValue
        height: CssValue
        weight: CssValue
      }
      cta: {
        size: CssValue
        height: CssValue
        weight: CssValue
      }
    }
  }
  subtitle: {
    color: {
      text: CssValue
    }
    font: {
      size: CssValue
      height: CssValue
      weight: CssValue
    }
  }
  steps: {
    indicator: {
      bg: CssValue
      text: CssValue
      outline: CssValue
    }
    connector: CssValue
    title: {
      base: TextStyle
      h1: TextStyle
      h2: TextStyle
      h3: TextStyle
      h4: TextStyle
      h5: TextStyle
      h6: TextStyle
    }
    body: {
      color: CssValue
      size: CssValue
      height: CssValue
      weight: CssValue
    }
  }
  blockquote: {
    color: {
      text: CssValue
    }
    font: {
      size: CssValue
      weight: CssValue
      height: CssValue
      style: CssValue
    }
  }
  codeBlock: {
    color: {
      text: CssValue
      bg: CssValue
      constant: CssValue
      string: CssValue
      comment: CssValue
      keyword: CssValue
      parameter: CssValue
      function: CssValue
      stringExpression: CssValue
      punctuation: CssValue
      link: CssValue
    }
    font: {
      size: CssValue
      height: CssValue
      weight: CssValue
      spacing: CssValue
    }
    lineNumber: {
      color: {
        text: CssValue
      }
    }
  }
  table: {
    border: {
      color: CssValue
    }
    font: {
      size: CssValue
      height: CssValue
      weight: CssValue
    }
    th: {
      font: {
        size: CssValue
        height: CssValue
        weight: CssValue
      }
      color: {
        text: CssValue
      }
    }
  }
  frame: {
    caption: {
      color: {
        text: CssValue
      }
      font: {
        size: CssValue
        height: CssValue
        weight: CssValue
        style: CssValue
      }
    }
  }
}

export type TextStyle = {
  fontFamily: CssValue
  fontSize: CssValue
  fontWeight: CssValue
  lineHeight: CssValue
  letterSpacing: CssValue
  color: CssValue
}

export type CoreSpec = DesignSpec<Core>
export type ColorSpec = DesignSpec<Colors>
export type ComponentsSpec = DesignSpec<Components>
