import Cards from '@/components/cards'
import { Button } from '@/components/ui/button'
import { Callout, CodeBlock, Heading } from '@prose-ui/next'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'

export default () => {
  return (
    <div className="prose-ui">
      <div className="mx-auto flex w-full max-w-3xl flex-col pt-16">
        <h1>
          Refined Typography and Components <br />
          for your MDX Content
        </h1>
        <p className="text-color-low text-lg font-medium">
          Prose UI provides the building blocks for building content-focused websites
        </p>
        <div className="mt-8 flex">
          <Button size="lg" asChild>
            <Link href="/docs">Get started</Link>
          </Button>
        </div>
      </div>
      <div className="border-color-base mx-auto mt-16 grid w-full max-w-7xl grid-cols-2 rounded-sm border">
        <div className="border-color-base border-r px-8 pt-24">
          <pre className="text-sm">
            {` # Prose UI Example
  
\`\`\`js showLineNumbers title="Code block title"
const x = "Hello world"
\`\`\`
<Callout variant="info" title="Info callout">
  Brown fox jumps very high over a lazy dog
</Callout>
`}
          </pre>
        </div>

        <div className="p-8">
          <Heading level={1}>Prose UI Example</Heading>
          <CodeBlock language="js" showLineNumbers title="Code block title">
            {`const x = "Hello world"`}
          </CodeBlock>
          <p>Here's how callouts look like:</p>
          <Callout variant="info" title="Info callout">
            Brown fox jumps very high over a lazy dog
          </Callout>
        </div>
      </div>
    </div>
  )
}
