import { Footer } from '@/components/navigation/footer'
import dhubDemo from '../../../public/img/dhub-demo.png'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Editor - Prose UI',
}

const Templates = () => {
  return (
    <div>
      <div className="mx-auto w-full max-w-[var(--site-width)] flex-1 items-center justify-between px-[var(--site-padding-x)]">
        <div className="prose-ui pb-8">
          <h1 className="mb-[var(--p-content-gap-cluster)] mt-[var(--p-content-gap-heading)] text-[length:var(--p-h1-font-size)] font-[var(--p-h1-font-weight)] leading-[var(--p-h1-line-height)] tracking-[var(--p-h1-letter-spacing)] text-[color:var(--p-h1-color)]">
            Editor
          </h1>
          <p className="text-color-low">
            Enable inline editing and collaboration for your MDX content.
          </p>
          <p className="mb-8">
            Prose UI MDX is fully supported by <Link href="https://dhub.dev">Dhub</Link> - a
            collaborative WYSIWYG editor for MDX content with direct GitHub publishing.
          </p>
          <a href="https://dhub.dev" target="_blank">
            <Image
              src={dhubDemo}
              alt="Screenshot of Dhub's WYSIWYG editor with Markdown preview open on the right side"
            />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Templates
