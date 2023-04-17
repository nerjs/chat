import { useEffect, useMemo } from 'react'
import { Bus, SubscribeHandler } from '../utils/bus'

export const useBus = <T = any>(name: string) => {
  const bus = useMemo(() => Bus.create<T>(name), [name])

  return bus
}

export const useBusEffect = <T = any>(name: string, handler: SubscribeHandler<T>, deps?: any[]) => {
  const bus = useBus(name)

  useEffect(() => {
    const unsub = bus.subscribe(handler)
    return unsub
  }, [bus, handler, ...(deps || [])])
}
