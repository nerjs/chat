import { useContext } from 'react'
import { SettingsContext } from './context'
export const useSettingsContext = () => useContext(SettingsContext)

export const useSettings = () => {
  const { settings, ...settingsCtx } = useSettingsContext()
  return [settings, settingsCtx] as const
}
