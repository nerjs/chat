import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: none;
    outline: none;
    background: transparent;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  input {
    outline: none;
    border: none;
  }


  body {
    background-color: ${({ theme }) => theme.bc.body};
    font-size: ${({ theme }) => theme.text.size.primary};
    color: ${({ theme }) => theme.text.color.primary};
    width: 100vw;
    height: 100vh;
    min-width: 100vw;
    min-height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
  }
`

GlobalStyles.displayName = 'GlobalStyles'
