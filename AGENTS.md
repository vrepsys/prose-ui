# Prose UI

Prose UI is a library of components, remark plugins, and CSS styles to add typography, code blocks, math, callouts, and other MDX-ready UI out of the box.

## Project structure
- apps/website – Marketing/docs site; uses Prose UI as a demo/test bed. MDX docs live in `content/docs`, landing demos in `content/demo`.
- packages/style – Design tokens and generated CSS. Edit `src/index.ts` for component styles, `src/ds/types.ts` for token shape.
- packages/react – MDX-ready React components and exports (`src/mdx`). Components consume classes/tokens from `@prose-ui/style`.
- packages/next – Next.js bindings (`Link`, `Image`) and `mdxComponents` factory for Next apps.
- packages/core – Remark/MDX transforms and tests that stitch MDX to React components.

## Tech
- pnpm, turborepo, Next.js

## Working practices
- Use design-system tokens in styles; avoid raw values. If adding tokens, extend `src/ds/types.ts` and wire defaults in `src/index.ts`.
- Export new components via `packages/react/src/mdx/index.ts`; keep Next bindings in `packages/next`.
- Docs: add component pages under `apps/website/content/docs/components`; surface in `content/docs/navigation.json` and overview grids.
- Demos: add `apps/website/content/demo/<name>.mdx` (heading level `##`), then include in the `order` array in `apps/website/src/app/page.tsx` to show on the landing page.
- Content-collections watcher regenerates generated files; otherwise rerun the generator when adding demos/docs.
