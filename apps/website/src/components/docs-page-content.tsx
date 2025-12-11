'use client'

import { useRef } from 'react'
import { Toc } from '@/components/navigation/toc'
import { ContentScrollProvider } from '@/components/content-scroll-context'
import { ContentScrollArea } from '@/components/ui/content-scroll-area'
import { Section } from '@/lib/extract-toc'

export function DocsPageContent({
  article,
  toc,
}: {
  article: React.ReactNode
  toc: Section[]
}) {
  const viewportRef = useRef<HTMLDivElement>(null)

  return (
    <ContentScrollProvider value={viewportRef}>
      <>
        <div className="relative h-full min-h-0 min-w-0 sm:pb-2 pr-0 sm:pr-2 lg:pr-4 pl-0 sm:pl-2 md:pl-0">
          <ContentScrollArea
            viewportRef={viewportRef}
            className="h-full min-h-0 w-full bg-card sm:rounded-lg sm:shadow-xs sm:border sm:border-border/75 dark:border-0"
          >
            {article}
          </ContentScrollArea>
        </div>

        <div className="hidden h-full min-h-0 w-(--toc-width) pr-(--site-padding-x) flex-col lg:flex">
          <Toc sections={toc} />
        </div>
      </>
    </ContentScrollProvider>
  )
}
