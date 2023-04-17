import { FC, PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../ui/theme/defaultTheme'
import { GlobalStyles } from '../ui/GlobalStyles'

export const StyleProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}
