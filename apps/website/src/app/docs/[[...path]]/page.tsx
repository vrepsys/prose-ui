import Cards from '@/components/cards'
import { ColorSwatch } from '@/components/color-swatch'
import { Toc } from '@/components/navigation/toc'
import { MDXContent } from '@content-collections/mdx/react'
import { mdxComponents } from '@prose-ui/next'
import { allPages } from 'content-collections'

type Params = Promise<{ path: string[] }>

export async function generateStaticParams() {
  return allPages.map((page) => ({
    path: page.path.startsWith('/') ? page.path.slice(1).split('/') : page.path.split('/'),
  }))
}

export default async function Page({ params }: { params: Params }) {
  const { path: pathArr } = await params
  const path = pathArr ? `/${pathArr.join('/')}` : '/'
  let page = allPages.find((page) => page.path === path)
  if (!page) {
    return <div>Page not found</div>
  }
  return (
    <>
      <article className="prose-ui relative mb-64 min-w-0 flex-1 px-[var(--article-padding-x)] md:px-[var(--article-padding-x-md)] lg:px-[var(--article-padding-x-lg)] xl:px-[var(--article-padding-x-xl)]">
        <MDXContent code={page.content} components={{ ...mdxComponents, Cards, ColorSwatch }} />
      </article>

      <div className="sticky top-[var(--topnav-height)] hidden h-[calc(100vh-var(--topnav-height))] w-[var(--toc-width)] shrink-0 flex-col pt-[var(--article-padding-t)] lg:flex">
        <Toc sections={page.toc} />
      </div>
    </>
  )
}
