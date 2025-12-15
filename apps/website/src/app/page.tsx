import { ExampleCode } from '@/components/example-code'
import { LandingButtons } from '@/components/landing-buttons'
import { Footer } from '@/components/navigation/footer'
import { MDXContent } from '@content-collections/mdx/react'
import { mdxComponents } from '@prose-ui/next'
import { allDemos } from 'content-collections'
import fs from 'fs/promises'
import path from 'path'
import React from 'react'

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
  'images.mdx',
  'typography.mdx',
  'callouts.mdx',
  'cards.mdx',
  'steps.mdx',
  'code-blocks.mdx',
  'code-groups.mdx',
  'tabs.mdx',
  'math-formulas.mdx',
  'tables.mdx',
  'styling.mdx',
]

const RenderedExample = ({ content }: { content: string }) => {
  return (
    <div className="flex min-w-0 flex-col">
      <div className="rounded-sm prose-ui shadow-xs border border-border/75 dark:border-0  bg-color-low/60 sticky top-21 w-full max-w-full  px-5 py-4 [&>*:first-child]:mt-0">
        <MDXContent code={content ?? ''} components={{ ...mdxComponents, LandingButtons }} />
      </div>
    </div>
  )
}

export default () => {
  const sortedDemos = demos
    .filter((d) => order.includes(d.fileName))
    .sort((a, b) => order.indexOf(a.fileName) - order.indexOf(b.fileName))

  const intro = allDemos.find((d) => d._meta.fileName === 'intro.mdx')

  return (
    <div className="w-full">
      <div className="pb-24">
        {intro && (
          <div className="prose-ui bg-background [&>*:nth-child(2)]:text-muted-foreground
           mx-auto mb-20 mt-16 w-full max-w-(--site-width) px-(--site-padding-x) [&>*:first-child]:mt-0">
            <MDXContent
              code={intro.content ?? ''}
              components={{ ...mdxComponents, LandingButtons }}
            />
          </div>
        )}
        <div className="flex flex-col gap-10">
          {sortedDemos.map((demo) => (
            <React.Fragment key={demo.fileName}>
              <div className="mx-auto grid w-full max-w-(--site-width) grid-cols-1 gap-4 px-(--site-padding-x) md:grid-cols-[4fr_4fr] md:gap-4">
                <RenderedExample content={demo.content ?? ''} />
                {demo.fileName !== 'intro.mdx' && (
                  <ExampleCode fileName={demo.fileName} code={demo.mdx} />
                )}
              </div>
              <div className="border-color-base/50 mx-auto h-px w-full border-b border-dashed last:hidden"></div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
