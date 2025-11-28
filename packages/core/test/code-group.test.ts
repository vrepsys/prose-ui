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

test('CodeGroup transforms fenced code blocks with language variants', async () => {
  const input = `<CodeGroup>

\`\`\`javascript title='Install'
npm install foo
\`\`\`

\`\`\`python title='Install'
pip install foo
\`\`\`

</CodeGroup>
`
  
  const output = await processInput(input)
  
  // Parse languages
  const languagesMatch = output.match(/languages=\{(\[.*?\])\}/)
  expect(languagesMatch).toBeTruthy()
  const languages = JSON.parse(languagesMatch![1])
  
  expect(languages).toHaveLength(2)
  expect(languages[0]).toEqual({ value: 'javascript', label: 'Javascript' })
  expect(languages[1]).toEqual({ value: 'python', label: 'Python' })
  
  // Parse tabs
  const tabsMatch = output.match(/tabs=\{(\[.*\])\}/)
  expect(tabsMatch).toBeTruthy()
  const tabs = JSON.parse(tabsMatch![1])
  
  expect(tabs).toHaveLength(1)
  expect(tabs[0].title).toBe('Install')
  expect(tabs[0].variants.javascript.code).toBe('npm install foo')
  expect(tabs[0].variants.python.code).toBe('pip install foo')
})

test('CodeGroup groups code blocks by title', async () => {
  const input = `<CodeGroup>

\`\`\`javascript title='Install'
npm install foo
\`\`\`

\`\`\`javascript title='Usage'
import foo from 'foo'
\`\`\`

\`\`\`python title='Install'
pip install foo
\`\`\`

\`\`\`python title='Usage'
import foo
\`\`\`

</CodeGroup>
`
  
  const output = await processInput(input)
  
  const tabsMatch = output.match(/tabs=\{(\[.*\])\}/)
  const tabs = JSON.parse(tabsMatch![1])
  
  expect(tabs).toHaveLength(2)
  
  // First tab: Install
  expect(tabs[0].title).toBe('Install')
  expect(tabs[0].variants.javascript.code).toBe('npm install foo')
  expect(tabs[0].variants.python.code).toBe('pip install foo')
  
  // Second tab: Usage
  expect(tabs[1].title).toBe('Usage')
  expect(tabs[1].variants.javascript.code).toBe("import foo from 'foo'")
  expect(tabs[1].variants.python.code).toBe('import foo')
})

test('CodeGroup generates Tab N labels when title is missing', async () => {
  const input = `<CodeGroup>

\`\`\`javascript title='app.js'
const x = 1;
\`\`\`

\`\`\`css
.class { color: red; }
\`\`\`

\`\`\`html title='index.html'
<div>Hello</div>
\`\`\`

</CodeGroup>
`
  
  const output = await processInput(input)
  const tabsMatch = output.match(/tabs=\{(\[.*\])\}/)
  const tabs = JSON.parse(tabsMatch![1])
  
  expect(tabs).toHaveLength(3)
  expect(tabs[0].title).toBe('app.js')
  expect(tabs[1].title).toBe('Tab 1')  // No title, generated
  expect(tabs[2].title).toBe('index.html')
})

test('CodeGroup respects showLineNumbers in fence meta', async () => {
  const input = `<CodeGroup>

\`\`\`javascript title='with-lines.js' showLineNumbers
const x = 1;
\`\`\`

\`\`\`javascript title='without-lines.js'
const y = 2;
\`\`\`

</CodeGroup>
`
  
  const output = await processInput(input)
  const tabsMatch = output.match(/tabs=\{(\[.*\])\}/)
  const tabs = JSON.parse(tabsMatch![1])
  
  expect(tabs[0].variants.javascript.showLineNumbers).toBe(true)
  expect(tabs[1].variants.javascript.showLineNumbers).toBe(false)
})

test('CodeGroup extracts languages in order of first appearance', async () => {
  const input = `<CodeGroup>

\`\`\`python title='Install'
pip install foo
\`\`\`

\`\`\`javascript title='Install'
npm install foo
\`\`\`

\`\`\`typescript title='Install'
npm install foo @types/foo
\`\`\`

</CodeGroup>
`
  
  const output = await processInput(input)
  const languagesMatch = output.match(/languages=\{(\[.*?\])\}/)
  const languages = JSON.parse(languagesMatch![1])
  
  expect(languages).toHaveLength(3)
  expect(languages[0].value).toBe('python')
  expect(languages[1].value).toBe('javascript')
  expect(languages[2].value).toBe('typescript')
})

test('Code blocks outside CodeGroup are still transformed to CodeBlock', async () => {
  const input = `\`\`\`javascript title='standalone.js'
const standalone = true;
\`\`\`
`
  
  const output = await processInput(input)
  
  expect(output).toContain('<CodeBlock')
  expect(output).toContain('language="javascript"')
  expect(output).toContain('title="standalone.js"')
})

