export const MEDIA_ABOVE_LARGE = 'min-width: 1024px' as const
const MEDIA_QUERIES: string[] = [MEDIA_ABOVE_LARGE]

export type DesignSpec<T> = {
  [K in keyof T]: T[K] extends CssValue
    ? string
    : DesignSpec<T[K]> & { [MEDIA_ABOVE_LARGE]?: Partial<DesignSpec<T[K]>> }
}

export type CssValue = CssVar | ColorValue
export type CssVar = `var(${string})`
export type ColorValue = `hsl(${CssVar})`

const camelToDash = (str: string): string => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
const cssVarName = (str: string): string => {
  let name = camelToDash(str)
  return name.endsWith('-base') ? name.slice(0, -5) : name
}

export const cssSystem = <T>(
  input: DesignSpec<T>,
  prefix: string,
  valueWrapper?: (value: CssVar) => ColorValue,
): T => {
  const transform = (obj: any, parentKey: string = ''): any => {
    const result: any = {}
    for (const key in obj) {
      if (MEDIA_QUERIES.includes(key)) return result // Skip media queries
      const newKey = `${parentKey}-${key}`
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = transform(obj[key], newKey)
      } else {
        let value: CssValue = `var(${cssVarName(newKey)})`
        if (valueWrapper) {
          value = valueWrapper(value)
        }
        result[key] = value
      }
    }
    return result
  }
  return transform(input, prefix)
}

export const cssVariables = <T>(spec: DesignSpec<T>, prefix: string) => {
  const result: Record<string, any> = {}
  const mediaQueries: Record<string, any> = {}

  const processValue = (value: any, path: string, mediaQuery?: string) => {
    if (typeof value === 'object' && value !== null) {
      for (const subKey in value) {
        if (MEDIA_QUERIES.includes(subKey)) {
          processValue(value[subKey], path, subKey)
        } else {
          processValue(value[subKey], `${path}-${subKey}`, mediaQuery)
        }
      }
    } else if (mediaQuery) {
      const mq = `@media (${mediaQuery})`
      mediaQueries[mq] = mediaQueries[mq] || {}
      mediaQueries[mq][cssVarName(path)] = value
    } else {
      result[cssVarName(path)] = value
    }
  }
  for (const key in spec) {
    processValue(spec[key], `${prefix}-${key}`)
  }

  return { ...result, ...mediaQueries }
}
