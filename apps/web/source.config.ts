import { remarkPlugins } from '@prose-ui/core';
import { defineDocs, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config';

export const { docs, meta } = defineDocs();

export default defineConfig({
  mdxOptions: {
    remarkPlugins: remarkPlugins(),
  },
});
