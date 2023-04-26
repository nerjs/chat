import { IApiContext } from './interface'

export const defaultContext: IApiContext = {
  type: 'none',
}

export const useWorkerHook = () => defaultContext
