import { LandingButtons } from '@/components/landing-buttons'
import { Footer } from '@/components/navigation/footer'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { MDXContent } from '@content-collections/mdx/react'
import { codeToHtml, mdxComponents } from '@prose-ui/next'
import { allDemos } from 'content-collections'
import fs from 'fs/promises'
import path from 'path'

const demos = await Promise.all(
  allDemos.map(async (demo) => ({
    fileName: demo._meta.fileName,
    hideCode: demo.hideCode,
    content: demo.content ?? '',
    mdx: await fs.readFile(
      path.join(process.cwd(), 'content', 'demo', demo._meta.fileName),
      'utf-8',
    ),
  })),
)
const order = [
  'intro.mdx',
  'images.mdx',
  'callouts.mdx',
  'code-block.mdx',
  'typography.mdx',
  'tables.mdx',
]

const RenderedExample = ({ content }: { content: string }) => {
  return (
    <div className="prose-ui flex min-w-0 flex-col">
      <div className="sticky top-[5.25rem] w-full max-w-full pt-12 [&>*:first-child]:mt-0">
        <MDXContent code={content ?? ''} components={{ ...mdxComponents, LandingButtons }} />
      </div>
    </div>
  )
}

const ExampleCode = async ({ fileName, code }: { fileName: string; code: string }) => {
  const html = await codeToHtml({ code, language: 'mdx' })

  return (
    <div className="prose-ui flex min-w-0 flex-col md:pt-12">
      <div className="bg-color-low/40 border-color-base/70 sticky top-[5.25rem] w-full max-w-full rounded border [--shiki-background:hsl(var(--p-color-bg-base))]">
        <div className="text-color-low border-color-base mb-4 inline-block w-full border-b px-4 py-2 text-sm">
          {fileName}
        </div>
        <ScrollArea className="w-full max-w-full">
          <div
            className="p-4 text-[length:var(--p-code-block-font-size)] font-[var(--p-code-block-font-weight)] [--shiki-foreground:hsl(var(--p-color-text-base))]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}

export default () => {
  const sortedDemos = demos
    .filter((d) => order.includes(d.fileName))
    .sort((a, b) => order.indexOf(a.fileName) - order.indexOf(b.fileName))

  return (
    <div className="w-full">
      <div className="pb-12">
        {sortedDemos.map((demo) => (
          <>
            <div
              key={demo.fileName}
              className="mx-auto grid w-full max-w-[var(--site-width)] grid-cols-1 gap-12 px-[var(--site-padding-x)] md:grid-cols-[6fr_4fr]"
            >
              <RenderedExample content={demo.content ?? ''} />
              {!demo.hideCode && <ExampleCode fileName={demo.fileName} code={demo.mdx} />}
            </div>
            <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--p-color-border))] to-transparent last:hidden"></div>
          </>
        ))}
      </div>
      <Footer />
    </div>
  )
}
