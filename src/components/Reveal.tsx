import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger delay in ms, applied via transition-delay. */
  delay?: number
}

/**
 * Soft one-shot reveal: the content fades and rises once, the first time it
 * enters the viewport. No parallax, no repeat, no scroll-jacking — and the
 * global `prefers-reduced-motion` kill switch in index.css turns the whole
 * thing off (content is simply visible, never hidden).
 *
 * The observer disconnects after the first intersection, so scrolling back up
 * never re-triggers the animation.
 */
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  // Browsers without IntersectionObserver (or reduced-motion users) must see
  // the content immediately, so the check seeds the initial state instead of
  // firing inside an effect.
  const [shown, setShown] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const node = ref.current
    if (!node || shown) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [shown])

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? 'reveal-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
