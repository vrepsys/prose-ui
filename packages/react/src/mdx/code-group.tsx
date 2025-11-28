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

// --- Sync infrastructure ---
type ChangeListener = (value: string) => void

function createSyncStore(storageKey: string) {
  const listeners = new Set<ChangeListener>()

  return {
    subscribe(listener: ChangeListener) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
    broadcast(value: string) {
      localStorage.setItem(storageKey, value)
      listeners.forEach((listener) => listener(value))
    },
    getStored(): string | null {
      if (typeof window === 'undefined') return null
      return localStorage.getItem(storageKey)
    },
  }
}

// Global language sync (always active)
const langSync = createSyncStore('prose-ui-code-lang')

// Tab sync stores per groupId (created on demand)
const tabSyncStores = new Map<string, ReturnType<typeof createSyncStore>>()

function getTabSync(groupId: string) {
  let store = tabSyncStores.get(groupId)
  if (!store) {
    store = createSyncStore(`prose-ui-code-tab-${groupId}`)
    tabSyncStores.set(groupId, store)
  }
  return store
}
// --- End sync infrastructure ---

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
      console.log('broadcasting tab', groupId, tab)
      getTabSync(groupId).broadcast(tab)
    } else {
        console.log('tab change without group id', groupId, tab)

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

  return (
    <Tabs.Root
      className="code-group"
      value={activeTab}
      onValueChange={handleTabChange}
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
