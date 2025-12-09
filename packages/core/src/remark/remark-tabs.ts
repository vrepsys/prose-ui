import type { Root } from 'mdast'
import type { Plugin } from 'unified'
import { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'
import { attr, attrValueExpression } from '../factories/mdx.js'
import {
  estree,
  expressionStatement,
  arrayExpression,
  literalExpression,
} from '../factories/estree.js'
import { collectNodesAsync, replaceNode, parseStringAttr, attrsToObj } from './mdx-utils.js'

const remarkTabs: Plugin<[], Root> = () => {
  return (tree) => {
    const tabsNodes = collectNodesAsync<MdxJsxFlowElement>(
      tree,
      { type: 'mdxJsxFlowElement', name: 'Tabs' },
    )

    for (const { node, index, parent } of tabsNodes) {
      const attrs = attrsToObj(node.attributes)
      
      // Skip if items is already provided
      if (attrs['items']) {
        continue
      }

      // Extract groupId attribute if present
      const groupId = parseStringAttr(attrs, 'groupId')

      // Collect values from Tab children
      const items: string[] = []
      for (const child of node.children) {
        if (
          child.type === 'mdxJsxFlowElement' &&
          child.name === 'Tab'
        ) {
          const tabAttrs = attrsToObj(child.attributes)
          const value = parseStringAttr(tabAttrs, 'value')
          if (value) {
            items.push(value)
          }
        }
      }

      // Build ESTree expression for items array
      const itemsArrayExpr = arrayExpression(
        items.map((item) => literalExpression(item))
      )

      // Create new attributes
      const newAttributes = []

      if (groupId) {
        newAttributes.push(attr('groupId', groupId))
      }

      newAttributes.push(
        attr(
          'items',
          attrValueExpression(
            JSON.stringify(items),
            estree([expressionStatement(itemsArrayExpr)]),
          ),
        ),
      )

      // Create new Tabs element with items prop, keeping original children
      const newTabs: MdxJsxFlowElement = {
        type: 'mdxJsxFlowElement',
        name: 'Tabs',
        attributes: newAttributes.filter((a): a is NonNullable<typeof a> => a !== undefined),
        children: node.children,
      }

      // Replace the original
      replaceNode(parent, index, newTabs)
    }
  }
}

export default remarkTabs

