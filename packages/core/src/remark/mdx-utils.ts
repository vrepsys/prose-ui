import { BlockContent, DefinitionContent, PhrasingContent, Root } from 'mdast'
import { MdxFlowExpression, MdxTextExpression } from 'mdast-util-mdx-expression'
import {
  MdxJsxAttribute,
  MdxJsxExpressionAttribute,
  MdxJsxFlowElement,
  MdxJsxTextElement,
} from 'mdast-util-mdx-jsx'
import type { Parent } from 'unist'
import { visit, Test } from 'unist-util-visit'

export type AttrMap = Record<MdxJsxAttribute['name'], MdxJsxAttribute>

export type MdxJsxEl = MdxJsxFlowElement | MdxJsxTextElement
export type MdxJsxElChild = BlockContent | DefinitionContent | PhrasingContent

export const attrsToObj = (attrs: (MdxJsxAttribute | MdxJsxExpressionAttribute)[]) => {
  return attrs.reduce((acc: AttrMap, attr) => {
    if (attr.type === 'mdxJsxAttribute') acc[attr.name] = attr
    return acc
  }, {})
}

export const isMdxJsxEl = (el: MdxJsxElChild): el is MdxJsxEl => {
  return el.type === 'mdxJsxFlowElement' || el.type === 'mdxJsxTextElement'
}

// Check if element only has simple attributes like width={100}
// will return false if has expressionAttributes e.g. <Image {...props} />.
export const hasJsxAttributesOnly = (
  el: MdxJsxEl,
): el is MdxJsxEl & { attributes: MdxJsxAttribute[] } => {
  return el.attributes.every(({ type }) => type === 'mdxJsxAttribute')
}

// {`this is string flow expression`}
export const parseStringLiteralFlowExpression = (
  node: MdxFlowExpression | MdxTextExpression,
): string | null => {
  const body = node.data?.estree?.body
  if (
    body &&
    body.length === 1 &&
    body[0].type === 'ExpressionStatement' &&
    body[0].expression.type === 'Literal' &&
    typeof body[0].expression.value === 'string'
  ) {
    return body[0].expression.value
  }
  return null
}

// {`this is template literal flow expression`}
export const parseTemplateLiteralFlowExpression = (
  node: MdxFlowExpression | MdxTextExpression,
): string | null => {
  const body = node.data?.estree?.body
  if (
    body &&
    body.length === 1 &&
    body[0].type === 'ExpressionStatement' &&
    body[0].expression.type === 'TemplateLiteral' &&
    body[0].expression.quasis.length === 1 &&
    body[0].expression.quasis[0].type === 'TemplateElement' &&
    typeof body[0].expression.quasis[0].value.cooked === 'string'
  ) {
    return body[0].expression.quasis[0].value.cooked
  }
  return null
}

export const parseStringAttr = (imgAttrs: AttrMap, attrName: string) => {
  const attr = imgAttrs[attrName]
  if (!attr) {
    return null
  }
  const value = attr.value
  return typeof value === 'string' ? value : null
}

export const parseBooleanAttr = (imgAttrs: AttrMap, attrName: string) => {
  const attr = imgAttrs[attrName]
  if (!attr) {
    return null
  }
  const value = attr.value
  return (
    value == null ||
    (typeof value === 'string' && value === 'true') ||
    (typeof value === 'object' && value.value === 'true')
  )
}

export const parseNumberExpressionAttr = (attrs: AttrMap, attrName: string): number | null => {
  const attr = attrs[attrName]
  if (
    attr &&
    attr.value &&
    typeof attr.value === 'object' &&
    attr.value.type === 'mdxJsxAttributeValueExpression' &&
    attr.value.data?.estree?.body.length === 1 &&
    attr.value.data?.estree?.body[0].type === 'ExpressionStatement'
  ) {
    const expression = attr.value.data?.estree?.body[0].expression
    if (
      expression.type === 'Literal' &&
      expression.value != null &&
      typeof expression.value === 'number'
    ) {
      return expression.value
    }
  }
  return null
}

/**
 * Replaces a node in the parent's children array.
 * Common pattern used across all remark plugins.
 */
export const replaceNode = (parent: Parent | undefined, index: number | undefined, newNode: any) => {
  if (parent && index !== undefined) {
    parent.children.splice(index, 1, newNode)
  }
}

/**
 * Collects nodes matching a test for async processing.
 * Used when async operations (like code highlighting) are needed.
 */
export function collectNodesAsync<T>(
  tree: Root,
  test: Test,
): Array<{ node: T; index: number; parent: Parent }> {
  const nodes: Array<{ node: T; index: number; parent: Parent }> = []
  visit(tree, test, (node, index, parent) => {
    if (parent && typeof index === 'number') {
      nodes.push({ node: node as T, index, parent })
    }
  })
  return nodes
}

