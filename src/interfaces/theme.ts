export type Color = string
export type Size = number | string

export interface ITheme {
  background: {
    body: Color
    primary: Color
    secondary: Color
  }
  text: {
    size: {
      primary: Size
      secondary: Size
    }
    color: {
      primary: Color
      secondary: Color
    }
  }
}
