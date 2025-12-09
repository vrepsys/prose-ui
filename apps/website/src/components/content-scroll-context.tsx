'use client'

import { createContext, useContext, RefObject } from 'react'

const ContentScrollContext = createContext<RefObject<HTMLDivElement | null> | null>(null)

export const ContentScrollProvider = ContentScrollContext.Provider
export const useContentScroll = () => useContext(ContentScrollContext)
