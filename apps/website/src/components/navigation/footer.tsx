import { Logo } from './logo'

export const Footer = () => (
  <div className="border-color-base text-color-lower fon-medium border-t">
    <div className="mx-auto grid w-full max-w-[var(--site-width)] grid-cols-1 gap-4 px-[var(--site-padding-x)] py-16">
      <div className="prose-ui flex items-center gap-1">
        <Logo />{' '}
        <p className="text-color-low !my-0">
          Created by <a href="#">Valdemaras</a>. Source code available on{' '}
          <a href="https://github.com/valdemaras/prose-ui">GitHub</a>.{' '}
        </p>
      </div>
    </div>
  </div>
)
