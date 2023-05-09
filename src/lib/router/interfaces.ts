import { ClearMaybeObject, Nullish } from '../../utils/types'
import * as yup from 'yup'
import { SubscribeHandler, Unsubscribe } from '../bus'

export interface IState {
  referer?: ILocation
  [key: string]: any
}

export type RouterLifecycle = 'update' | 'destroy'

export interface ILocation<State = any> {
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

export type AllowedParams = Record<string, any> | null | undefined

type NullishToVoid<T = any> = T extends Nullish ? null | void : T
type NullishToEmpty<T = any> = T extends Nullish ? Record<string, any> : T
type PrepareSearch<T> = Partial<NullishToEmpty<T>> & Record<string, any>

export type MergeTwoObjects<T1, T2> = T1 extends Record<string, any>
  ? T2 extends Record<string, any>
    ? T1 & T2
    : T1
  : T2 extends Record<string, any>
  ? T2
  : {}

/**
 * @description Fixed typescript error: Type instantiation is excessively deep and possibly infinite.ts(2589)
 * @see https://copyprogramming.com/howto/why-am-i-getting-type-instantiation-is-excessively-deep-and-possibly-infinite
 */
type Depth = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
export type MergeParamsWithParent<P extends AllowedParams, PR extends IMatcher | null, D extends Depth[number] = 9> = PR extends IMatcher<
  infer CP,
  any,
  infer CPR
>
  ? [D] extends [never]
    ? never
    : MergeParamsWithParent<MergeTwoObjects<P, CP>, CPR, Depth[D]>
  : MergeTwoObjects<{}, P>

export type MergeSearchParamsWithParent<
  P extends AllowedParams,
  PR extends IMatcher | null,
  D extends Depth[number] = 9,
> = PR extends IMatcher<any, infer CP, infer CPR>
  ? [D] extends [never]
    ? never
    : MergeSearchParamsWithParent<P extends Nullish ? CP : CP extends Nullish ? P : P & CP, CPR>
  : NullishToVoid<P>

export type IMatcherProps<P extends AllowedParams, S extends AllowedParams> = {
  path: string
  paramsValidator?: P extends Nullish ? never : yup.ObjectSchema<P>
  searchParamsValidator?: S extends Nullish ? never : yup.ObjectSchema<S>
}

export type ModifySearchSchema<S, K = keyof S> = {
  $replace?: S
  $update?: S
  $delete?: K[]
  $push?: S
  $defaults?: S
}

export type ModifySearch<S> = boolean | S | ModifySearchSchema<S>

export interface IMatcher<
  P extends AllowedParams = undefined,
  S extends AllowedParams = undefined,
  PR extends IMatcher<any, any, any> | null = null,
> {
  readonly parent: PR
  test(location: ILocation): boolean
  match(location: ILocation): NullishToEmpty<MergeParamsWithParent<P, PR>> | null

  toSearch(search: PrepareSearch<MergeSearchParamsWithParent<S, PR>>): URLSearchParams
  toSearch(searchParams: URLSearchParams, search: ModifySearch<PrepareSearch<MergeSearchParamsWithParent<S, PR>>>): URLSearchParams

  to<St = any>(
    params: ClearMaybeObject<MergeParamsWithParent<P, PR>>,
    search?: PrepareSearch<MergeSearchParamsWithParent<S, PR>>,
    state?: St,
  ): ILocation<St>
  to<St = any>(
    searchParams: URLSearchParams,
    params: ClearMaybeObject<MergeParamsWithParent<P, PR>>,
    search?: ModifySearch<Partial<NullishToEmpty<MergeSearchParamsWithParent<S, PR>>>>,
    state?: St,
  ): ILocation<St>

  child<CP extends AllowedParams = undefined, CS extends AllowedParams = undefined>(path: string): IMatcher<CP, CS, IMatcher<P, S, PR>>
  child<CP extends AllowedParams = undefined, CS extends AllowedParams = undefined>(
    props: IMatcherProps<CP, CS>,
  ): IMatcher<CP, CS, IMatcher<P, S, PR>>
}

export interface IGlobalParams {}

export interface IRouterContext {
  currentName: string | null
  router: IRouterManager
  namedMapping?: Map<string, IRouterManager>
  prefix?: IMatcher | IMatcher[]
}
