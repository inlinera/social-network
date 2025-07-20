import { useEffect, useState } from 'react'

/**
 *
 * @param el Scroll Element
 * @param scrollHeight height that needs to be scrolled before opacity becomes equal to 1
 * @returns opacity of element
 * @returns scrollTop function
 */
export const useScroll = (el: HTMLElement | null, scrollHeight: number) => {
  const [opacity, setOpacity] = useState<number>(0)

  const scrollTop = () => {
    el?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleScroll = () => {
    const scrollTop = el?.scrollTop || 0
    const newOpacity = Math.min(scrollTop / scrollHeight, 1).toFixed(1)
    setOpacity(parseFloat(newOpacity))
  }

  useEffect(() => {
    el?.addEventListener('scroll', handleScroll)

    return () => {
      el?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return {
    opacity,
    scrollTop,
  }
}
