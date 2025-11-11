# `@prose-ui/next`

[Prose UI](https://prose-ui.com) components and utilities for Next.js. This package wraps the framework-agnostic [`@prose-ui/react`](../react) build and swaps in `next/link` and `next/image`.

## Installation

```sh
$ npm install @prose-ui/next @prose-ui/styles
```

Import the shared styles (and optional KaTeX bundle) from `@prose-ui/styles` inside your global stylesheet:

```css
@import "@prose-ui/styles/prose-ui.css";
@import "@prose-ui/styles/katex.min.css";
```

For React runtimes outside of Next.js, install `@prose-ui/react` instead.
