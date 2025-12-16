"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { classes } from "@/utils/classes"
import { ContentScrollProvider } from "@/components/content-scroll-context"
import { ScrollBar } from "./scroll-area"

type ContentScrollAreaProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  viewportRef?: React.RefObject<HTMLDivElement | null>
}

function ContentScrollArea({
  className,
  children,
  type = "scroll",
  viewportRef: externalViewportRef,
  ...props
}: ContentScrollAreaProps) {
  const internalViewportRef = React.useRef<HTMLDivElement>(null)
  const viewportRef = externalViewportRef ?? internalViewportRef

  return (
    <ScrollAreaPrimitive.Root
      data-slot="content-scroll-area"
      type={type}
      className={classes("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        <ContentScrollProvider value={viewportRef}>
          {children}
        </ContentScrollProvider>
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar className="py-1.5" />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

export { ContentScrollArea }
