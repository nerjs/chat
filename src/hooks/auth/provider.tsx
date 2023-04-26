import { FC, PropsWithChildren } from 'react'
import { useWorkerHook } from './worker.hook'
import { AuthContext } from './context'

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const ctx = useWorkerHook()
  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>
}

export { AuthProvider }
