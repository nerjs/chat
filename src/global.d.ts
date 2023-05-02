import { ITheme } from './ui/types'

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}

declare global {
  interface URLSearchParams {
    size: number
  }
}
