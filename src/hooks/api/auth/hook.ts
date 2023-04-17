import { useCallback, useEffect, useRef } from 'react'
import { useLocalStore } from '../../store.hook'
import { IUser } from '../../../interfaces/user.interface'
import { ApiAuthEmailInput, ApiAuthEmailOutput, ApiAuthTokenInput, ApiAuthTokenOutput } from './interfaces'
import { sleep } from '../../../utils/timers'
import { useMounted } from '../../mounted.hook'

export const useApiAuth = () => {
  const [users, setUsers] = useLocalStore<IUser[]>('fake:api:users', [])
  const [maxId, setMaxId] = useLocalStore('fake:api:maxUserId', 0)
  const isMounted = useMounted()

  const usersRef = useRef(users)

  useEffect(() => {
    usersRef.current = users
  }, [users])

  const registrationByEmail = useCallback(
    async (auth: ApiAuthEmailInput): Promise<ApiAuthEmailOutput> => {
      const id = maxId + 1
      setMaxId(id)
      await sleep(200)

      const prev = usersRef.current.find(u => u.username === auth.email)
      if (prev) throw new Error(`User ${auth.email} already exists`)
      const user: IUser = {
        id,
        username: auth.email,
      }

      if (isMounted()) {
        usersRef.current.push(user)
        setUsers(usersRef.current)
      }
      return {
        user,
        accessToken: JSON.stringify({ id }),
      }
    },
    [isMounted, maxId, setMaxId, setUsers],
  )

  const loginByEmail = useCallback(async (auth: ApiAuthEmailInput): Promise<ApiAuthEmailOutput> => {
    await sleep(200)

    const user = usersRef.current.find(u => u.username === auth.email)
    if (!user) throw new Error(`User ${auth.email} not found`)

    return {
      user,
      accessToken: JSON.stringify({ id: user.id }),
    }
  }, [])

  const loginByToken = useCallback(async (auth: ApiAuthTokenInput): Promise<ApiAuthTokenOutput> => {
    await sleep(200)
    const { id } = JSON.parse(auth.accessToken)

    const user = usersRef.current.find(u => u.id === id)
    if (!user) throw new Error(`Token failed`)

    return {
      user,
      accessToken: JSON.stringify({ id }),
    }
  }, [])

  const logout = useCallback(async () => {
    await sleep(200)
  }, [])

  return {
    registrationByEmail,
    loginByEmail,
    loginByToken,
    logout,
  }
}
