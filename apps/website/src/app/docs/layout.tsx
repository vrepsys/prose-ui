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
    <main className="bg-background grid w-full grid-cols-[max(0px,calc((100%-var(--site-width))/2))_1fr]">
      <div></div>
      <div className="bg-background h-[calc(100vh-var(--topnav-height))] relative flex w-full">
        <div className="bg-background absolute top-0 h-full hidden w-(--sidenav-width) shrink-0 flex-col md:flex">
          <ScrollArea className="h-full">
            <div className="py-(--article-padding-t) pr-3 pl-(--site-padding-x)">
              <SideNav tree={navigationTree} />
            </div>
          </ScrollArea>
        </div>
        <div className="bg-card shadow-xs absolute top-0 right-2 left-(--sidenav-width) h-[calc(100vh-var(--topnav-height)-0.5rem)] rounded-lg">
          <ContentScrollArea className="rounded-lg h-full w-full">
            <div className="h-full flex relative w-[calc(var(--site-width)-var(--sidenav-width))]">
              <div className="h-full w-full flex relative">
                {children}
              </div>
            </div>
          </ContentScrollArea>
        </div>
      </div>
    </main>
  )
}
