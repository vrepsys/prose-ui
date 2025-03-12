import { expect, test } from 'vitest'

import { remark } from 'remark'
import remarkMdx from 'remark-mdx'

import remarkCodeBlock from '../src/remark/remark-code-block.js'
import remarkImage from '../src/remark/remark-image.js'
import remarkLink from '../src/remark/remark-link.js'
import { Options } from '../src'

const DEMO_IMG_BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/2wBDAFA3PEY8MlBGQUZaVVBfeMiCeG5uePWvuZHI////////////////////////////////////////////////////2wBDAVVaWnhpeOuCguv/////////////////////////////////////////////////////////////////////////wAARCAAFAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAYEAADAQEAAAAAAAAAAAAAAAAAARECIf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCep5sXGAAP/9k='

const expectOutput = async (
  input: string,
  expectedOutput: string,
  options: Options = { image: { imageDir: 'test/images' } },
) => {
  const output = await remark()
    .use(remarkImage(options.image))
    .use(remarkCodeBlock)
    .use(remarkMdx)
    .use(remarkLink(options.link))
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

  await expectOutput(input, output)
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

  await expectOutput(input, output)
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

  await expectOutput(input, output)
})

test('transform markdown image', async () => {
  const input = `![Alt text](/demo.png)`
  const output = `<Image src="/demo.png" alt="Alt text" width={1600} height={900} blurDataURL="${DEMO_IMG_BLUR_DATA_URL}" />
`
  await expectOutput(input, output)
})

test('transform markdown image with url mapping', async () => {
  const input = `![Alt text](/demo.png)`
  const output = `<Image src="/docs/demo.png" alt="Alt text" width={1600} height={900} blurDataURL="${DEMO_IMG_BLUR_DATA_URL}" />
`
  await expectOutput(input, output, {
    image: { imageDir: 'test/images', basePath: '/docs' },
  })
})

test('transform remote image, pass exactly same url as in markdown', async () => {
  const input = `![Alt text](https://hello.world/isr.png)`

  const output = `<Image src="https://hello.world/isr.png" alt="Alt text" />
`
  await expectOutput(input, output)
})

test('transform remote image, exactly the same url as in markdown, even with mapUrl', async () => {
  const input = `![Alt text](https://hello.world/isr.png)`

  const output = `<Image src="https://hello.world/isr.png" alt="Alt text" />
`
  await expectOutput(input, output, {
    image: { imageDir: 'test/images', basePath: '/docs' },
  })
})

test('Tag does not change if image does not exist', async () => {
  const input = `<Image src="/does-not-exist.png" alt="Alt text" />`

  const output = `<Image src="/does-not-exist.png" alt="Alt text" />
`
  await expectOutput(input, output)
})

test('Sets size when image present', async () => {
  const input = `<Image src="/demo.png" alt="Alt text" />`

  const output = `<Image src="/demo.png" alt="Alt text" blurDataURL="${DEMO_IMG_BLUR_DATA_URL}" width={1600} height={900} />
`
  await expectOutput(input, output)
})

test('calculates height and maintains ratio ', async () => {
  const input = `<Image src="/demo.png" alt="Alt text" width={800} />`
  const output = `<Image src="/demo.png" alt="Alt text" width={800} blurDataURL="${DEMO_IMG_BLUR_DATA_URL}" height={450} />
`
  await expectOutput(input, output)
})

test('transform image src for inline JSX images', async () => {
  const input = `hello <Image src="/demo.png" alt="Alt text" /> world`

  const output = `hello <Image src="/demo.png" alt="Alt text" blurDataURL="${DEMO_IMG_BLUR_DATA_URL}" width={1600} height={900} /> world
`

  await expectOutput(input, output)
})

test('transform src for inline JSX images with basePath', async () => {
  const input = `hello <Image src="/demo.png" alt="Alt text" /> world`

  const output = `hello <Image src="/docs/demo.png" alt="Alt text" blurDataURL="${DEMO_IMG_BLUR_DATA_URL}" width={1600} height={900} /> world
`

  await expectOutput(input, output, {
    image: { imageDir: 'test/images', basePath: '/docs' },
  })
})

test('transform markdown links to next/link', async () => {
  const input = `hello [dogs](/animals/dogs)`

  const output = `hello <Link href="/animals/dogs">dogs</Link>
`

  await expectOutput(input, output)
})
