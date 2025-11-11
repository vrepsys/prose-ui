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

test('transform inline math $math$ inside paragraph', async () => {
  const input = `This is a paragraph with inline math $x = y + z$ in the middle.`
  
  const output = await processInput(input)
  
  // Check that it contains InlineMath component with renderedMath prop
  expect(output).toContain('<InlineMath renderedMath=')
  expect(output).toContain('x = y + z</InlineMath>')
  expect(output).toContain('This is a paragraph with inline math')
})

test('transform inline math $math$ on standalone line', async () => {
  const input = `$x = y + z$
`
  
  const output = await processInput(input)
  
  // Check that it contains InlineMath component with renderedMath prop
  expect(output).toContain('<InlineMath renderedMath=')
  expect(output).toContain('x = y + z</InlineMath>')
})

test('transform $$math$$ inside paragraph (produces inlineMath)', async () => {
  const input = `This is a paragraph with $$x = y + z$$ in the middle.`
  
  const output = await processInput(input)
  
  // Check that it contains InlineMath component with renderedMath prop
  expect(output).toContain('<InlineMath renderedMath=')
  expect(output).toContain('x = y + z</InlineMath>')
  expect(output).toContain('This is a paragraph with')
})

test('transform $$math$$ on standalone line (produces inlineMath)', async () => {
  const input = `$$x = y + z$$
`
  
  const output = await processInput(input)
  
  // Check that it contains InlineMath component with renderedMath prop
  expect(output).toContain('<InlineMath renderedMath=')
  expect(output).toContain('x = y + z</InlineMath>')
})
