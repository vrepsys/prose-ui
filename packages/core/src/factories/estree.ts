import { MdxJsxAttributeValueExpressionData } from 'mdast-util-mdx-jsx'
import {
  ExpressionStatement,
  Program,
  Expression,
  ImportDeclaration,
  Identifier,
  Literal,
  Property,
  ObjectExpression,
  ArrayExpression,
} from 'estree'

export const estree = (
  body: Program['body'],
): MdxJsxAttributeValueExpressionData => {
  return {
    estree: {
      type: 'Program' as const,
      body,
      sourceType: 'module' as const,
    },
  }
}

export const expressionStatement = (
  expression: Expression,
): ExpressionStatement => {
  return {
    type: 'ExpressionStatement' as const,
    expression,
  }
}

export const identifierExpression = (name: string): Identifier => {
  return {
    type: 'Identifier' as const,
    name,
  }
}

export const literalExpression = (value: string | number | boolean): Literal => {
  return {
    type: 'Literal' as const,
    value,
  }
}

export const importDeclaration = (
  name: string,
  path: string,
): ImportDeclaration => {
  return {
    type: 'ImportDeclaration' as const,
    specifiers: [
      {
        type: 'ImportDefaultSpecifier' as const,
        local: identifierExpression(name),
      },
    ],
    source: literalExpression(path),
    attributes: [],
  }
}

/**
 * Create a property for an object expression.
 * Accepts either a primitive value or an Expression.
 */
export const property = (
  key: string,
  value: string | number | boolean | Expression,
): Property => {
  const valueExpr = typeof value === 'object' ? value : literalExpression(value)
  return {
    type: 'Property' as const,
    method: false,
    shorthand: false,
    computed: false,
    kind: 'init' as const,
    key: identifierExpression(key),
    value: valueExpr,
  }
}

/**
 * Create an object expression from properties.
 */
export const objectExpression = (properties: Property[]): ObjectExpression => {
  return {
    type: 'ObjectExpression' as const,
    properties,
  }
}

/**
 * Create an array expression from elements.
 */
export const arrayExpression = (elements: Expression[]): ArrayExpression => {
  return {
    type: 'ArrayExpression' as const,
    elements,
  }
}
