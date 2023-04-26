import { createContext } from 'react'
import { IApiContext } from './interface'
import { defaultContext } from './worker.hook'

export const ApiContext = createContext<IApiContext>(defaultContext)
