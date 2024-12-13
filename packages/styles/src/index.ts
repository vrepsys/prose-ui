import type {
  Base,
  ColorSpec,
  Components,
  ComponentsSpec,
  CoreSpec,
  CssVar,
  DesignSystem,
  TextStyle,
} from './ds'
import { cssSystem, cssVariables, MEDIA_ABOVE_LARGE } from './ds'
import {
  slateDark,
  blueDark,
  greenDark,
  amberDark,
  redDark,
  slate,
  blue,
  green,
  amber,
  red,
} from '@radix-ui/colors'

import { hexToHsl } from './utils/hex-to-hsl'

const hsl = (color: string) => {
  return color.startsWith('#') ? hexToHsl(color) : color
}

const negative = (value: string) => `calc(${value} * -1)`

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
      high: '0 0% 0%',
      base: hsl(slate.slate12),
      low: hsl(slate.slate11),
      lower: hsl(slate.slate10),
      lowest: hsl(slate.slate9),
      disabled: hsl(slate.slate8),
    },
    accent: {
      high: hsl(green.green11),
      base: hsl(green.green10),
      low: hsl(green.green8),
    },
    syntax: {
      syntax1: '210 80% 40%',
      syntax2: '156 60% 35%',
      syntax3: '212 50% 40%',
      syntax4: '256 39% 50%',
    },
    note: hsl(slate.slate12),
    info: hsl(blue.blue11),
    warning: hsl(amber.amber11),
    success: hsl(green.green11),
    danger: hsl(red.red10),
    bg: {
      high: '0 0% 100%',
      base: hsl(slate.slate1),
      low: hsl(slate.slate3),
      lower: hsl(slate.slate5),
      lowest: hsl(slate.slate7),
    },
    border: hsl(slate.slate4),
    outline: hsl(green.green10),
  },
})

export const getDarkColorsSpec = (): ColorSpec => ({
  color: {
    text: {
      high: '0 0% 100%',
      base: hsl(slateDark.slate12),
      low: hsl(slateDark.slate11),
      lower: hsl(slateDark.slate10),
      lowest: hsl(slateDark.slate9),
      disabled: hsl(slateDark.slate8),
    },
    accent: {
      high: hsl(greenDark.green11),
      base: hsl(greenDark.green10),
      low: hsl(greenDark.green8),
    },
    syntax: {
      syntax1: '210 80% 66%',
      syntax2: '156 60% 75%',
      syntax3: '212 50% 70%',
      syntax4: '256 40% 70%',
    },
    note: hsl(slateDark.slate12),
    info: hsl(blueDark.blue11),
    warning: hsl(amberDark.amber11),
    success: hsl(greenDark.green11),
    danger: hsl(redDark.red10),
    bg: {
      high: '0 0% 0%',
      base: '0 0% 0%',
      low: hsl(slateDark.slate2),
      lower: hsl(slateDark.slate3),
      lowest: hsl(slateDark.slate4),
    },
    border: hsl(slateDark.slate4),
    outline: hsl(greenDark.green10),
  },
})

