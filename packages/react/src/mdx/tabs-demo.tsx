'use client'

import { CodeGroup } from './code-group.js'

const tsCode = `function greet(name: string) {
  return \`Hello, \${name}!\`
}

const message = greet('World')
console.log(message)`

const tsHighlighted = `<pre class="shiki" style="background-color: var(--shiki-bg)"><code><span class="line"><span style="color: var(--shiki-token-function)">function</span><span style="color: var(--shiki-token-keyword)"> </span><span style="color: var(--shiki-token-function)">greet</span><span style="color: var(--shiki-token-punctuation)">(</span><span style="color: var(--shiki-token-parameter)">name</span><span style="color: var(--shiki-token-punctuation)">: </span><span style="color: var(--shiki-token-type)">string</span><span style="color: var(--shiki-token-punctuation)">)</span><span style="color: var(--shiki-token-punctuation)"> {</span></span>
<span class="line"><span style="color: var(--shiki-token-keyword)">  </span><span style="color: var(--shiki-token-keyword)">return</span><span style="color: var(--shiki-token-keyword)"> </span><span style="color: var(--shiki-token-string-expression)">\`Hello, \${name}!\`</span></span>
<span class="line"><span style="color: var(--shiki-token-punctuation)">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: var(--shiki-token-keyword)">const</span><span style="color: var(--shiki-token-keyword)"> </span><span style="color: var(--shiki-token-variable)">message</span><span style="color: var(--shiki-token-keyword)"> = </span><span style="color: var(--shiki-token-function)">greet</span><span style="color: var(--shiki-token-punctuation)">(</span><span style="color: var(--shiki-token-string)">'World'</span><span style="color: var(--shiki-token-punctuation)">)</span></span>
<span class="line"><span style="color: var(--shiki-token-function)">console</span><span style="color: var(--shiki-token-punctuation)">.</span><span style="color: var(--shiki-token-function)">log</span><span style="color: var(--shiki-token-punctuation)">(</span><span style="color: var(--shiki-token-variable)">message</span><span style="color: var(--shiki-token-punctuation)">)</span></span></code></pre>`

const jsCode = `function greet(name) {
  return \`Hello, \${name}!\`
}

const message = greet('World')
console.log(message)`

const jsHighlighted = `<pre class="shiki" style="background-color: var(--shiki-bg)"><code><span class="line"><span style="color: var(--shiki-token-function)">function</span><span style="color: var(--shiki-token-keyword)"> </span><span style="color: var(--shiki-token-function)">greet</span><span style="color: var(--shiki-token-punctuation)">(</span><span style="color: var(--shiki-token-parameter)">name</span><span style="color: var(--shiki-token-punctuation)">)</span><span style="color: var(--shiki-token-punctuation)"> {</span></span>
<span class="line"><span style="color: var(--shiki-token-keyword)">  </span><span style="color: var(--shiki-token-keyword)">return</span><span style="color: var(--shiki-token-keyword)"> </span><span style="color: var(--shiki-token-string-expression)">\`Hello, \${name}!\`</span></span>
<span class="line"><span style="color: var(--shiki-token-punctuation)">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: var(--shiki-token-keyword)">const</span><span style="color: var(--shiki-token-keyword)"> </span><span style="color: var(--shiki-token-variable)">message</span><span style="color: var(--shiki-token-keyword)"> = </span><span style="color: var(--shiki-token-function)">greet</span><span style="color: var(--shiki-token-punctuation)">(</span><span style="color: var(--shiki-token-string)">'World'</span><span style="color: var(--shiki-token-punctuation)">)</span></span>
<span class="line"><span style="color: var(--shiki-token-function)">console</span><span style="color: var(--shiki-token-punctuation)">.</span><span style="color: var(--shiki-token-function)">log</span><span style="color: var(--shiki-token-punctuation)">(</span><span style="color: var(--shiki-token-variable)">message</span><span style="color: var(--shiki-token-punctuation)">)</span></span></code></pre>`

const TabsDemo = () => (
  <CodeGroup
    languages={[
      { value: 'typescript', label: 'TypeScript' },
      { value: 'javascript', label: 'JavaScript' },
    ]}
    tabs={[
      {
        title: 'greet.ts',
        variants: {
          typescript: { code: tsCode, highlightedCode: tsHighlighted },
          javascript: { code: jsCode, highlightedCode: jsHighlighted },
        },
      },
    ]}
  />
)

export default TabsDemo
