import { noop } from '../../utils/noop'
import { AuthStatus, IAuthContext } from './interface'

export const defaultContext: IAuthContext = {
  user: null,
  error: null,
  loading: false,
  loaded: false,
  status: AuthStatus.WAIT,
  create: noop,
  logIn: noop,
  logOut: noop,
}

export const useWorkerHook = () => defaultContext
