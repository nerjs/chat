import { isBrowser } from '../../is'

export const getWindow = (prop?: keyof Window): Window => {
  if (!isBrowser())
    throw new Error(
      `The router runs outside the browser. The window object is not available.${prop ? ` Cannot access window.${prop}` : ''}`,
    )

  if (prop && !(prop in window)) throw new Error(`The ${prop} property is missing from the window.`)
  return window
}

export const getLocalStorage = () => getWindow('localStorage').localStorage
export const getSessionStorage = () => getWindow('sessionStorage').sessionStorage
export const getHistory = () => getWindow('history').history
export const getLocation = () => getWindow('location').location
