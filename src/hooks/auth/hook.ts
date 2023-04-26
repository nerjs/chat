import { useContext } from 'react'
import { AuthContext } from './context'

export const useAuthContext = () => useContext(AuthContext)

export const useAuth = () => {
  const { user, ...authCtx } = useAuthContext()

  return [user, authCtx] as const
}
