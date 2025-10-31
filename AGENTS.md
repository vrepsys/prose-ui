# Prose UI

Prose UI is a library of components and remark plugins and css styles that lets users add beautiful typography, and components support such as code block, formula, callout out of the box.

Project structure:
- apps/website - marketing website and docs for Prose UI (uses Prose UI, so also serves as a testing ground)
- packages/next - Contains styles, Next.js/React related components of the library.
- packages/core - Contains remark plugins and tests for transforming input MDX into MDX that use react components defined in packages/next

Tech:
- pnpm
- turborepo
- Next.js