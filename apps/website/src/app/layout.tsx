import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { TopNav } from '@/components/navigation/topnav'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Prose UI',
  description:
    'Refined typography and components for rendering MDX content in Next.js. Free and open-source.',
  openGraph: {
    type: 'website',
    title: 'Prose UI',
    description:
      'Refined typography and components for rendering MDX content in Next.js. Free and open-source.',
    url: 'https://prose-ui.com',
    images: [{ url: 'https://prose-ui.com/img/social.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vrepsys',
    title: 'Prose UI',
    description:
      'Refined typography and components for rendering MDX content in Next.js. Free and open-source.',
    images: ['https://prose-ui.com/img/social.png'],
  },
  icons: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/favicon-dark.svg',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/favicon-light.svg',
      media: '(prefers-color-scheme: dark)',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-color-base min-h-screen font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <>
            <TopNav />
            {children}
          </>
        </ThemeProvider>
      </body>
    </html>
  )
}
