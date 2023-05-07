import { Bus, SubscribeHandler, Unsubscribe } from '../../bus'
import { IHistory, ILocation, IRouterManager, IState, RouterLifecycle } from '../interfaces'
import { Location } from './location'

export abstract class AbstractRouterManager implements IRouterManager {
  abstract readonly history: IHistory
  protected bus = new Bus<ILocation<any>>()
  protected lifecycle = new Bus<RouterLifecycle>()
  #location?: ILocation

  constructor() {
    console.log('constructor')
    const lifecycleUnsub = this.lifecycle.subscribe(event => {
      switch (event) {
        case 'destroy':
          lifecycleUnsub()
          break
        case 'update':
          const referLoc = this.location
          referLoc.state = { ...referLoc.state }
          if (referLoc.state && typeof referLoc.state === 'object' && 'referer' in referLoc.state) {
            delete referLoc.state.referer
          }
          this.#location = this.getCurrentLocation(referLoc)
          this.bus.publish(this.location)
          break
      }
    })
  }

  getCurrentLocation<State extends IState = IState>(referer?: ILocation): ILocation<State> {
    const state = referer
      ? {
          ...(this.history.state || {}),
          referer,
        }
      : this.history.state
    return Location.from(this.getCurrentUrl(), state)
  }

  get location() {
    if (!this.#location) this.#location = this.getCurrentLocation()
    return this.#location.clone()
  }

  protected abstract getCurrentUrl(): string
  protected abstract locationToString(location: ILocation): string

  push(location: ILocation<any>): void {
    return this.history.push(this.locationToString(location), location.state)
  }

  replace(location: ILocation<any>): void {
    return this.history.replace(this.locationToString(location), location.state)
  }

  subscribe<State extends IState = IState>(handler: SubscribeHandler<ILocation<State>>): Unsubscribe {
    return this.bus.subscribe(handler)
  }

  destroy(): void {
    this.lifecycle.publish('destroy')
  }
}
