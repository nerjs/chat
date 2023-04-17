import { SetStateAction, useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { LocalStorage, MemoryStorage, SessionStorage } from '../utils/storage'

const prefix = process.env.APP_NAME || '@app'

const mstore = new MemoryStorage()
const sstore = new SessionStorage()
const lstore = new LocalStorage()

export enum TypeStore {
  SESSION,
  LOCAL,
  MEMORY,
}

export const useStore = <T>(key: string, typeStore: TypeStore, initialValue?: T | (() => T)) => {
  const store = useMemo(() => {
    if (typeStore === TypeStore.MEMORY) return mstore
    if (typeStore === TypeStore.LOCAL) return lstore
    if (typeStore === TypeStore.SESSION) return sstore
    throw new Error(`Incorrect store type: ${typeStore}`)
  }, [typeStore])

  const keyItem = `${prefix}:${key}`

  const [value, setValue] = useState<T>(initialValue as T)

  useLayoutEffect(() => {
    const str = store.getItem(keyItem)
    if (!str) return
    try {
      const data = JSON.parse(str)
      setValue(data)
    } catch (err) {
      console.warn(err)
      store.removeItem(keyItem)
    }
  }, [keyItem, store])

  const setItem = useCallback(
    (value: SetStateAction<T>) => {
      setValue(prevValue => {
        const dataValue: T = typeof value === 'function' ? (value as any)(prevValue) : value
        store.setItem(keyItem, JSON.stringify(dataValue))

        return dataValue
      })
    },
    [keyItem, store],
  )

  const removeItem = useCallback(() => {
    store.removeItem(keyItem)
    setValue(initialValue as T)
  }, [keyItem, store, initialValue])

  return [value, setItem, removeItem] as const
}

export const useMemoryStore = <T = any>(key: string, initialValue?: T | (() => T)) => useStore(key, TypeStore.MEMORY, initialValue)
export const useSessionStore = <T = any>(key: string, initialValue?: T | (() => T)) => useStore(key, TypeStore.SESSION, initialValue)
export const useLocalStore = <T = any>(key: string, initialValue?: T | (() => T)) => useStore(key, TypeStore.LOCAL, initialValue)
