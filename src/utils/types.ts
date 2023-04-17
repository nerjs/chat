export type MaybePromise<T = any> = Promise<T> | T

export type StateValueWrapper<T, I extends T | (() => T) | undefined> = I extends undefined ? T | undefined : T
