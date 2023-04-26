import { useEffect, useState } from 'react'

type EventHandler<E> = (event: E) => void | (() => void)

interface WithEE {
  addEventListener(trigger: string, handler: EventHandler<any>, capture?: boolean): void
  removeEventListener(trigger: string, handler: EventHandler<any>): void
}

export const useBrowserEvent = <K extends string, V>(
  eventObject: WithEE,
  trigger: K,
  handler: EventHandler<V>,
  deps?: any[],
  capture?: boolean,
) => {
  useEffect(() => {
    let unsubscribe = () => {}
    const subscribeHandler: EventHandler<V> = event => {
      const unsub = handler(event)
      if (unsub) unsubscribe = unsub
    }

    eventObject.addEventListener(trigger, subscribeHandler, capture)

    return () => {
      eventObject.removeEventListener(trigger, subscribeHandler)
      unsubscribe()
    }
  }, [trigger, ...(deps || [])])
}

export const useWindowEvent = <K extends keyof WindowEventMap>(
  trigger: K,
  handler: EventHandler<WindowEventMap[K]>,
  deps?: any[],
  capture?: boolean,
) => useBrowserEvent<K, WindowEventMap[K]>(window, trigger, handler, deps, capture)

export const useDocumentEvent = <K extends keyof DocumentEventMap>(
  trigger: K,
  handler: EventHandler<DocumentEventMap[K]>,
  deps?: any[],
  capture?: boolean,
) => useBrowserEvent<K, DocumentEventMap[K]>(document, trigger, handler, deps, capture)

const getCurrentRect = () => [window.innerWidth, window.innerHeight]
export const useCurrentRect = () => {
  const [sizes, setSizes] = useState<[width: number, height: number]>([0, 0])

  useWindowEvent('resize', () => {
    const current = getCurrentRect()
    setSizes(prev => {
      if (prev[0] === current[0] && prev[1] === current[1]) return prev
      return [current[0], current[1]]
    })
  })

  useEffect(() => {
    const current = getCurrentRect()
    setSizes(prev => {
      if (prev[0] === current[0] && prev[1] === current[1]) return prev
      return [current[0], current[1]]
    })
  }, [])

  return sizes
}
