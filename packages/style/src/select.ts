import type { DesignSystem } from './ds/index.js'

/**
 * Select trigger styles - renders inline, inside .prose-ui container
 */
export const selectTriggerStyles = (ds: DesignSystem) => ({
  '.select-trigger': {
    'display': 'inline-flex',
    'align-items': 'center',
    'justify-content': 'space-between',
    'gap': ds.spacing.space1,
    'border-radius': ds.border.radius,
    'font-weight': ds.font.weight.medium,
    'background-color': 'transparent',
    'padding-left': ds.spacing.space2,
    'padding-right': ds.spacing.space2,
    'padding-top': ds.spacing.space1,
    'padding-bottom': ds.spacing.space1,
    'font-size': ds.font.size.sm,
    'line-height': ds.font.height.sm,
    'color': ds.color.text.lowest,
    'cursor': 'pointer',
    'outline': 'none',
    'transition': 'border-color 150ms ease, color 150ms ease',
    'white-space': 'nowrap',
    '&:hover': {
      'border-color': ds.color.accent.low,
      'color': ds.color.text.base,
    },
    '&:focus-visible': {
      'border-color': ds.color.accent.base,
    },
    '&[data-placeholder]': {
      'color': ds.color.text.lowest,
    },
    '&:disabled': {
      'cursor': 'not-allowed',
      'opacity': '0.5',
    },
    '&[data-size="sm"]': {
      'padding-top': ds.spacing['space0-5'],
      'padding-bottom': ds.spacing['space0-5'],
    },
  },
  '.select-icon': {
    'width': '14px',
    'height': '14px',
    'opacity': '0.5',
    'flex-shrink': '0',
  },
})

/**
 * Select portal styles - rendered outside .prose-ui container via portal
 * These are unscoped and use prose-ui- prefix to avoid conflicts
 */
export const selectPortalStyles = (ds: DesignSystem) => ({
  // Slide animations based on which side the dropdown appears
  // Opacity reaches 1 at 40% for a snappier fade-in
  '@keyframes prose-ui-select-in-from-top': {
    '0%': { 'opacity': '0', 'transform': 'scale(0.95) translateY(-8px)' },
    '40%': { 'opacity': '1' },
    '100%': { 'opacity': '1', 'transform': 'scale(1) translateY(0)' },
  },
  '@keyframes prose-ui-select-in-from-bottom': {
    '0%': { 'opacity': '0', 'transform': 'scale(0.95) translateY(8px)' },
    '40%': { 'opacity': '1' },
    '100%': { 'opacity': '1', 'transform': 'scale(1) translateY(0)' },
  },
  '@keyframes prose-ui-select-in-from-left': {
    '0%': { 'opacity': '0', 'transform': 'scale(0.95) translateX(-8px)' },
    '40%': { 'opacity': '1' },
    '100%': { 'opacity': '1', 'transform': 'scale(1) translateX(0)' },
  },
  '@keyframes prose-ui-select-in-from-right': {
    '0%': { 'opacity': '0', 'transform': 'scale(0.95) translateX(8px)' },
    '40%': { 'opacity': '1' },
    '100%': { 'opacity': '1', 'transform': 'scale(1) translateX(0)' },
  },
  '@keyframes prose-ui-select-out': {
    'from': { 'opacity': '1', 'transform': 'scale(1)' },
    'to': { 'opacity': '0', 'transform': 'scale(0.95)' },
  },
  '.prose-ui-select-content': {
    'position': 'relative',
    'z-index': '50',
    'min-width': '8rem',
    'max-height': 'var(--radix-select-content-available-height)',
    'overflow-y': 'auto',
    'overflow-x': 'hidden',
    'background-color': ds.color.bg.low,
    'border': `1px solid ${ds.color.border}`,
    'border-radius': ds.border.radius,
    'box-shadow': '0 4px 12px rgba(0, 0, 0, 0.15)',
    'font-family': ds.font.family.base,
    'animation-duration': '150ms',
    'animation-timing-function': 'ease-out',
    'transform-origin': 'var(--radix-select-content-transform-origin)',
    '&[data-state="closed"]': {
      'animation-name': 'prose-ui-select-out',
    },
    // Directional slide-in animations based on which side dropdown appears
    '&[data-state="open"][data-side="bottom"]': {
      'animation-name': 'prose-ui-select-in-from-top',
    },
    '&[data-state="open"][data-side="top"]': {
      'animation-name': 'prose-ui-select-in-from-bottom',
    },
    '&[data-state="open"][data-side="left"]': {
      'animation-name': 'prose-ui-select-in-from-right',
    },
    '&[data-state="open"][data-side="right"]': {
      'animation-name': 'prose-ui-select-in-from-left',
    },
    '&[data-position="popper"]': {
      '&[data-side="bottom"]': { 'translate': '0 4px' },
      '&[data-side="top"]': { 'translate': '0 -4px' },
      '&[data-side="left"]': { 'translate': '-4px 0' },
      '&[data-side="right"]': { 'translate': '4px 0' },
    },
  },
  '.prose-ui-select-viewport': {
    'padding': ds.spacing.space1,
  },
  '.prose-ui-select-item': {
    'position': 'relative',
    'display': 'flex',
    'width': '100%',
    'align-items': 'center',
    'gap': ds.spacing.space2,
    'padding-top': ds.spacing.space1,
    'padding-bottom': ds.spacing.space1,
    'padding-left': ds.spacing.space2,
    'padding-right': ds.spacing.space5,
    'font-size': ds.font.size.sm,
    'line-height': ds.font.height.sm,
    'color': ds.color.text.base,
    'border-radius': ds.border.radius,
    'cursor': 'default',
    'outline': 'none',
    'user-select': 'none',
    '&[data-highlighted]': {
      'background-color': ds.color.bg.lower,
      'color': ds.color.text.high,
    },
    '&[data-disabled]': {
      'pointer-events': 'none',
      'opacity': '0.5',
    },
  },
  '.prose-ui-select-item-indicator': {
    'position': 'absolute',
    'right': ds.spacing.space2,
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'width': '14px',
    'height': '14px',
  },
  '.prose-ui-select-check-icon': {
    'width': '14px',
    'height': '14px',
  },
  '.prose-ui-select-label': {
    'padding-left': ds.spacing.space2,
    'padding-right': ds.spacing.space2,
    'padding-top': ds.spacing.space1,
    'padding-bottom': ds.spacing.space1,
    'font-size': ds.font.size.sm,
    'font-weight': ds.font.weight.medium,
    'color': ds.color.text.lowest,
  },
  '.prose-ui-select-separator': {
    'height': '1px',
    'margin-top': ds.spacing.space1,
    'margin-bottom': ds.spacing.space1,
    'margin-left': `calc(-1 * ${ds.spacing.space1})`,
    'margin-right': `calc(-1 * ${ds.spacing.space1})`,
    'background-color': ds.color.border,
    'pointer-events': 'none',
  },
  '.prose-ui-select-scroll-button': {
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'padding-top': ds.spacing.space1,
    'padding-bottom': ds.spacing.space1,
    'cursor': 'default',
  },
  '.prose-ui-select-scroll-icon': {
    'width': '14px',
    'height': '14px',
    'color': ds.color.text.low,
  },
  '@media (prefers-reduced-motion: reduce)': {
    '.prose-ui-select-content': {
      'animation-duration': '0ms',
    },
  },
})

