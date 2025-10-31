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

test('transform block math $$math$$ with content on separate lines', async () => {
  const input = `$$
math
$$
`
  
  const output = `<BlockMath>
  {'math'}
</BlockMath>
`
  
  await expectOutput(input, output)
})

test('transform block math with multiline formula', async () => {
  const input = `$$
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$
`
  
  const output = `<BlockMath>
  {'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'}
</BlockMath>
`
  
  await expectOutput(input, output)
})

test('transform block math with special characters', async () => {
  const input = `$$
\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n
$$
`
  
  const output = `<BlockMath>
  {'\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n'}
</BlockMath>
`
  
  await expectOutput(input, output)
})

test('transform block math followed by paragraph', async () => {
  const input = `$$
E = mc^2
$$

This is a paragraph after the math block.
`
  
  const output = `<BlockMath>
  {'E = mc^2'}
</BlockMath>

This is a paragraph after the math block.
`
  
  await expectOutput(input, output)
})

test('transform multiple consecutive block math blocks', async () => {
  const input = `$$
a + b = c
$$

$$
d + e = f
$$
`
  
  const output = `<BlockMath>
  {'a + b = c'}
</BlockMath>

<BlockMath>
  {'d + e = f'}
</BlockMath>
`
  
  await expectOutput(input, output)
})

test('transform block math with leading and trailing whitespace', async () => {
  const input = `$$
  x = y  
$$
`
  
  const output = `<BlockMath>
  {'  x = y  '}
</BlockMath>
`
  
  await expectOutput(input, output)
})
