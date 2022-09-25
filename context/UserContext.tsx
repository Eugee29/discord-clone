import { Unsubscribe } from 'firebase/auth'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

import { DiscordUser } from '../models/discord-user.model'
import { authService } from '../services/auth.service'
import { userService } from '../services/user.service'

const UserContext = createContext<{
  user: DiscordUser | null | undefined
  setUser: Dispatch<SetStateAction<DiscordUser | null | undefined>>
}>({ user: null, setUser: () => {} })

interface Props {
  children: ReactNode
}

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<DiscordUser | null>()

  useEffect(() => {
    let subscriptions: Unsubscribe[] = []
    let userUnsubscribe: Unsubscribe
    const authUnsubscribe = authService.onUserChange(
      async (userCredentials) => {
        if (!userCredentials) {
          // User is logged out
          if (userUnsubscribe) userUnsubscribe()
          return setUser(null)
        }
        setUser(undefined) // Loading user
        const user = await userService.getUser(userCredentials.uid)
        setUser(user) // User is logged in
        userUnsubscribe = userService.subscribeToUser(user.id, (updatedUser) =>
          setUser(updatedUser)
        )
        subscriptions.push(userUnsubscribe)
      }
    )
    subscriptions.push(authUnsubscribe)
    return () => subscriptions.forEach((unsubscribe) => unsubscribe())
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
