import { DocsLayout } from '@/components/docs-layout'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DocsLayout>{children}</DocsLayout>
}
