# @prose-ui/style

CSS styles and design tokens for Prose UI. Provides typography, component styles, and dark mode support for Markdown and MDX content.

## Installation

```bash
npm install @prose-ui/style
```

## Usage

Import the styles in your global stylesheet:

```css
@import '@prose-ui/style/prose-ui.css';
```

For math formulas, also import KaTeX styles:

```css
@import '@prose-ui/style/katex.css';
```

Then wrap your content with the `prose-ui` class:

```tsx
<div className="prose-ui">
  {/* Your rendered Markdown content */}
</div>
```

### Dark mode

Prose UI uses the `dark` class on the `<html>` element to switch to dark mode, compatible with most theme toggles.

### Customization

Override CSS variables to customize the design:

```css
:root {
  --p-font-family: var(--font-geist-sans);
  --p-font-family-mono: var(--font-geist-mono);
  --p-color-text-accent: oklch(0.54 0.22 143.88);
}
```

See the [styling documentation](https://prose-ui.com/docs/styling) for all available variables.

## About Prose UI

[Prose UI](https://prose-ui.com) is an open-source library of React components and customizable CSS styles for rendering Markdown and MDX content. It provides polished typography and components for documentation sites, blogs, and content-focused applications.

- [Documentation](https://prose-ui.com/docs)
- [GitHub](https://github.com/vrepsys/prose-ui)

## Dhub

Looking for a visual editing experience? [Dhub](https://dhub.dev) is a git-based CMS for technical documentation with Notion-like Markdown editing. It commits directly to GitHub—no lock-in.

## License

MIT
