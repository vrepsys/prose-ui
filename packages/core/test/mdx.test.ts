import { expect, test } from 'vitest'

import { remark } from 'remark'
import remarkMdx from 'remark-mdx'

import remarkCodeBlock from '../src/remark/remark-code-block.js'
import remarkImage from '../src/remark/remark-image.js'
import remarkLink from '../src/remark/remark-link.js'

const expectOutput = async (input: string, expectedOutput: string) => {
  const output = await remark()
    .use(remarkImage({ imageFolder: 'test/images' }))
    .use(remarkCodeBlock)
    .use(remarkMdx)
    .use(remarkLink)
    .process(input)
  expect(output.value).toBe(expectedOutput)
}

test('code block with language', async () => {
  const input = `\`\`\`js
  const a = 5,
        b = 10
\`\`\`
`

  const output = `<CodeBlock language="js">
  {'  const a = 5,
            b = 10'}
</CodeBlock>
`

  expectOutput(input, output)
})

test('transform code block with lang, showLineNumbers, and title', async () => {
  const input = `\`\`\`js showLineNumbers title="hello world's people"
  const a = 5,
        b = 10
\`\`\`
`

  const output = `<CodeBlock language="js" title="hello world's people" showLineNumbers>
  {'  const a = 5,
            b = 10'}
</CodeBlock>
`

  expectOutput(input, output)
})

test('transform code block without language', async () => {
  const input = `\`\`\`
  const a = 5,
        b = 10
\`\`\`
`

  const output = `<CodeBlock>
  {'  const a = 5,
            b = 10'}
</CodeBlock>
`

  expectOutput(input, output)
})

test('transform images', async () => {
  const input = `![Alt text](/demo.png)`
  const output = `<Image src="/demo.png" alt="Alt text" width={1600} height={900} />
`
  expectOutput(input, output)
})

test('transform remote image, pass exactly same url as in markdown', async () => {
  const input = `![Alt text](https://hello.world/isr.png)`

  const output = `<Image src="https://hello.world/isr.png" alt="Alt text" />
`
  expectOutput(input, output)
})

test('Tag does not change if image does not exist', async () => {
  const input = `<Image src="/does-not-exist.png" alt="Alt text" />`

  const output = `<Image src="/does-not-exist.png" alt="Alt text" />
`
  expectOutput(input, output)
})
test('Sets size when image present', async () => {
  const input = `<Image src="/demo.png" alt="Alt text" />`

  const output = `<Image src="/demo.png" alt="Alt text" width={1600} height={900} />
`
  expectOutput(input, output)
})

test('calculates height and maintains ratio ', async () => {
  const input = `<Image src="/demo.png" alt="Alt text" width={800} />`
  const output = `<Image src="/demo.png" alt="Alt text" width={800} height={450} />
`
  expectOutput(input, output)
})

test('transform src for inline JSX images', async () => {
  const input = `hello <Image src="/demo.png" alt="Alt text" /> world`

  const output = `hello <Image src="/demo.png" alt="Alt text" width={1600} height={900} /> world
`

  expectOutput(input, output)
})

test('transform markdown links to next/link', async () => {
  const input = `hello [dogs](/animals/dogs)`

  const output = `hello <Link href="/animals/dogs">dogs</Link>
`

  expectOutput(input, output)
})
