import { createContext } from 'react'
import { defaultContext } from './worker.hook'
import { IAuthContext } from './interfaces'

export const AuthContext = createContext<IAuthContext>(defaultContext)
