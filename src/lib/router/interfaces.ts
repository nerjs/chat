import { MixToType, Nullish } from '../../utils/types'
import { SubscribeHandler, Unsubscribe } from '../bus'
import { z } from 'zod'

export interface IState {
  referer?: ILocation
  [key: string]: any
}

export type RouterLifecycle = 'update' | 'destroy'

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

type IfVoidParams<P> = P extends void ? void | null : P
type IfVoidSearchParams<P> = null | (P extends Nullish ? void : Partial<P>)
type MergeParams<P, CP> = P extends void ? CP : CP extends void ? P : P & CP

export type SearchParamsSettings<T> =
  | boolean
  | Partial<T>
  | {
      $replace?: Partial<T>
    }
  | {
      $update?: Partial<T>
      $delete?: (keyof T)[]
      $ifNotExists?: Partial<T>
    }

export type IMatcherProps<
  Params extends z.ZodObject<any, any, any>,
  SearchParams extends z.ZodObject<any, any, any>,
  Parent extends IMatcher<any, any, any> | null = null,
> = {
  parent: Parent
  path: string
  params?: Params
  search?: SearchParams
  strict?: boolean
  debug?: (...args: any[]) => void
}

export type MatcherFromProps<
  Props extends IMatcherProps<any, any>,
  ParentParams,
  ParentSearchParams,
  Parent extends IMatcher<any, any, any> | null,
> = IMatcher<
  Props extends IMatcherProps<infer P, any>
    ? P extends z.ZodObject<any>
      ? MixToType<z.infer<P>, ParentParams>
      : ParentParams
    : ParentParams,
  Props extends IMatcherProps<any, infer S>
    ? S extends z.ZodObject<any>
      ? MixToType<z.infer<S>, ParentSearchParams>
      : ParentSearchParams
    : ParentSearchParams,
  Parent
>

export interface IMatcher<Params = void, SearchParams = void, Parent extends IMatcher<any, any, any> | null = null> {
  parent: Parent | null
  test(location: ILocation | string): boolean
  match(location: ILocation | string): Params | null
  to<State extends IState = any>(
    params: IfVoidParams<Params>,
    searchParams?: IfVoidSearchParams<SearchParams>,
    state?: State,
  ): ILocation<State>

  child<Props extends IMatcherProps<any, any>>(
    props: Props,
  ): MatcherFromProps<Props, Params, SearchParams, IMatcher<Params, SearchParams, Parent>>
  child<CParams = void, CSearchParams = void>(
    path: string,
  ): IMatcher<MergeParams<Params, CParams>, MergeParams<SearchParams, CSearchParams>, IMatcher<Params, SearchParams, Parent>>
}

type IfEmpty<T> = T extends Nullish ? {} : T
export type RecursiveParentParams<T extends IMatcher<any, any, any> | null> = T extends IMatcher<infer Params, any, infer Parent>
  ? IfEmpty<Params> & RecursiveParentParams<Parent>
  : {}
export type RecursiveParentSearchParams<T extends IMatcher<any, any, any> | null> = T extends IMatcher<
  any,
  infer SearchParams,
  infer Parent
>
  ? Partial<IfEmpty<SearchParams>> & RecursiveParentSearchParams<Parent>
  : {}

export type InferParams<T extends IMatcher<any, any, any>> = T extends IMatcher<infer Params, any, any> ? IfEmpty<Params> : {}
export type InferSearchParams<T extends IMatcher<any, any, any>> = T extends IMatcher<any, infer SearchParams, any>
  ? Partial<IfEmpty<SearchParams>>
  : {}

export interface IGlobalParams {}

export interface IRouterContext {
  currentName: string | null
  router: IRouterManager
  namedMapping?: Map<string, IRouterManager>
  prefix?: IMatcher | IMatcher[]
}
