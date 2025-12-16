'use client'

import * as RadixTabs from '@radix-ui/react-tabs'
import { useState, useLayoutEffect, ReactNode } from 'react'
import { getTabSync } from './sync.js'

// --- Tab component ---
export type TabProps = {
  value: string
  children: ReactNode
}

export function Tab({ value, children }: TabProps) {
  return (
    <RadixTabs.Content className="tab-content" value={value}>
      {children}
    </RadixTabs.Content>
  )
}

// --- Tabs component ---
export type TabsProps = {
  groupId?: string
  /** Tab values - auto-populated by remark plugin if not provided */
  items?: string[]
  children: ReactNode
}

export function Tabs({ groupId, items = [], children }: TabsProps) {
  const initialTab = items[0] ?? ''
  const [activeTab, setActiveTab] = useState(initialTab)

  // Update active tab when items change and current selection is invalid
  useLayoutEffect(() => {
    if (items.length > 0 && !items.includes(activeTab)) {
      setActiveTab(items[0])
    }
  }, [items, activeTab])

  // After hydration, sync tab from other instances (only if groupId is set)
  useLayoutEffect(() => {
    if (!groupId) return
    const stored = getTabSync(groupId).getStored()
    if (stored && items.includes(stored)) {
      setActiveTab(stored)
    }
  }, [groupId, items])

  // Subscribe to tab changes from other instances (only if groupId is set)
  useLayoutEffect(() => {
    if (!groupId) return
    return getTabSync(groupId).subscribe((tab) => {
      if (items.includes(tab)) {
        setActiveTab(tab)
      }
    })
  }, [groupId, items])

  const handleTabChange = (tab: string) => {
    if (groupId) {
      getTabSync(groupId).broadcast(tab)
    } else {
      setActiveTab(tab)
    }
  }

  return (
    <RadixTabs.Root
      className="tabs"
      value={activeTab}
      onValueChange={handleTabChange}
    >
      <div className="tabs-header">
        <RadixTabs.List className="tabs-list">
          {items.map((value) => (
            <RadixTabs.Trigger key={value} className="tab-trigger" value={value}>
              {value}
            </RadixTabs.Trigger>
          ))}
        </RadixTabs.List>
      </div>
      {children}
    </RadixTabs.Root>
  )
}
