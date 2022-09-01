import axios from 'axios'
import { onAuthStateChanged, User } from 'firebase/auth'
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
import { auth } from '../pages/api/firebase.config'
import { authService } from '../pages/api/services/auth.service'

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
    // const unsubscribe = onAuthStateChanged(auth, async (user) => {
    //   if (!user) return setUser(null)
    //   setUser(user)
    // })
    // return () => unsubscribe()
    ;(async () => {
      // const res = await axios.get('/api/auth')
      // const currentUser = res.data
      // setUser(currentUser || null)

      const unsubscribe = await authService.onUserChange(setUser)
      return () => unsubscribe()
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
