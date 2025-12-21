# @prose-ui/next

React components for rendering Markdown and MDX content with Prose UI, optimized for Next.js. Uses `next/link` and `next/image` for better performance.

For non-Next.js React projects, use [`@prose-ui/react`](https://www.npmjs.com/package/@prose-ui/react) instead.

## Installation

```bash
npm install @prose-ui/next @prose-ui/style
```

## Usage

Pass the MDX components to your renderer and wrap content with the `prose-ui` class:

```tsx
import { mdxComponents } from '@prose-ui/next'
import '@prose-ui/style/prose-ui.css'

// Pass components to your MDX renderer
<MDXContent components={mdxComponents} />

// Wrap content with the prose-ui class
<div className="prose-ui">
  {/* Your rendered Markdown content */}
</div>
```

For math formulas, also import the KaTeX styles:

```css
@import '@prose-ui/style/katex.min.css';
```

### Available components

Import individual components as needed:

```typescript
import {
  Callout,
  CodeBlock,
  Frame,
  Heading,
  Image,
  Link,
  InlineMath,
  BlockMath,
  // ...
} from '@prose-ui/next'
```

## About Prose UI

[Prose UI](https://prose-ui.com) is an open-source library of React components and customizable CSS styles for rendering Markdown and MDX content. It provides polished typography and components for documentation sites, blogs, and content-focused applications.

- [Documentation](https://prose-ui.com/docs)
- [GitHub](https://github.com/vrepsys/prose-ui)

## Dhub

Looking for a visual editing experience? [Dhub](https://dhub.dev) is a git-based CMS for technical documentation with Notion-like Markdown editing. It commits directly to GitHub—no lock-in.

## License

MIT
