import { useCallback, useEffect, useState } from 'react'
import { IUser } from '../../interfaces/user.interface'
import { AuthBusData, AuthEmailInput, IAuthContext } from './interfaces'
import { noop } from '../../utils/noop'
import { useApiAuth } from '../api/auth/hook'
import { useSessionStore } from '../store.hook'
import { useMounted } from '../mounted.hook'
import { IN_LOADING, IS_AUTHORIZED, NOT_AUTHORIZED, NOT_LOADED, WORKER_ERROR_UNMOUNTED, WORKER_UNMOUNTED } from './messages'
import { useBus } from '../bus.hook'
import { AUTH_BUS_NAME } from './constants'

export const defaultContext: IAuthContext = {
  user: null,
  error: null,
  loading: false,
  loaded: false,
  registrationWithEmail: noop,
  loginWithEmail: noop,
  logout: noop,
}

export const useAuthWorker = (): IAuthContext => {
  const { loginByToken, registrationByEmail, loginByEmail, logout: apiLogout } = useApiAuth()
  const [accessToken, setAccessToken, removeAccessToken] = useSessionStore<string | null>('token:auth:current', null)
  const isMounted = useMounted()
  const authBus = useBus<AuthBusData>(AUTH_BUS_NAME)

  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const endLoading = useCallback(() => {
    if (!isMounted()) return
    setLoading(false)
    setLoaded(true)
  }, [])

  const resolveLoadHandler = useCallback(
    (auth: { accessToken: string; user: IUser }) => {
      if (!isMounted()) {
        console.warn(WORKER_UNMOUNTED)
        return
      }

      setAccessToken(auth.accessToken)
      setUser(auth.user)
      setError(null)
    },
    [setAccessToken],
  )

  const catchLoadHandler = useCallback(
    (err: Error) => {
      if (!isMounted()) {
        console.error(WORKER_ERROR_UNMOUNTED, err)
        return err
      }
      removeAccessToken()
      setUser(null)
      setError(err)
      return err
    },
    [removeAccessToken],
  )

  useEffect(() => {
    if (loading || loaded || user || !accessToken) return
    setLoading(true)
    setError(null)

    loginByToken({ accessToken }).then(resolveLoadHandler).catch(catchLoadHandler).finally(endLoading)
  }, [accessToken, user, loading, loaded, loginByToken, resolveLoadHandler, setAccessToken, catchLoadHandler])

  const checkCurrentAuth = useCallback(() => {
    if (loading) return new Error(IN_LOADING)
    if (user) {
      const err = new Error(IS_AUTHORIZED)
      endLoading()
      setError(err)
      return err
    }
  }, [loading, user])

  const registrationWithEmail = useCallback(
    async (input: AuthEmailInput) => {
      const startErr = checkCurrentAuth()
      if (startErr) return startErr

      setLoading(true)
      setError(null)
      try {
        const res = await registrationByEmail(input)
        resolveLoadHandler(res)
        authBus.publish({
          type: 'registration',
          user: res.user,
        })
        return res.user
      } catch (err) {
        catchLoadHandler(err as Error)
        return err as Error
      } finally {
        endLoading()
      }
    },
    [checkCurrentAuth, resolveLoadHandler, catchLoadHandler],
  )

  const loginWithEmail = useCallback(
    async (input: AuthEmailInput) => {
      const startErr = checkCurrentAuth()
      if (startErr) return startErr

      setLoading(true)
      setError(null)
      try {
        const res = await loginByEmail(input)
        resolveLoadHandler(res)
        authBus.publish({
          type: 'login',
          user: res.user,
        })
        return res.user
      } catch (err) {
        catchLoadHandler(err as Error)
        return err as Error
      } finally {
        endLoading()
      }
    },
    [checkCurrentAuth, resolveLoadHandler, catchLoadHandler],
  )

  const logout = useCallback(async () => {
    if (loading) return new Error(IN_LOADING)
    if (!loaded) return new Error(NOT_LOADED)
    if (!user) return new Error(NOT_AUTHORIZED)

    setLoading(true)
    removeAccessToken()
    setUser(null)

    try {
      await apiLogout()

      authBus.publish({
        type: 'logout',
        user: user,
      })
      return true
    } catch (err) {
      catchLoadHandler(err as Error)
      return err as Error
    } finally {
      endLoading()
    }
  }, [loading, loaded, user, removeAccessToken])

  return {
    loading,
    loaded,
    user,
    error,
    registrationWithEmail,
    loginWithEmail,
    logout,
  }
}
