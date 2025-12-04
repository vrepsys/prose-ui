import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { TopNav } from '@/components/navigation/topnav'
import { GoogleAnalytics } from '@next/third-parties/google'

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
  title: 'Prose UI – Beautiful styling and components for Markdown prose',
  description:
    'An open source library of React components and customizable CSS styles for Markdown and MDX. Code blocks, callouts, math formulas, and polished typography included.',
  openGraph: {
    type: 'website',
    title: 'Beautiful styling and components for Markdown prose',
    description:
      'An open source library of React components and customizable CSS styles for Markdown and MDX. Code blocks, callouts, math formulas, and polished typography included.',
    url: 'https://prose-ui.com',
    images: [{ url: 'https://prose-ui.com/img/social.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vrepsys',
    title: 'Beautiful styling and components for Markdown prose',
    description:
      'An open source library of React components and customizable CSS styles for Markdown and MDX. Code blocks, callouts, math formulas, and polished typography included.',
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
      {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      <body className="bg-background min-h-screen font-sans antialiased">
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
