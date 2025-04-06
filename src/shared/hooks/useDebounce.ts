import { useCallback, useRef } from 'react'

export const useDebounce = (callback: (value: string) => void, delay: number) => {
  const debounceTimeout = useRef<number | null>(null)

  const debouncedCallback = useCallback(
    (value: string) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }

      debounceTimeout.current = setTimeout(() => {
        callback(value)
      }, delay) as unknown as number
    },
    [callback, delay]
  )

  return debouncedCallback
}
