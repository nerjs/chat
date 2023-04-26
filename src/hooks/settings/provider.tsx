import { FC, PropsWithChildren } from 'react'
import { useWorkerHook } from './worker.hook'
import { SettingsContext } from './context'

const ApiProvider: FC<PropsWithChildren> = ({ children }) => {
  const ctx = useWorkerHook()
  return <SettingsContext.Provider value={ctx}>{children}</SettingsContext.Provider>
}

export { ApiProvider }
