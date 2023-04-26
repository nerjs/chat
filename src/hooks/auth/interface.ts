import { IUser } from '../../interfaces/user.interface'
import { MaybePromise } from '../../utils/types'

export enum AuthStatus {
  WAIT,
  AUTHORIZED,
  NON_AUTHORIZED,
  ERROR,
}

export interface IAuthContext {
  user: IUser | null
  loading: boolean
  loaded: boolean
  status: AuthStatus
  error: Error | null
  create: (username: string) => MaybePromise<IUser>
  logIn: (username: string) => MaybePromise<IUser>
  logOut: () => MaybePromise<boolean>
}
