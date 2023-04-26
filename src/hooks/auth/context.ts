import { createContext } from 'react'
import { defaultContext } from './worker.hook'
import { IAuthContext } from './interface'

export const AuthContext = createContext<IAuthContext>(defaultContext)
