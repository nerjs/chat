import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: transparent;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }


  body {
    background-color: ${({ theme }) => theme.background.body};
    font-size: ${({ theme }) => theme.text.size.primary};
    color: ${({ theme }) => theme.text.color.primary};
  }
`

GlobalStyles.displayName = 'GlobalStyles'
