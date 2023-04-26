import { FC, PropsWithChildren } from 'react'
import { ApiContext } from './context'
import { useWorkerHook } from './worker.hook'

const ApiProvider: FC<PropsWithChildren> = ({ children }) => {
  const ctx = useWorkerHook()
  return <ApiContext.Provider value={ctx}>{children}</ApiContext.Provider>
}

export { ApiProvider }
