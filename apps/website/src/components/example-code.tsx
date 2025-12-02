import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { highlightCode } from '@prose-ui/core'

interface ExampleCodeProps {
  fileName: string
  code: string
}

export const ExampleCode = async ({ fileName, code }: ExampleCodeProps) => {
  const html = await highlightCode(code, 'mdx')

  return (
    <div className="prose-ui flex min-w-0 flex-col">
      <div className="bg-color-low/40 border-color-base/70 sticky top-21 w-full max-w-full rounded-sm border [--shiki-background:hsl(var(--p-color-bg-base))]">
        <div className="text-color-low border-color-base mb-4 inline-block w-full border-b px-4 py-2 text-sm">
          {fileName}
        </div>
        <ScrollArea className="w-full max-w-full">
          <div
            className="p-4 text-(length:--p-code-block-font-size) font-(--p-code-block-font-weight) [--shiki-foreground:hsl(var(--p-color-text-base))]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}