export const getComponentsSpec = (ds: Base): ComponentsSpec => {
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
      fontFamily: ds.font.family.heading,
      fontSize: '1.875rem',
      fontWeight: ds.font.weight.semiBold,
      lineHeight: '2.25rem',
      letterSpacing: '-0.065rem',
      color: ds.color.text.high,
      [MEDIA_ABOVE_LARGE]: {
        fontSize: '2.125rem',
        lineHeight: '2.75rem',
        letterSpacing: '-0.085rem',
      },
    },
    h2: {
      fontFamily: ds.font.family.heading,
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
      letterSpacing: '-0.035rem',
      fontWeight: ds.font.weight.semiBold,
      color: ds.color.text.high,
      [MEDIA_ABOVE_LARGE]: {
        fontSize: '1.375rem',
        lineHeight: '2rem',
      },
    },
    h3: {
      fontFamily: ds.font.family.heading,
      fontSize: '1.09375rem',
      lineHeight: '1.5rem',
      letterSpacing: '-0.035rem',
      fontWeight: ds.font.weight.semiBold,
      color: ds.color.text.high,
      [MEDIA_ABOVE_LARGE]: {
        fontSize: '1.125rem',
        lineHeight: '1.75',
      },
    },
    h4: {
      fontFamily: ds.font.family.heading,
      fontSize: '0.9375rem',
      lineHeight: '1.5rem',
      letterSpacing: '-0.015rem',
      fontWeight: ds.font.weight.semiBold,
      color: ds.color.text.high,
      [MEDIA_ABOVE_LARGE]: {
        fontSize: '1rem',
        lineHeight: '1.75rem',
      },
    },
    h5: {
      fontFamily: ds.font.family.heading,
      fontSize: '0.90625rem',
      lineHeight: '1.25rem',
      letterSpacing: '-0.015rem',
      fontWeight: ds.font.weight.semiBold,
      color: ds.color.text.high,
    },
    h6: {
      fontFamily: ds.font.family.heading,
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      letterSpacing: '-0.015rem',
      fontWeight: '500',
      color: ds.color.text.high,
    },
    link: {
      text: {
        color: ds.color.accent.base,
        decoration: `underline solid ${ds.color.accent.low}`,
      },
      fontWeight: ds.font.weight.normal,
    },
    inlineCode: {
      font: {
        size: ds.font.size.sm,
        weight: ds.font.weight.normal,
        height: ds.font.height.sm,
        spacing: ds.letterSpacing.sm,
      },
      color: {
        bg: ds.color.bg.low,
      },
      letterSpacing: ds.letterSpacing.sm,
    },
    callout: {
      color: {
        text: ds.color.text.base,
      },
      font: {
        size: ds.font.size.sm,
        weight: ds.font.weight.medium,
        height: ds.font.height.sm,
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
        bg: ds.color.bg.low,
        text: ds.color.text.base,
        constant: ds.color.syntax.syntax1,
        string: ds.color.syntax.syntax2,
        comment: ds.color.text.low,
        keyword: ds.color.syntax.syntax3,
        parameter: ds.color.text.base,
        function: ds.color.syntax.syntax4,
        stringExpression: ds.color.syntax.syntax2,
        punctuation: ds.color.text.base,
        link: ds.color.syntax.syntax2,
      },
      font: {
        size: ds.font.size.sm,
        weight: ds.font.weight.normal,
        height: ds.font.height.sm,
        spacing: ds.letterSpacing.sm,
      },
      lineNumber: {
        color: {
          text: ds.color.text.lower,
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
          text: ds.color.text.low,
        },
      },
      border: {
        color: ds.color.border,
      },
    },
    frame: {
      caption: {
        color: {
          text: ds.color.text.low,
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
    'p': {
      'margin-top': gap.base,
      'margin-bottom': gap.cluster,
      '& + .code-block, & + ul, & + ol': {
        'margin-top': gap.cluster,
      },
    },
    '.code-block + .code-block, .callout + .callout': {
      'margin-top': gap.cluster,
    },
    'code': {
      'font-family': ds.font.family.mono,
    },
    'li': {
      '& > .code-block, & > table, & > .frame, & > .callout, & > ul, & > ol': {
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
    'h1, h2, h3, h4, h5, h6': {
      '& + table, & + .callout, & + p, & + ul, & + ol': {
        'margin-top': gap.cluster,
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
    '.code-block': {
      'margin-top': gap.base,
      'margin-bottom': gap.cluster,
      'border-width': '1px',
      'border-color': ds.color.border,
      'border-radius': ds.border.radius,
      'background-color': ds.codeBlock.color.bg,
      'display': 'flex',
      'flex-direction': 'column',

      '.header': {
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        'border-bottom': `1px solid ${ds.color.border}`,
        'padding-top': ds.spacing['space1-5'],
        'padding-bottom': ds.spacing['space1-5'],
        'padding-left': ds.spacing.space3,
        'padding-right': ds.spacing['space1-5'],
        'border-color': ds.color.border,
        '.title': {
          'color': ds.color.text.low,
          'font-size': ds.font.size.sm,
          'line-height': ds.font.height.sm,
          'letter-spacing': ds.letterSpacing.sm,
        },
      },
      '.copy-button': {
        'position': 'relative',
        'background-color': ds.codeBlock.color.bg,
        'border-radius': ds.border.radius,
        'padding': ds.spacing.space1,
        'color': ds.color.text.lowest,
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
        'color': ds.color.text.lower,
        'background-color': ds.color.bg.lower,
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
        'color': ds.color.success,
      },
      '.body': {
        'position': 'relative',
        'display': 'flex',
        'font-family': ds.font.family.mono,
        'font-size': ds.codeBlock.font.size,
        'line-height': ds.codeBlock.font.height,
        'font-weight': ds.codeBlock.font.weight,
        'letter-spacing': ds.codeBlock.font.spacing,
        'word-break': 'keep-all',
        'font-variant-ligatures': 'none',
        '.copy-button': {
          'visibility': 'hidden',
          'transition': 'opacity 100ms ease',
          'border-width': '1px',
          'border-color': ds.color.border,
          'opacity': 0,
          'position': 'absolute',
          'right': ds.spacing.space2,
          'top': ds.spacing.space2,
        },
        '.copied-icon': {
          'border-width': '1px',
          'border-color': ds.color.border,
          'position': 'absolute',
          'right': ds.spacing.space2,
          'top': ds.spacing.space2,
        },
        '&:hover .copy-button': {
          opacity: 1,
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
        'padding-right': ds.spacing.space3,
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
      'border-color': color.note,
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
      'border-left-width': ds.spacing.space1,
      'padding-left': ds.spacing.space2,
      'padding-right': ds.spacing.space2,
      'padding-top': ds.spacing.space1,
      'padding-bottom': ds.spacing.space1,
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
    '.callout.note': {
      'border-color': color.note,
      '.title': {
        color: color.note,
      },
    },
    '.callout.info': {
      'border-color': color.info,
      '.title': {
        color: color.info,
      },
    },
    '.callout.tip': {
      'border-color': color.success,
      '.title': {
        color: color.success,
      },
    },
    '.callout.warning': {
      'border-color': color.warning,
      '.title': {
        color: color.warning,
      },
    },
    '.callout.danger': {
      'border-color': color.danger,
      '.title': {
        color: color.danger,
      },
    },
    'ul': {
      'margin-top': gap.base,
      'margin-bottom': gap.cluster,
      'list-style-type': 'disc',
      'list-style-position': 'outside',
      'padding-left': ds.spacing.space6,

      'li': {
        'margin-bottom': ds.spacing['space0-5'],
        'padding-left': ds.spacing.space1,
      },

      '> li::marker': {
        color: ds.color.text.lowest,
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
      'border-color': color.border,
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
    'p a, td a, li a': {
      'color': ds.link.text.color,
      'text-decoration': ds.link.text.decoration,
      'font-weight': ds.link.fontWeight,
      'text-underline-offset': '0.25rem',
      'transition': 'color 0.1s ease, text-decoration-color 0.1s ease',

      '&:hover': {
        'color': color.accent.high,
        'text-decoration-color': color.accent.high,
      },

      '&:active': {
        color: color.accent.high,
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
        'border-bottom': `1px solid ${ds.color.border}`,
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
      'background-color': color.bg.low,
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
      'background': color.bg.lowest,
      'border-radius': ds.spacing['space1-5'],
      'position': 'relative',
    },
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
const colors = cssSystem(lightColorSpec, '--p', (value: CssVar) => `hsl(${value})`)
const core = cssSystem(coreSpec, '--p')

const base: Base = { ...core, ...colors }

const componentsSpec = getComponentsSpec(base)
const components: Components = cssSystem(componentsSpec, '--p')
const ds: DesignSystem = { ...base, ...components }

const styles = componentsStyles(ds)

const shikiCssVars = shikiCssVariables(ds)
const lightCssVars = cssVariables(lightColorSpec, '--p')
const darkCssVars = cssVariables(darkColorSpec, '--p')
const cssVars = cssVariables({ ...coreSpec, ...componentsSpec }, '--p')
export const allStyles = [
  { '.prose-ui': shikiCssVars },
  { ':root': lightCssVars },
  { ':is(.dark)': darkCssVars },
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
]
