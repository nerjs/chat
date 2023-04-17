import { useCallback, useEffect, useRef } from 'react'

export const useMounted = () => {
  const ref = useRef(true)

  const isMounted = useCallback(() => !!ref.current, [])

  useEffect(() => {
    ref.current = true

    return () => {
      ref.current = false
    }
  }, [])

  return isMounted
}
