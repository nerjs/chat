import { EffectCallback, useEffect, useRef } from 'react'
import debounce from 'debounce'

export const useDebouncedCallback = <T extends any[]>(
  handler: (...args: T) => void,
  wait: number,
  deps?: any[],
): ((...args: T) => void) => {
  const debRef = useRef(handler)

  useEffect(() => {
    debRef.current = debounce(handler, wait)
  }, [wait, ...(deps || [])])

  return debRef.current
}

export const useDebouncedEffect = (handler: EffectCallback, wait: number, deps?: any[]) => {
  const debHandler = useDebouncedCallback(handler, wait, deps)

  useEffect(() => debHandler(), deps || [])
}
