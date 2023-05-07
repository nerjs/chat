export type SubscribeHandler<T> = (data: T) => void
export type Unsubscribe = () => void
export type DebugErrorHandler = (error: unknown) => void

const warnDebugHandler: DebugErrorHandler = err => console.warn(err)

export class Bus<T = any> {
  private readonly handlers = new Set<SubscribeHandler<T>>()

  constructor(private readonly debugError: (err: any) => void = warnDebugHandler) {}

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
}
