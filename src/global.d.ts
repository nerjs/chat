import { ITheme } from './interfaces/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
