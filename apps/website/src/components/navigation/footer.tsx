import { Logo } from './logo'

export const Footer = () => (
  <div className="border-color-base border-t">
    <div className="mx-auto grid w-full max-w-(--site-width) grid-cols-1 gap-4 px-(--site-padding-x) py-16">
      <div className="flex items-center gap-4 md:gap-1">
        <Logo />{' '}
        <p className="text-color-lowest my-0! text-sm font-medium">
          Created by{' '}
          <a
            className="text-color-low hover:text-color-base underline decoration-[hsl(var(--p-color-text-lowest))] underline-offset-4 hover:decoration-[hsl(var(--p-color-text-base))]"
            href="https://x.com/vrepsys"
          >
            Valdemaras
          </a>
          , designed by{' '}
          <a
            className="text-color-low hover:text-color-base underline decoration-[hsl(var(--p-color-text-lowest))] underline-offset-4 hover:decoration-[hsl(var(--p-color-text-base))]"
            href="https://domasmark.us"
          >
            Domas
          </a>
          . Source code available on{' '}
          <a
            className="text-color-low hover:text-color-base underline decoration-[hsl(var(--p-color-text-lowest))] underline-offset-4 hover:decoration-[hsl(var(--p-color-text-base))]"
            href="https://github.com/vrepsys/prose-ui"
          >
            GitHub
          </a>
          .{' '}
        </p>
      </div>
    </div>
  </div>
)
