export type Booleanish = boolean | 'true' | 'false' | undefined

export const parseBoolean = (value: Booleanish) => {
  if (typeof value === 'string') {
    if (!value.length) return true
    return value.toLowerCase() === 'true'
  }
  return Boolean(value)
}
