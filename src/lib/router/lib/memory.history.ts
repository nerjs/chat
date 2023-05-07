import { Bus } from '../../bus'
import { IHistory, RouterLifecycle } from '../interfaces'

export interface MemoryHistoryItem<S = any> {
  url: string
  state?: S
}

export class MemoryHistory implements IHistory {
  protected list: MemoryHistoryItem[] = []
  protected currentIndex: number = 0

  scrollRestoration: ScrollRestoration = 'auto'

  constructor(protected readonly routerBus: Bus<RouterLifecycle>, startUrl: string, startState?: any) {
    this.list.push({ url: startUrl, state: startState })

    const destroyUnsub = this.routerBus.subscribe(event => {
      if (event === 'destroy') {
        destroyUnsub()
      }
    })
  }

  get length() {
    return this.list.length
  }

  get current() {
    return this.list[this.currentIndex]
  }

  get state() {
    return this.current.state
  }

  go(delta?: number): void {
    if (!delta) return
    this.currentIndex += delta
    if (this.currentIndex >= this.length) this.currentIndex = this.length - 1
    if (this.currentIndex < 0) this.currentIndex = 0
    this.routerBus.publish('update')
  }

  back(): void {
    return this.go(-1)
  }

  forward(): void {
    return this.go(1)
  }

  push(url: string, state?: any): void {
    this.list.splice(this.currentIndex + 1)
    this.list.push({ url, state })
    this.currentIndex = this.length - 1
    console.log(this)
    this.routerBus.publish('update')
  }

  replace(url: string, state?: any): void {
    this.list[this.currentIndex] = { url, state }
    this.routerBus.publish('update')
  }
}
