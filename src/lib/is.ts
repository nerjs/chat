export const isObject = (obj: any): obj is Record<string, any> => typeof obj === 'object'
export const isBrowser = (): boolean => typeof window !== 'undefined' && isObject(window)

export const isStorage = (storage: any): storage is Storage =>
  isObject(storage) &&
  (['setItem', 'getItem', 'removeItem'] as const).every(method => method in storage && typeof storage[method] === 'function')
