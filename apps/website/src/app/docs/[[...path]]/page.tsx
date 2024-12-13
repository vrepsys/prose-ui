import Cards from '@/components/cards'
import { ColorSwatch } from '@/components/color-swatch'
import { Toc } from '@/components/navigation/toc'
import { MDXContent } from '@content-collections/mdx/react'
import { mdxComponents } from '@prose-ui/next'
import { allPages } from 'content-collections'
import { Metadata } from 'next'

type Params = Promise<{ path: string[]; title: string | null }>
type Props = {
  params: Params
}

const findPage = (pathArr: string[]) => {
  const path = pathArr ? `/${pathArr.join('/')}` : '/'
  return allPages.find((page) => page.path === path)
}

export async function generateStaticParams() {
  return allPages.map((page) => ({
    path: page.path.slice(1).split('/'),
    title: page.title,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params
  let page = findPage(path)
  const title = page ? `${page.title} - Prose UI` : 'Prose UI'
  return {
    title,
  }
}

export default async function Page({ params }: { params: Params }) {
  const { path } = await params
  let page = findPage(path)
  if (!page) {
    return (
      <div className="prose-ui relative mb-64 min-w-0 flex-1 px-[var(--article-padding-x)] md:px-[var(--article-padding-x-md)] lg:px-[var(--article-padding-x-lg)] xl:px-[var(--article-padding-x-xl)]">
        <p>Page not found</p>
      </div>
    )
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
