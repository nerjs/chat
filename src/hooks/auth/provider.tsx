import { FC, PropsWithChildren } from 'react'
import { AuthContext } from './context'
import { useAuthWorker } from './worker.hook'

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const ctxValue = useAuthWorker()
  return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
}
