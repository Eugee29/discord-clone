import { Unsubscribe } from 'firebase/auth'
import {
  Context,
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

let UserContext: Context<{
  user: DiscordUser | null | undefined
  setUser: Dispatch<SetStateAction<DiscordUser | null | undefined>>
}>

interface Props {
  children: ReactNode
}

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<DiscordUser | null | undefined>()

  UserContext = createContext({
    user,
    setUser,
  })

  useEffect(() => {
    const subscriptions: Unsubscribe[] = []
    let userUnsubscribe: Unsubscribe
    const authUnsubscribe = authService.onUserChange(
      async (userCredentials) => {
        if (!userCredentials) {
          if (userUnsubscribe) userUnsubscribe()
          return setUser(null) // User is logged out
        }
        setUser(undefined) // Loading user
        const user = await userService.getUser(userCredentials.uid)
        // User is logged in
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
