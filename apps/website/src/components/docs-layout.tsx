import { PropsWithChildren } from 'react'
import { navigationTree } from './navigation/nav-tree'
import { SideNav } from './navigation/sidenav'
import { ScrollArea } from './ui/scroll-area'

export const DocsLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className="w-full">
        <div className="relative mx-auto flex w-full max-w-[var(--site-width)] px-[var(--site-padding-x)] md:pl-0 md:pr-[var(--site-padding-x)]">
          <div className="sticky top-[var(--topnav-height)] hidden h-[calc(100vh-var(--topnav-height))] w-[var(--sidenav-width)] shrink-0 flex-col border-r md:flex">
            <ScrollArea>
              <div className="py-[var(--article-padding-t)] pl-[var(--site-padding-x)] pr-3">
                <SideNav tree={navigationTree} />
              </div>
            </ScrollArea>
          </div>
          {children}
        </div>
      </main>
    </>
  )
}
