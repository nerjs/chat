import { IUser } from '../../interfaces/user.interface'
import { ApiAuthEmailInput } from '../api/auth/interfaces'

export interface AuthEmailInput extends ApiAuthEmailInput {}

export interface IAuthContext {
  user: IUser | null
  error: Error | null
  loading: boolean
  loaded: boolean
  registrationWithEmail: (auth: AuthEmailInput) => Promise<IUser | Error>
  loginWithEmail: (auth: AuthEmailInput) => Promise<IUser | Error>
  logout: () => Promise<true | Error>
}

export type AuthBusData = {
  type: 'registration' | 'login' | 'logout'
  user: IUser
}
