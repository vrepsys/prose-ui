import { buildToc } from '@/lib/build-toc'
import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { remarkPlugins } from '@prose-ui/core'

const pages = defineCollection({
  name: 'pages',
  directory: 'content/docs',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.optional(z.string()),
  }),
  transform: async (post, ctx) => {
    const toc = await buildToc(post.content)
    const content = await compileMDX(ctx, post, {
      remarkPlugins: remarkPlugins(),
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
      content,
    }
  },
})

export default defineConfig({
  collections: [pages],
})
