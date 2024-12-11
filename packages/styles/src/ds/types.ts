import type { CssValue, DesignSpec } from './ds'

export type Base = Core & Colors
export type DesignSystem = Base & Components

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
      high: CssValue
      base: CssValue
      low: CssValue
      lower: CssValue
      lowest: CssValue
      disabled: CssValue
    }
    accent: {
      high: CssValue
      base: CssValue
      low: CssValue
    }
    syntax: {
      syntax1: CssValue
      syntax2: CssValue
      syntax3: CssValue
      syntax4: CssValue
    }
    note: CssValue
    info: CssValue
    warning: CssValue
    success: CssValue
    danger: CssValue
    bg: {
      high: CssValue
      base: CssValue
      low: CssValue
      lower: CssValue
      lowest: CssValue
    }
    border: CssValue
    outline: CssValue
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
      decoration: CssValue
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
    font: {
      size: CssValue
      weight: CssValue
      height: CssValue
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
