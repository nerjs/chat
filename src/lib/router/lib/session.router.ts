import { AbstractRouterManager } from './abstract.router'
import { ILocation } from '../interfaces'
import { StorageHistory } from './storage.history'
import { getSessionStorage } from '../utils/get'

export class SessionRouterManager extends AbstractRouterManager {
  history: StorageHistory

  constructor(key: string, startUrl?: string, startState?: any) {
    super()
    this.history = new StorageHistory(this.lifecycle, getSessionStorage(), key, startUrl, startState)
  }

  protected getCurrentUrl(): string {
    return this.history.current.url
  }
  protected locationToString(location: ILocation): string {
    return location.toString()
  }
}
