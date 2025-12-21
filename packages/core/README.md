# @prose-ui/core

Remark plugins and utilities for transforming Markdown and MDX content with Prose UI.

## Installation

```bash
npm install @prose-ui/core
```

## Usage

The `remarkPlugins()` function provides plugins for syntax-highlighted code blocks, LaTeX math formulas, and component transformations:

```typescript
import { remarkPlugins } from '@prose-ui/core'

const plugins = remarkPlugins({
  image: {
    imageDir: './public',
  },
})

// Pass plugins to your MDX processor
const content = await compileMDX(post, {
  remarkPlugins: plugins,
})
```

### What's included

- Syntax-highlighted code blocks via Shiki
- LaTeX math formulas via KaTeX
- Image processing and metadata extraction
- Link and heading transformations

## About Prose UI

[Prose UI](https://prose-ui.com) is an open-source library of React components and customizable CSS styles for rendering Markdown and MDX content. It provides polished typography and components for documentation sites, blogs, and content-focused applications.

- [Documentation](https://prose-ui.com/docs)
- [GitHub](https://github.com/vrepsys/prose-ui)

## Dhub

Looking for a visual editing experience? [Dhub](https://dhub.dev) is a git-based CMS for technical documentation with Notion-like Markdown editing. It commits directly to GitHub—no lock-in.

## License

MIT
