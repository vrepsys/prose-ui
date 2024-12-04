import { createCssVariablesTheme, createHighlighter, makeSingletonHighlighter } from 'shiki'
import { bundledLanguages } from 'shiki/bundle/web'

const getHighlighter = makeSingletonHighlighter(createHighlighter)

const proseUITheme = createCssVariablesTheme({
  name: 'custom',
  variablePrefix: '--shiki-',
})

export const codeToHtml = async ({ code, language }: { code: string; language: string }) => {
  const highlighter = await getHighlighter({
    langs: [...Object.keys(bundledLanguages)],
    themes: [proseUITheme],
  })
  return highlighter.codeToHtml(code, {
    lang: language,
    theme: 'custom',
  })
}
