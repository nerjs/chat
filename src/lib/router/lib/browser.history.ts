import { Bus } from '../../bus'
import { IHistory, RouterLifecycle } from '../interfaces'
import { getHistory, getWindow } from '../utils/get'

export class BrowserHistory implements IHistory {
  private readonly history = getHistory()
  constructor(protected readonly routerBus: Bus<RouterLifecycle>) {
    const onPopstate = () => {
      this.routerBus.publish('update')
    }

    const window = getWindow()

    const destroyUnsub = this.routerBus.subscribe(event => {
      if (event === 'destroy') {
        window.removeEventListener('popstate', onPopstate)
        destroyUnsub()
      }
    })

    window.addEventListener('popstate', onPopstate)
  }

  get length() {
    return this.history.length
  }

  get scrollRestoration() {
    return this.history.scrollRestoration
  }

  get state() {
    return this.history.state
  }

  back(): void {
    return this.history.back()
  }

  forward(): void {
    return this.history.forward()
  }

  go(delta?: number): void {
    return this.go(delta)
  }

  push(url: string, state?: any): void {
    this.history.pushState(state, '', url)
    this.routerBus.publish('update')
  }
  replace(url: string, state?: any): void {
    this.history.replaceState(state, '', url)
    this.routerBus.publish('update')
  }
}
