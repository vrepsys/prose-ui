'use client'

import { SiGithub } from '@icons-pack/react-simple-icons'
import { ArrowRightIcon } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {
  image: StaticImageData
  title: string
  description: string
  previewUrl: string
  sourceUrl: string
}

export const TemplateCard = ({ image, title, description, previewUrl, sourceUrl }: Props) => {
  return (
    <div
      onClick={() => {
        window.open(previewUrl)
      }}
      className="bg-color-low/50 border-color-base hover:border-color-accent-low group flex cursor-pointer flex-col overflow-hidden rounded-lg border transition duration-100"
    >
      <div className="flex flex-1 flex-col justify-between gap-7 px-9 py-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-color-high text-2xl font-medium">{title}</h2>
          <div className="text-color-low tracking-wide">{description}</div>
        </div>
        <div className="flex justify-start gap-3">
          <Button variant="secondary" asChild>
            <Link
              href={sourceUrl}
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="group flex items-center gap-1 text-sm"
            >
              <SiGithub size={16} />
              <span className="">Source</span>
            </Link>
          </Button>
          <Button variant="reactive" asChild>
            <Link
              href={previewUrl}
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="group flex items-center gap-1 text-sm"
            >
              <span className="">Preview</span>
              <ArrowRightIcon size={16} />
            </Link>
          </Button>
        </div>
      </div>
      <div className="relative w-full px-2 pb-2">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[hsl(var(--p-color-bg))]" /> */}
        <Image alt="Template preview" className="rounded" src={image} />
      </div>
    </div>
  )
}
