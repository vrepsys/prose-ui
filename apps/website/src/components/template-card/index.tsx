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
      className="border-color-base hover:border-color-accent-base bg-color-low hover:bg-color-low/95 group flex cursor-pointer flex-col overflow-hidden rounded-lg border transition duration-100"
    >
      <div className="border-b-color-base w-full border-b">
        <Image alt="Template preview" src={image} />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-color-high text-xl font-bold tracking-tight">{title}</h3>
          <div className="text-color-low text-sm tracking-wide">{description}</div>
        </div>
        <div className="flex justify-end gap-3">
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
    </div>
  )
}
