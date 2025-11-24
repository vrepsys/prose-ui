import { MdxJsxAttributeValueExpressionData } from 'mdast-util-mdx-jsx'
import {
  ExpressionStatement,
  Program,
  Expression,
  ImportDeclaration,
  Identifier,
  Literal,
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
