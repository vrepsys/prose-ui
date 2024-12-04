export const pathToUrl = ({ path, root }: { path: string; root: string }) => {
  let url = path.replace(root, '')
  if (url.endsWith('/')) {
    url = url.slice(0, -1)
  }
  url = url.replace(/\.mdx$/, '')
  if (url && !url.startsWith('/')) {
    url = '/' + url
  }

  return url || '/'
}
