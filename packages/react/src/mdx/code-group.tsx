'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { useState } from 'react'
import { CopyButton } from './components/copy-button.js'
import { HighlightedCodeBlockBody } from './code-block/highlighted-code-block-body.js'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '../ui/select.js'

type CodeVariant = {
  code: string
  highlightedCode: string
  showLineNumbers?: boolean
}

export type CodeGroupTab = {
  title: string
  variants: Record<string, CodeVariant>
}

export type LanguageOption = {
  value: string
  label: string
}

export type CodeGroupProps = {
  languages: LanguageOption[]
  tabs: CodeGroupTab[]
}

const EMPTY_CODE = ' '
const EMPTY_HIGHLIGHTED = '<pre class="shiki"><code><span class="line"> </span></code></pre>'

export const CodeGroup = ({ languages, tabs }: CodeGroupProps) => {
  const initialTab = tabs[0]?.title ?? ''
  const initialLang = languages[0]?.value ?? ''

  const [activeTab, setActiveTab] = useState(initialTab)
  const [selectedLang, setSelectedLang] = useState(initialLang)

  const selectedLabel = languages.find((l) => l.value === selectedLang)?.label ?? selectedLang

  // Get the active variant for copy button
  const activeTabData = tabs.find((t) => t.title === activeTab)
  const activeVariant = activeTabData?.variants[selectedLang]
  const activeCode = activeVariant?.code ?? ''

  // Only show language selector if there are multiple languages
  const showLanguageSelector = languages.length > 1

  return (
    <Tabs.Root
      className="code-group"
      defaultValue={initialTab}
      onValueChange={setActiveTab}
    >
      <div className="header">
        <Tabs.List className="tabs-list">
          {tabs.map((tab) => (
            <Tabs.Trigger key={tab.title} className="tab-trigger" value={tab.title}>
              {tab.title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div className="header-actions">
          {showLanguageSelector && (
            <Select value={selectedLang} onValueChange={setSelectedLang}>
              <SelectTrigger size="sm">
                {selectedLabel}
              </SelectTrigger>
              <SelectContent>
                {languages.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <CopyButton content={activeCode} />
        </div>
      </div>
      {tabs.map((tab) => {
        const variant = tab.variants[selectedLang]
        return (
          <Tabs.Content key={tab.title} value={tab.title}>
            <HighlightedCodeBlockBody
              code={variant?.code ?? EMPTY_CODE}
              highlightedCode={variant?.highlightedCode ?? EMPTY_HIGHLIGHTED}
              showLineNumbers={variant?.showLineNumbers}
              showCopyButton={false}
            />
          </Tabs.Content>
        )
      })}
    </Tabs.Root>
  )
}
