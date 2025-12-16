import { Footer } from '@/components/navigation/footer'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Editor - Prose UI',
}

const Editor = () => {
  return (
    <div>
      <div className="mx-auto w-full max-w-(--site-width) flex-1 items-center justify-between px-(--site-padding-x)">
        <div className="prose-ui bg-background pb-8">
          <h1 className="mb-(--p-content-gap-cluster) mt-(--p-content-gap-heading) text-(length:--p-h1-font-size) font-(--p-h1-font-weight) leading-(--p-h1-line-height) tracking-(--p-h1-letter-spacing) text-(--p-h1-color)">
            Visual Editor
          </h1>
          <p className="text-color-low max-w-2xl">
            Prose UI handles the presentation—components, typography, code blocks. For the writing side, there's Dhub.
          </p>
          <p className="max-w-2xl">
            <Link href="https://dhub.dev">Dhub</Link> is a CMS for technical documentation with Notion-like Markdown
            editing. It commits directly to GitHub—you keep your Git workflow, no lock-in.
          </p>
          <p className="mb-8 mt-4 max-w-2xl text-color-low">Here's what it looks like:</p>
          <a
            href="https://dhub.dev"
            target="_blank"
            className="no-prose block aspect-video overflow-hidden rounded-lg border no-underline"
          >
            <video
              src="https://media.dhub.dev/media/dhub-video-4k.1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="block w-full max-w-full object-contain"
            />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Editor
