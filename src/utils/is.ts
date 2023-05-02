export const isObject = (obj: any): obj is Record<string | symbol, any> => obj && typeof obj === 'object'

export const isError = (val: any): val is Error => isObject(val) && val instanceof Error

export const isRoutingError = (err: any): err is { status: number; data?: string } =>
  isObject(err) &&
  'status' in err &&
  typeof err.status === 'number' &&
  (!('data' in err) || ('data' in err && typeof err.data === 'string'))

export const is404RoutingError = (err: any): err is { status: 404; data?: string } => isRoutingError(err) && err.status === 404

export const hasError = (obj: any): obj is { error: Error } => isObject(obj) && 'error' in obj && isError(obj.error)
