import { createContext } from 'react'
import { defaultContext } from './worker.hook'
import { ISettingsContext } from './interface'

export const SettingsContext = createContext<ISettingsContext>(defaultContext)
