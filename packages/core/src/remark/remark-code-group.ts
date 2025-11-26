import type { Root, Code } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'
import { attr, attrValueExpression, flowElement } from '../factories/mdx.js'
import {
  estree,
  expressionStatement,
  property,
  objectExpression,
  arrayExpression,
} from '../factories/estree.js'
import { highlightCode } from '../highlight-code.js'
import { parseCodeBlockMeta } from './code-utils.js'

type CodeVariant = {
  code: string
  highlightedCode: string
  showLineNumbers: boolean
}

type TabData = {
  title: string
  variants: Record<string, CodeVariant>
}

type LanguageOption = {
  value: string
  label: string
}

const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1)

const buildVariantObject = (variant: CodeVariant) =>
  objectExpression([
    property('code', variant.code),
    property('highlightedCode', variant.highlightedCode),
    property('showLineNumbers', variant.showLineNumbers),
  ])

const buildVariantsObject = (variants: Record<string, CodeVariant>) =>
  objectExpression(
    Object.entries(variants).map(([lang, variant]) =>
      property(lang, buildVariantObject(variant))
    )
  )

const buildTabObject = (tab: TabData) =>
  objectExpression([
    property('title', tab.title),
    property('variants', buildVariantsObject(tab.variants)),
  ])

const buildLanguageObject = (lang: LanguageOption) =>
  objectExpression([
    property('value', lang.value),
    property('label', lang.label),
  ])

const remarkCodeGroup: Plugin<[], Root> = () => {
  return async (tree) => {
    const codeGroupNodes: Array<{ node: MdxJsxFlowElement; index: number; parent: any }> = []

    visit(tree, { type: 'mdxJsxFlowElement', name: 'CodeGroup' }, (node, index, parent) => {
      if (parent && typeof index === 'number') {
        codeGroupNodes.push({ node: node as MdxJsxFlowElement, index, parent })
      }
    })

    for (const { node, index, parent } of codeGroupNodes) {
      const tabsMap = new Map<string, TabData>()
      const languagesSet = new Set<string>()
      const tabOrder: string[] = []
      let untitledCount = 0

      // Process all code blocks
      for (const child of node.children) {
        if (child.type === 'code') {
          const codeNode = child as Code
          const { title, lang, showLineNumbers } = parseCodeBlockMeta(codeNode)

          // Track languages in order of first appearance
          if (!languagesSet.has(lang)) {
            languagesSet.add(lang)
          }

          // Determine tab title
          const tabTitle = title || `Tab ${++untitledCount}`

          // Get or create tab entry
          if (!tabsMap.has(tabTitle)) {
            tabsMap.set(tabTitle, { title: tabTitle, variants: {} })
            tabOrder.push(tabTitle)
          }

          // Highlight and add variant
          const highlightedCode = await highlightCode(codeNode.value, lang)
          tabsMap.get(tabTitle)!.variants[lang] = {
            code: codeNode.value,
            highlightedCode,
            showLineNumbers,
          }
        }
      }

      // Build languages array
      const languages: LanguageOption[] = Array.from(languagesSet).map((lang) => ({
        value: lang,
        label: capitalize(lang),
      }))

      // Build tabs array in order
      const tabs = tabOrder.map((title) => tabsMap.get(title)!)

      // Build ESTree expressions
      const languagesArrayExpr = arrayExpression(languages.map(buildLanguageObject))
      const tabsArrayExpr = arrayExpression(tabs.map(buildTabObject))

      // Create attributes
      const languagesAttr = attr(
        'languages',
        attrValueExpression(
          JSON.stringify(languages),
          estree([expressionStatement(languagesArrayExpr)]),
        ),
      )

      const tabsAttr = attr(
        'tabs',
        attrValueExpression(
          JSON.stringify(tabs),
          estree([expressionStatement(tabsArrayExpr)]),
        ),
      )

      // Create new CodeGroup with both attributes
      const newCodeGroup = flowElement('CodeGroup', [], [languagesAttr, tabsAttr])

      // Replace the original
      parent.children.splice(index, 1, newCodeGroup)
    }
  }
}

export default remarkCodeGroup
