import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePrevState } from './prevstate.hook'

export type StoreValue = number | string | boolean | object

const PREFIX = 'app'

const buildKey = (key: string) => `${PREFIX}:${key}`
const readData = <V>(store: Storage, key: string): V | null => {
  const resultStr = store.getItem(buildKey(key))
  if (resultStr == null) return null

  try {
    const res = JSON.parse(buildKey(key))
    if (res == null) return null
    return res
  } catch (err) {
    console.error(err)
    store.removeItem(buildKey(key))
    return null
  }
}

type TypeStore = 'session' | 'local'

export const useGetStore = (type: TypeStore) => useMemo<Storage>(() => (type === 'session' ? sessionStorage : localStorage), [type])

export const useStore = <V extends StoreValue>(
  key: string,
  type?: TypeStore,
): [data: V | null, setStoreData: (value: V | null) => void] => {
  const store = useGetStore(type || 'local')
  const [data, setData] = useState<V | null>(() => readData(store, key))

  const setStore = useCallback(
    (value: V | null) => {
      if (value === null) {
        store.removeItem(buildKey(key))
        setData(null)
      } else {
        setData(value)
        store.setItem(buildKey(key), JSON.stringify(value))
      }
    },
    [key, store],
  )

  const prevKey = usePrevState(key)
  const prevStore = usePrevState(store)

  useEffect(() => {
    if (!prevStore || (key === prevKey && store === prevStore)) return

    setData(readData(store, key))
  }, [key, store, prevKey, prevStore])

  return [data, setStore]
}
