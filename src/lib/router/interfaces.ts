import { SubscribeHandler, Unsubscribe } from '../bus'

export interface IState {
  referer?: ILocation
}

export interface ILocation<State extends IState = IState> {
  pathname: string
  search: string
  hash: string
  readonly searchParams: URLSearchParams
  state?: State

  clone(): ILocation<State>
  toString(): string
}

export interface IHistory {
  readonly length: number
  scrollRestoration: ScrollRestoration
  readonly state: any
  back(): void
  forward(): void
  go(delta?: number): void
  push(url: string, state?: any): void
  replace(url: string, state?: any): void
}

export interface IRouterManager {
  readonly location: ILocation
  readonly history: IHistory
  push(location: ILocation): void
  replace(location: ILocation): void
  subscribe<State extends IState = IState>(handler: SubscribeHandler<ILocation<State>>): Unsubscribe
  destroy(): void
}

export interface IMatcher<Params = any> {
  test(location: ILocation | string): boolean
  match(location: ILocation | string): Params | null
  create(params: Params): ILocation
  toLocation(): ILocation
  toString(): string
}

export type RouterLifecycle = 'update' | 'destroy'

export interface IRouterContext {
  currentName: string | null
  router: IRouterManager
  namedMapping?: Map<string, IRouterManager>
  prefix?: IMatcher | IMatcher[]
}
