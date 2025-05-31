import { useEffect, useState, RefObject } from 'react'

interface UseInViewportOptions {
  threshold?: number
  root?: Element | null
  rootMargin?: string
}

export const useInViewport = <T extends Element>(
  ref: RefObject<T>,
  options: UseInViewportOptions = {}
): boolean => {
  const [isInViewport, setIsInViewport] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting)
      },
      {
        threshold: options.threshold ?? 0,
        root: options.root ?? null,
        rootMargin: options.rootMargin ?? '0px',
      }
    )

    observer.observe(ref.current)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, options.threshold, options.root, options.rootMargin])

  return isInViewport
}
