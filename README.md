<a href="https://prose-ui.com" >
  <img alt="Prose UI - React components and styles for Markdown prose" src="https://repository-images.githubusercontent.com/898552859/3b3d9307-a559-4a32-a9a3-b6806142c47c" />
</a>

# Prose UI

**Beautiful styling and React components for Markdown prose.**

Prose UI is an open-source library of React components and customizable CSS styles for rendering Markdown and MDX content. It gives you polished typography and thoughtfully designed components for documentation sites, blogs, and any content-focused application.

[Documentation](https://prose-ui.com/docs) · [Live Demo](https://prose-ui.com/demo) · [GitHub](https://github.com/vrepsys/prose-ui)

## Why Prose UI?

Every framework has its own conventions for MDX components, and most projects end up with a different—often incomplete—set of building blocks. Prose UI provides a shared set of polished, MDX-ready components that work across frameworks like Next.js, TanStack Start, or any React + MDX setup.

- **Markdown prose styling** — Clean typography with sensible defaults and dark mode support
- **MDX components** — Callouts, code blocks with syntax highlighting, tabs, steps, cards, tables, math formulas, and more
- **React components for Markdown** — Use components directly in MDX or integrate with any React-based content renderer
- **Customizable** — Token-based CSS styling system for easy theming
- **Framework-agnostic** — Works with Next.js, TanStack Start, or any React + MDX pipeline

## Installation

```bash
npm install @prose-ui/core @prose-ui/react @prose-ui/style
```

For Next.js projects, use `@prose-ui/next` instead of `@prose-ui/react` for optimized image and link components.

See the [installation guide](https://prose-ui.com/docs/installation/overview) for detailed setup instructions.

## Quick Start

```tsx
import { mdxComponents } from '@prose-ui/react'
import '@prose-ui/style/prose-ui.css'

// Pass components to your MDX renderer
<MDXContent components={mdxComponents} />

// Wrap content with the prose-ui class
<div className="prose-ui">
  {/* Your rendered Markdown content */}
</div>
```

## Components

Prose UI follows [GitHub Flavored Markdown](https://github.github.com/gfm) syntax and provides additional React components for features not natively supported by Markdown:

- **Typography** — Headings, paragraphs, links, lists
- **Code Blocks** — Syntax highlighting, line numbers, titles, code groups
- **Callouts** — Info, warning, tip, and note variants
- **Tables** — Styled tables with proper alignment
- **Images** — Captions, alignment, and sizing controls
- **Tabs & Steps** — Organize content with tabbed interfaces and step-by-step guides
- **Cards** — Navigation cards and content highlights
- **Math** — LaTeX formulas via KaTeX

Browse all components in the [component documentation](https://prose-ui.com/docs/components/overview).

## Dhub — Visual Markdown Editor

Looking for a visual editing experience? [Dhub](https://dhub.dev) is a git-based CMS for technical documentation with Notion-like Markdown editing. It commits directly to GitHub, so you keep your Git workflow with no lock-in. Prose UI was built alongside Dhub to provide the rendering layer.

## Development

This is a monorepo containing the website, docs, and source code for Prose UI packages.

```bash
pnpm install
cd apps/website
pnpm dev
```

## License

MIT © [Valdemaras Repšys](https://x.com/vrepsys)
