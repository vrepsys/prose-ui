import basicTemplate from '../../../public/img/template-basic.png'
import docsTemplate from '../../../public/img/template-docs.png'
import { TemplateCard } from '@/components/template-card/index'

const Templates = () => {
  return (
    <div className="mx-auto w-full max-w-[var(--site-width)] flex-1 items-center justify-between px-[var(--site-padding-x)]">
      <h1 className="mb-[var(--p-content-gap-cluster)] mt-[var(--p-content-gap-heading)] text-[length:var(--p-h1-font-size)] font-[var(--p-h1-font-weight)] leading-[var(--p-h1-line-height)] tracking-[var(--p-h1-letter-spacing)] text-[color:var(--p-h1-color)]">
        Templates
      </h1>
      <p>Slick templates for your life. Extra words here no AI suggestions.</p>

      <div className="mb-32 mt-[var(--p-content-gap-heading)] grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TemplateCard
          image={basicTemplate}
          title="Basic starter"
          description="Barebones starter template with Next.js 15, next/mdx, and Prose UI to render MDX content."
          previewUrl="https://prose-ui-basic-starter.vercel.app"
          sourceUrl="https://github.com/vrepsys/prose-ui-basic-starter"
        />
        <TemplateCard
          image={docsTemplate}
          title="Docs starter"
          description="Documenatation starter with Next.js 15, Tailwind CSS, Content collections, Dark theme, and Prose UI for content."
          previewUrl="https://prose-ui-docs-starter.vercel.app"
          sourceUrl="https://github.com/vrepsys/prose-ui-docs-starter"
        />
      </div>
    </div>
  )
}
export default Templates
