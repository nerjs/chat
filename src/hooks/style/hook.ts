import { useTheme } from 'styled-components'

export const useStyle = () => {
  const theme = useTheme()

  return [theme] as const
}
