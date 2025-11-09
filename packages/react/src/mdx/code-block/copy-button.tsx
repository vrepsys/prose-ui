'use client'

import { Check, ClipboardCopy, Clipboard } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

export const CopyButton = ({ content }: { content: string }) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    if (!copied && timeoutRef.current === null) {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      timeoutRef.current = setTimeout(() => {
        setCopied(false)
        timeoutRef.current = null
      }, 3000)
    }
  }, [content, copied])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  if (copied) {
    return (
      <div className="copied-icon">
        <Check size={16} />
      </div>
    )
  }
  return (
    <button
      type="button"
      aria-label="Copy to clipboard"
      className="copy-button"
      onClick={handleCopy}
    >
      <div className="icon-wrapper">
        <Clipboard className="icon icon-default" size={16} />
        <ClipboardCopy className="icon icon-hover" size={16} />
      </div>
    </button>
  )
}
