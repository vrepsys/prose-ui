import Link from 'next/link'

const SVG = ({ className }: { className: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 4C11 3.44772 11.4477 3 12 3H17C19.2091 3 21 4.79086 21 7V8C21 10.2091 19.2091 12 17 12H12C11.4477 12 11 11.5523 11 11V4Z"
      fill="currentColor"
    />
    <path
      d="M3 4C3 3.44772 3.44772 3 4 3H9C9.55228 3 10 3.44772 10 4V20C10 20.5523 9.55228 21 9 21H4C3.44772 21 3 20.5523 3 20V4Z"
      fill="currentColor"
    />
    <rect x="11" y="13" width="10" height="8" rx="1" fill="currentColor" />
  </svg>
)

export const Logo = ({
  showText,
  href,
  onClick,
}: {
  showText?: boolean
  href?: string
  onClick?: () => void
}) => {
  if (!showText) {
    return <SVG className="text-color-accent-base" />
  }
  return href ? (
    <Link
      onClick={onClick}
      href={href}
      className="flex items-center gap-1 text-nowrap font-semibold cursor-pointer"
    >
      <SVG className="mr-0.5" />
      Prose UI
    </Link>
  ) : (
    <div className="flex items-center gap-1 text-nowrap font-semibold">
      <SVG className="mr-0.5" />
      Prose UI
    </div>
  )
}
