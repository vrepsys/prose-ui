import { expect, test } from 'vitest'
import { remark } from 'remark'
import remarkMdx from 'remark-mdx'
import { remarkPlugins, Options } from '../src/index.js'

const expectOutput = async (
  input: string,
  expectedOutput: string,
  options: Options = { image: { imageDir: 'test/images' } },
) => {
  const plugins = remarkPlugins(options)
  const processor = remark()
  for (const plugin of plugins) {
    processor.use(plugin)
  }
  processor.use(remarkMdx)
  
  const output = await processor.process(input)
  expect(output.value).toBe(expectedOutput)
}

test('transform inline math $math$ inside paragraph', async () => {
  const input = `This is a paragraph with inline math $x = y + z$ in the middle.`
  
  const output = `This is a paragraph with inline math <InlineMath>x = y + z</InlineMath> in the middle.
`
  
  await expectOutput(input, output)
})

test('transform inline math $math$ on standalone line', async () => {
  const input = `$x = y + z$
`
  
  const output = `<InlineMath>x = y + z</InlineMath>
`
  
  await expectOutput(input, output)
})

test('transform $$math$$ inside paragraph (produces inlineMath)', async () => {
  const input = `This is a paragraph with $$x = y + z$$ in the middle.`
  
  const output = `This is a paragraph with <InlineMath>x = y + z</InlineMath> in the middle.
`
  
  await expectOutput(input, output)
})

test('transform $$math$$ on standalone line (produces inlineMath)', async () => {
  const input = `$$x = y + z$$
`
  
  const output = `<InlineMath>x = y + z</InlineMath>
`
  
  await expectOutput(input, output)
})
