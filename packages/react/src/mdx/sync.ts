// --- Sync infrastructure for tabs ---
// Shared between CodeGroup and Tabs components

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

// Global language sync (always active) - used by CodeGroup
export const langSync = createSyncStore('prose-ui-code-lang')

// Tab sync stores per groupId (created on demand) - used by both CodeGroup and Tabs
const tabSyncStores = new Map<string, ReturnType<typeof createSyncStore>>()

export function getTabSync(groupId: string) {
  let store = tabSyncStores.get(groupId)
  if (!store) {
    store = createSyncStore(`prose-ui-code-tab-${groupId}`)
    tabSyncStores.set(groupId, store)
  }
  return store
}

