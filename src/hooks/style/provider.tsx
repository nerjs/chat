import { FC, PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components/macro'
import { defaultTheme } from '../../ui/theme/defaultTheme'
import { GlobalStyles } from '../../ui/GlobalStyles'

const StyleProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export { StyleProvider }
