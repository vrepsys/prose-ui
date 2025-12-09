import { DocsPageContent } from '@/components/docs-page-content'
import { MDXContent } from '@content-collections/mdx/react'
import { mdxComponents } from '@prose-ui/next'
import { allPages } from 'content-collections'
import { Metadata } from 'next'

type Params = Promise<{ path: string[] }>
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
      <div className="prose-ui relative mb-64 min-w-0 flex-1 px-(--article-padding-x) md:px-(--article-padding-x-md) lg:px-(--article-padding-x-lg) xl:px-(--article-padding-x-xl)">
        <p>Page not found</p>
      </div>
    )
  }
  return (
    <DocsPageContent
      toc={page.toc}
      article={
        <article className="prose-ui relative w-full px-(--article-padding-x) md:px-(--article-padding-x-md) lg:px-(--article-padding-x-lg) xl:px-(--article-padding-x-xl)">
          <MDXContent code={page.content} components={{ ...mdxComponents }} />
          <div className="h-[25vh]" aria-hidden="true" />
        </article>
      }
    />
  )
}
