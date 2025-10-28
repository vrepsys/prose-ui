import { extractMetadata } from '@/lib/extract-metadata'
import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { remarkPlugins } from '@prose-ui/core'
import type { Root } from 'mdast'

// Custom remark plugin to log the AST
// const logAst = () => (tree: Root) => {
//   console.log('MD AST with remark plugins applied:', JSON.stringify(tree, null, 2))
// }

const pages = defineCollection({
  name: 'pages',
  directory: 'content/docs',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.optional(z.string()),
  }),
  transform: async (post, ctx) => {
    const { toc, title } = await extractMetadata(post.content)
    const content = await compileMDX(ctx, post, {
      remarkPlugins: [...remarkPlugins()],
    })
    let path
    if (post._meta.path === 'index') {
      path = ''
    } else if (post._meta.path.endsWith('/index')) {
      path = post._meta.path.slice(0, -6)
    } else {
      path = post._meta.path
    }
    return {
      ...post,
      path: `/${path}`,
      toc,
      title,
      content,
    }
  },
})

const demos = defineCollection({
  name: 'demos',
  directory: 'content/demo',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.optional(z.string()),
    hideCode: z.optional(z.boolean()),
  }),
  transform: async (page, ctx) => {
    const content = await compileMDX(ctx, page, {
      remarkPlugins: [...remarkPlugins()],
    })
    return {
      ...page,
      content,
    }
  },
})

export default defineConfig({
  collections: [pages, demos],
})
