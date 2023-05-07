import { AbstractRouterManager } from './abstract.router'
import { ILocation, IState } from '../interfaces'
import { MemoryHistory } from './memory.history'

export class MemoryRouterManager extends AbstractRouterManager {
  history: MemoryHistory

  constructor(startUrl: string, startState?: any) {
    super()
    this.history = new MemoryHistory(this.lifecycle, startUrl, startState)
  }

  protected getCurrentUrl(): string {
    return this.history.current.url
  }
  protected locationToString(location: ILocation<IState>): string {
    return location.toString()
  }
}
