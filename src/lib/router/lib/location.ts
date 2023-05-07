import { ILocation, IState } from '../interfaces'

export class Location<State extends IState = IState> implements ILocation<State> {
  #searchParams: URLSearchParams

  get searchParams() {
    return this.#searchParams
  }

  constructor(public pathname: string, search?: string, public hash: string = '', public state?: State) {
    this.#searchParams = new URLSearchParams(search)

    this.correctParams()
  }

  set search(value: string) {
    this.#searchParams = new URLSearchParams(value)
  }

  get search() {
    return this.#searchParams.toString()
  }

  private correctParams() {
    if (!this.pathname.startsWith('/')) this.pathname = `/${this.pathname}`
    if (this.hash.startsWith('#')) this.hash = this.hash.replace(/^\#/, '')
  }

  clone(): ILocation<State> {
    return new Location(this.pathname, this.search, this.hash, this.state)
  }

  toString(): string {
    this.correctParams()

    return `${this.pathname}${this.#searchParams.size ? `?${this.search}` : ''}${this.hash.length ? `#${this.hash}` : ''}`
  }

  static from<S extends IState = IState>(uri: string, state?: S): ILocation<S> {
    const url = new URL(uri, 'http://router.loc')

    return new Location<S>(url.pathname, url.search, url.hash, state)
  }
}
