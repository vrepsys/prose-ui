import { navigationTree } from '@/components/navigation/nav-tree'
import { SideNav } from '@/components/navigation/sidenav'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ContentScrollArea } from '@/components/ui/content-scroll-area'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="bg-background h-[calc(100vh-var(--topnav-height))] w-full min-h-0">
      <div className="mx-auto grid h-full min-h-0 max-w-(--site-width) grid-rows-[1fr] md:grid-cols-[var(--sidenav-width)_minmax(0,1fr)] lg:grid-cols-[var(--sidenav-width)_minmax(0,1fr)_var(--toc-width)]">
        <div className="hidden h-full min-h-0 shrink-0 md:block">
          <ScrollArea className="h-full min-h-0">
            <div className="py-(--article-padding-t) pr-3 pl-(--site-padding-x)">
              <SideNav tree={navigationTree} />
            </div>
          </ScrollArea>
        </div>
        {children}
      </div>
    </main>
  )
}
