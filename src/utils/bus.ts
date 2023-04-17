import { noop } from './noop'

export type SubscribeHandler<T> = (data: T) => void
type Unsubscribe = () => void

export class Bus<T = any> {
  private readonly handlers = new Set<SubscribeHandler<T>>()

  constructor(readonly name: string, private readonly debugError: (err: any) => void = noop) {}

  subscribe(handler: SubscribeHandler<T>): Unsubscribe {
    this.handlers.add(handler)

    return () => {
      this.handlers.delete(handler)
    }
  }

  publish(data: T) {
    const handlers = new Set(this.handlers)

    for (const handler of handlers) {
      try {
        handler(data)
      } catch (err) {
        this.debugError(err)
      }
    }
  }

  static busList = new Map<string, Bus<any>>()

  static create<T = any>(name: string, debugError?: (err: any) => void): Bus<T> {
    if (this.busList.has(name)) return this.busList.get(name) as Bus<T>

    const bus = new Bus<T>(name, debugError)
    this.busList.set(name, bus)
    return bus
  }
}
