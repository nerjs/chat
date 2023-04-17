import { useContext } from 'react'
import { AuthContext } from './context'

export const useAuth = () => {
  const { user, loading, loaded, error, loginWithEmail, registrationWithEmail, logout } = useContext(AuthContext)

  return [user, { loading, loaded, error }, { registrationWithEmail, loginWithEmail, logout }] as const
}
