export const noop = (): any => {}

export const cnoop =
  <T>(value: T) =>
  (): T =>
    value

export const enoop = () => {
  throw new Error('The stub function is used. This function should have been implemented earlier')
}

export const cenoop = (name: string) => {
  throw new Error(`The stub function for ${name} is used. This function should have been implemented earlier`)
}
