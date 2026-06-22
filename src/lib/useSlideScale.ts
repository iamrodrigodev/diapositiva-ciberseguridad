import { useState, useEffect } from 'react'

/** Base design resolution — all slides are authored at this size */
export const SLIDE_BASE_W = 1280
export const SLIDE_BASE_H = 720

/**
 * Fixed chrome height: 2px progress bar + 40px bottom nav.
 * Must stay in sync with App.tsx layout.
 */
const CHROME_H = 42

function computeScale(w: number, h: number): number {
  const availW = w
  const availH = h - CHROME_H
  return Math.min(availW / SLIDE_BASE_W, availH / SLIDE_BASE_H)
}

export function useSlideScale(): number {
  const [scale, setScale] = useState<number>(() =>
    computeScale(window.innerWidth, window.innerHeight)
  )

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const { width, height } = entry.contentRect
      setScale(computeScale(width, height))
    })
    observer.observe(document.documentElement)
    return () => observer.disconnect()
  }, [])

  return scale
}
