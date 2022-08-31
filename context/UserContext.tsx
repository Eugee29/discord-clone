import axios from 'axios'
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
      const res = await axios.get('/api/auth')
      const currentUser = res.data
      setUser(currentUser || null)
    })()
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
