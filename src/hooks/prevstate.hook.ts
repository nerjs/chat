import { useEffect, useRef } from 'react'

export const usePrevState = <T = any>(state: T): T | null => {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    ref.current = state
  }, [state])

  return ref.current
}
