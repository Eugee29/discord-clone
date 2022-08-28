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
import { authService } from '../service/auth.service'
import { userService } from '../service/user.service'

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
    ;(async () => {
      const currentUser = await authService.getCurrentUser()
      if (!currentUser) return setUser(null)
      const user = await userService.getUser(currentUser.uid)
      setUser(user)
    })()
  }, [])

  // console.log(user)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
