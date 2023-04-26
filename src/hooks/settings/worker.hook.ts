import { ISettingsContext } from './interface'

export const defaultContext: ISettingsContext = {
  settings: {},
}

export const useWorkerHook = () => defaultContext
