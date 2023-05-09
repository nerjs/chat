export type MaybePromise<T = any> = Promise<T> | T

export type StateValueWrapper<T, I extends T | (() => T) | undefined> = I extends undefined ? T | undefined : T

export type Nullish = null | undefined | void

export type MixToType<Mixed, Mixer> = Mixed & (Mixer extends Nullish | never ? {} : Mixer)

export type MergeTypes<First, Second> = First extends Nullish | never ? Second : Second extends Nullish | never ? First : First & Second

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K
}[keyof T]

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never
}[keyof T]

export type HasRequiredField<T> = RequiredKeys<T> extends never ? false : true

type KeysOfType<T, SelectedType> = {
  [key in keyof T]: SelectedType extends T[key] ? key : never
}[keyof T]

export type OnlyOptional<T> = Partial<Pick<T, KeysOfType<T, undefined>>>

export type OnlyRequired<T> = Omit<T, KeysOfType<T, undefined>>

export type OptionalUndefined<T> = OnlyOptional<T> & OnlyRequired<T>

export type ClearMaybeObject<T> = T extends Nullish ? T : OptionalUndefined<T>

export type IsEmpty<T> = KeysOfType<T, any> extends never ? true : false