test('CodeGroup handles sparse language variants (some tabs missing languages)', async () => {
  const input = `<CodeGroup>

\`\`\`typescript title='Server'
const app: Express = express()
\`\`\`

\`\`\`javascript title='Server'
const app = express()
\`\`\`

\`\`\`typescript title='Client'
const data: User[] = await fetch('/api')
\`\`\`

</CodeGroup>
`
  
  const output = await processInput(input)
  
  const languagesMatch = output.match(/languages=\{(\[.*?\])\}/)
  const languages = JSON.parse(languagesMatch![1])
  
  // Both languages should be extracted
  expect(languages).toHaveLength(2)
  expect(languages[0].value).toBe('typescript')
  expect(languages[1].value).toBe('javascript')
  
  const tabsMatch = output.match(/tabs=\{(\[.*\])\}/)
  const tabs = JSON.parse(tabsMatch![1])
  
  expect(tabs).toHaveLength(2)
  
  // Server tab has both variants
  expect(tabs[0].title).toBe('Server')
  expect(tabs[0].variants.typescript).toBeDefined()
  expect(tabs[0].variants.javascript).toBeDefined()
  
  // Client tab only has typescript variant
  expect(tabs[1].title).toBe('Client')
  expect(tabs[1].variants.typescript).toBeDefined()
  expect(tabs[1].variants.javascript).toBeUndefined()
})

test('CodeGroup with single language does not duplicate languages', async () => {
  const input = `<CodeGroup>

\`\`\`javascript title='Install'
npm install foo
\`\`\`

\`\`\`javascript title='Usage'
import foo from 'foo'
\`\`\`

</CodeGroup>
`
  
  const output = await processInput(input)
  
  const languagesMatch = output.match(/languages=\{(\[.*?\])\}/)
  const languages = JSON.parse(languagesMatch![1])
  
  // Only one language
  expect(languages).toHaveLength(1)
  expect(languages[0]).toEqual({ value: 'javascript', label: 'Javascript' })
  
  const tabsMatch = output.match(/tabs=\{(\[.*\])\}/)
  const tabs = JSON.parse(tabsMatch![1])
  
  expect(tabs).toHaveLength(2)
  expect(tabs[0].title).toBe('Install')
  expect(tabs[1].title).toBe('Usage')
})

test('CodeGroup generates highlighted code for each variant', async () => {
  const input = `<CodeGroup>

\`\`\`typescript title='Example'
const x: number = 42
\`\`\`

\`\`\`javascript title='Example'
const x = 42
\`\`\`

</CodeGroup>
`
  
  const output = await processInput(input)
  
  const tabsMatch = output.match(/tabs=\{(\[.*\])\}/)
  const tabs = JSON.parse(tabsMatch![1])
  
  // Verify highlightedCode is generated (contains HTML from shiki)
  expect(tabs[0].variants.typescript.highlightedCode).toContain('<span')
  expect(tabs[0].variants.javascript.highlightedCode).toContain('<span')
  
  // Raw code should be preserved
  expect(tabs[0].variants.typescript.code).toBe('const x: number = 42')
  expect(tabs[0].variants.javascript.code).toBe('const x = 42')
})

test('CodeGroup handles multiple tabs with three languages', async () => {
  const input = `<CodeGroup>

\`\`\`typescript title='Install'
npm install @types/foo foo
\`\`\`

\`\`\`javascript title='Install'
npm install foo
\`\`\`

\`\`\`python title='Install'
pip install foo
\`\`\`

\`\`\`typescript title='Usage'
import { Foo } from 'foo'
const f: Foo = new Foo()
\`\`\`

\`\`\`javascript title='Usage'
import { Foo } from 'foo'
const f = new Foo()
\`\`\`

\`\`\`python title='Usage'
from foo import Foo
f = Foo()
\`\`\`

</CodeGroup>
`
  
  const output = await processInput(input)
  
  const languagesMatch = output.match(/languages=\{(\[.*?\])\}/)
  const languages = JSON.parse(languagesMatch![1])
  
  expect(languages).toHaveLength(3)
  expect(languages.map((l: {value: string}) => l.value)).toEqual(['typescript', 'javascript', 'python'])
  
  const tabsMatch = output.match(/tabs=\{(\[.*\])\}/)
  const tabs = JSON.parse(tabsMatch![1])
  
  expect(tabs).toHaveLength(2)
  
  // Install tab
  expect(tabs[0].title).toBe('Install')
  expect(Object.keys(tabs[0].variants)).toHaveLength(3)
  expect(tabs[0].variants.typescript.code).toBe('npm install @types/foo foo')
  expect(tabs[0].variants.javascript.code).toBe('npm install foo')
  expect(tabs[0].variants.python.code).toBe('pip install foo')
  
  // Usage tab
  expect(tabs[1].title).toBe('Usage')
  expect(Object.keys(tabs[1].variants)).toHaveLength(3)
  expect(tabs[1].variants.python.code).toBe('from foo import Foo\nf = Foo()')
})

test('CodeGroup passes through groupId attribute', async () => {
  const input = `<CodeGroup groupId="install-commands">

\`\`\`bash title='npm'
npm install foo
\`\`\`

\`\`\`bash title='pnpm'
pnpm add foo
\`\`\`

</CodeGroup>
`
  
  const output = await processInput(input)
  
  // Verify groupId is in the output
  expect(output).toContain('groupId="install-commands"')
  
  // Verify other attributes are still present
  const languagesMatch = output.match(/languages=\{(\[.*?\])\}/)
  expect(languagesMatch).toBeTruthy()
  
  const tabsMatch = output.match(/tabs=\{(\[.*\])\}/)
  expect(tabsMatch).toBeTruthy()
  const tabs = JSON.parse(tabsMatch![1])
  
  expect(tabs).toHaveLength(2)
  expect(tabs[0].title).toBe('npm')
  expect(tabs[1].title).toBe('pnpm')
})

test('CodeGroup without groupId does not include groupId attribute', async () => {
  const input = `<CodeGroup>

\`\`\`bash title='npm'
npm install foo
\`\`\`

</CodeGroup>
`
  
  const output = await processInput(input)
  
  // Verify groupId is NOT in the output
  expect(output).not.toContain('groupId=')
})
