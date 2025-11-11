import { expect, test } from 'vitest'
import { remark } from 'remark'
import remarkMdx from 'remark-mdx'
import { remarkPlugins, Options } from '../src/index.js'

const processInput = async (
  input: string,
  options: Options = { image: { imageDir: 'test/images' } },
): Promise<string> => {
  const plugins = remarkPlugins(options)
  const processor = remark()
  for (const plugin of plugins) {
    processor.use(plugin)
  }
  processor.use(remarkMdx)
  
  const result = await processor.process(input)
  return String(result.value)
}

test('transform block math $$math$$ with content on separate lines', async () => {
  const input = `$$
math
$$
`
  
  const output = await processInput(input)
  
  // Check that it contains BlockMath component with renderedMath prop
  expect(output).toContain('<BlockMath renderedMath=')
  expect(output).toContain("{'math'}")
  expect(output).toContain('</BlockMath>')
})

test('transform block math with multiline formula', async () => {
  const input = `$$
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$
`
  
  const output = await processInput(input)
  
  // Check that it contains BlockMath component with renderedMath prop
  expect(output).toContain('<BlockMath renderedMath=')
  expect(output).toContain("{'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'}")
  expect(output).toContain('</BlockMath>')
})

test('transform block math with special characters', async () => {
  const input = `$$
\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n
$$
`
  
  const output = await processInput(input)
  
  // Check that it contains BlockMath component with renderedMath prop
  expect(output).toContain('<BlockMath renderedMath=')
  expect(output).toContain("{'\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n'}")
  expect(output).toContain('</BlockMath>')
})

test('transform block math followed by paragraph', async () => {
  const input = `$$
E = mc^2
$$

This is a paragraph after the math block.
`
  
  const output = await processInput(input)
  
  // Check that it contains BlockMath component with renderedMath prop
  expect(output).toContain('<BlockMath renderedMath=')
  expect(output).toContain("{'E = mc^2'}")
  expect(output).toContain('</BlockMath>')
  expect(output).toContain('This is a paragraph after the math block.')
})

test('transform multiple consecutive block math blocks', async () => {
  const input = `$$
a + b = c
$$

$$
d + e = f
$$
`
  
  const output = await processInput(input)
  
  // Check that it contains two BlockMath components with renderedMath props
  expect(output).toContain('<BlockMath renderedMath=')
  expect(output).toContain("{'a + b = c'}")
  expect(output).toContain("{'d + e = f'}")
  // Count occurrences of </BlockMath> to ensure both blocks are present
  const matches = output.match(/<\/BlockMath>/g)
  expect(matches).toHaveLength(2)
})

test('transform block math with leading and trailing whitespace', async () => {
  const input = `$$
  x = y  
$$
`
  
  const output = await processInput(input)
  
  // Check that it contains BlockMath component with renderedMath prop
  expect(output).toContain('<BlockMath renderedMath=')
  expect(output).toContain("{'  x = y  '}")
  expect(output).toContain('</BlockMath>')
})
