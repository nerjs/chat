import { AbstractRouterManager } from './abstract.router'
import { BrowserHistory } from './browser.history'
import { IHistory, ILocation } from '../interfaces'
import { Location } from './location'
import { getLocation } from '../utils/get'

export class HashRouterManager extends AbstractRouterManager {
  history: IHistory = new BrowserHistory(this.lifecycle)
  #windowLocation = getLocation()

  protected getCurrentUrl(): string {
    return this.#windowLocation.hash
  }

  protected locationToString(location: ILocation): string {
    const loc = new Location(this.#windowLocation.pathname, this.#windowLocation.search, location.toString())
    return loc.toString()
  }
}
