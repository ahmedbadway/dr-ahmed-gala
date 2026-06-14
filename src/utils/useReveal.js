import { useLayoutEffect, useRef } from 'react'

/**
 * Scroll-reveal that never hides content from no-JS clients, crawlers, or
 * users who prefer reduced motion. The hidden state is applied by JS only when
 * a reveal is actually possible, so the served markup stays fully visible.
 */
export function useReveal({ threshold = 0.12 } = {}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !('IntersectionObserver' in window)) {
      el.classList.add('is-revealed')
      return
    }

    // Only now—once JS confirms it can animate—do we hide the element.
    el.classList.add('reveal')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed')
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
