import { AbstractRouterManager } from './abstract.router'
import { BrowserHistory } from './browser.history'
import { IHistory, ILocation } from '../interfaces'
import { Location } from './location'
import { getLocation } from '../utils/get'

export class BrowserRouterManager extends AbstractRouterManager {
  history: IHistory = new BrowserHistory(this.lifecycle)
  #windowLocation = getLocation()

  protected getCurrentUrl(): string {
    const loc = new Location(this.#windowLocation.pathname, this.#windowLocation.search, this.#windowLocation.hash)
    return loc.toString()
  }

  protected locationToString(location: ILocation): string {
    return location.toString()
  }
}
