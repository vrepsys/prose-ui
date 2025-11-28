import { BlockContent, DefinitionContent, PhrasingContent } from 'mdast'
import { MdxFlowExpression } from 'mdast-util-mdx-expression'
import {
  MdxJsxAttribute,
  MdxJsxAttributeValueExpression,
  MdxJsxAttributeValueExpressionData,
  MdxJsxExpressionAttribute,
  MdxJsxFlowElement,
  MdxJsxTextElement,
} from 'mdast-util-mdx-jsx'

type MDXElementAttr = MdxJsxAttribute | MdxJsxExpressionAttribute

export const attr = (
  name: string,
  value?: string | MdxJsxAttributeValueExpression | null,
) => {
  return value !== undefined
    ? {
        type: 'mdxJsxAttribute' as const,
        name,
        value,
      }
    : undefined
}

export const attrValueExpression = (
  value: string,
  data?: MdxJsxAttributeValueExpressionData,
): MdxJsxAttributeValueExpression => {
  return {
    type: 'mdxJsxAttributeValueExpression' as const,
    value,
    data,
  }
}

export const flowExpression = (
  value: string,
  data?: MdxJsxAttributeValueExpressionData,
): MdxFlowExpression => {
  return {
    type: 'mdxFlowExpression' as const,
    value,
    data,
  }
}

export const paragaph = (text: string) => ({
  type: 'paragraph',
  children: [
    {
      type: 'text',
      value: text,
    },
  ],
})

export const textElement = (
  name: string,
  children: Array<PhrasingContent>,
  attrs?: Array<MDXElementAttr | undefined>,
): MdxJsxTextElement => {
  return {
    type: 'mdxJsxTextElement' as const,
    name,
    attributes:
      (attrs?.filter((attr) => !!attr) as Array<MDXElementAttr>) || {},
    children,
  }
}

export const flowElement = (
  name: string,
  children: Array<BlockContent | DefinitionContent>,
  attrs?: Array<MDXElementAttr | undefined>,
): MdxJsxFlowElement => {
  return {
    type: 'mdxJsxFlowElement' as const,
    name,
    attributes:
      (attrs?.filter((attr) => !!attr) as Array<MDXElementAttr>) || {},
    children,
  }
}

export const jsEsm = (
  value: string,
  data: MdxJsxAttributeValueExpressionData,
) => {
  return {
    type: 'mdxjsEsm' as const,
    value,
    data,
  }
}

// Import estree helpers for composite functions
import { estree, expressionStatement, literalExpression } from './estree.js'

/**
 * Creates an MDX attribute with a literal value expression.
 * Combines: attr + attrValueExpression + estree + expressionStatement + literalExpression
 */
export const literalAttr = (name: string, value: string | number | boolean) =>
  attr(
    name,
    attrValueExpression(
      JSON.stringify(value),
      estree([expressionStatement(literalExpression(value))]),
    ),
  )

/**
 * Creates an MDX flow expression with a literal string value.
 * Combines: flowExpression + estree + expressionStatement + literalExpression
 * Uses single quotes to match original MDX output format.
 */
export const literalFlowExpression = (value: string) =>
  flowExpression(
    `'${value}'`,
    estree([expressionStatement(literalExpression(value))]),
  )
