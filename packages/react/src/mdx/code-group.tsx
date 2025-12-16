'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { useState, useLayoutEffect, useMemo } from 'react'
import { CopyButton } from './components/copy-button.js'
import { HighlightedCodeBlockBody } from './code-block/highlighted-code-block-body.js'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '../ui/select.js'
import { langSync, getTabSync } from './sync.js'

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
  groupId?: string
  languages: LanguageOption[]
  tabs: CodeGroupTab[]
}

const EMPTY_CODE = ' '
const EMPTY_HIGHLIGHTED = '<pre class="shiki"><code><span class="line"> </span></code></pre>'

export const CodeGroup = ({ groupId, languages, tabs }: CodeGroupProps) => {
  const initialTab = tabs[0]?.title ?? ''
  const initialLang = languages[0]?.value ?? ''
  const tabTitles = useMemo(() => tabs.map((t) => t.title), [tabs])

  const [activeTab, setActiveTab] = useState(initialTab)
  const [selectedLang, setSelectedLang] = useState(initialLang)

  // After hydration, sync language from localStorage
  useLayoutEffect(() => {
    const stored = langSync.getStored()
    if (stored && languages.some((l) => l.value === stored)) {
      setSelectedLang(stored)
    }
  }, [languages])

  // Subscribe to language changes from other instances
  useLayoutEffect(() => {
    return langSync.subscribe((lang) => {
      if (languages.some((l) => l.value === lang)) {
        setSelectedLang(lang)
      }
    })
  }, [languages])

  // After hydration, sync tab from localStorage (only if groupId is set)
  useLayoutEffect(() => {
    if (!groupId) return
    const stored = getTabSync(groupId).getStored()
    if (stored && tabTitles.includes(stored)) {
      setActiveTab(stored)
    }
  }, [groupId, tabTitles])

  // Subscribe to tab changes from other instances (only if groupId is set)
  useLayoutEffect(() => {
    if (!groupId) return
    return getTabSync(groupId).subscribe((tab) => {
      if (tabTitles.includes(tab)) {
        setActiveTab(tab)
      }
    })
  }, [groupId, tabTitles])

  const handleLangChange = (lang: string) => {
    langSync.broadcast(lang)
  }

  const handleTabChange = (tab: string) => {
    if (groupId) {
      getTabSync(groupId).broadcast(tab)
    } else {
      setActiveTab(tab)
    }
  }

  const selectedLabel = languages.find((l) => l.value === selectedLang)?.label ?? selectedLang

  // Get the active variant for copy button
  const activeTabData = tabs.find((t) => t.title === activeTab)
  const activeVariant = activeTabData?.variants[selectedLang]
  const activeCode = activeVariant?.code ?? ''

  // Only show language selector if there are multiple languages
  const showLanguageSelector = languages.length > 1
  // Only show tabs if there are multiple tabs
  const showTabs = tabs.length > 1
  const singleTabTitle = tabs[0]?.title

  return (
    <Tabs.Root
      className="code-group"
      value={activeTab}
      onValueChange={handleTabChange}
    >
      <div className="code-group-header">
        {showTabs ? (
          <Tabs.List className="code-group-tabs-list">
            {tabs.map((tab) => (
              <Tabs.Trigger key={tab.title} className="code-group-tab-trigger" value={tab.title}>
                {tab.title}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        ) : (
          <div className="code-group-title">{singleTabTitle}</div>
        )}
        <div className="code-group-header-actions">
          {showLanguageSelector && (
            <Select value={selectedLang} onValueChange={handleLangChange}>
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
