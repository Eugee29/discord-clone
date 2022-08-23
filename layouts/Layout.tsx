import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Conversation } from '../models/conversation.model'
import { authService } from '../service/auth.service'
import { conversationService } from '../service/conversation.service'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const [conversations, setConversations] = useState<null | Conversation[]>(
    null
  )
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const currentUser = await authService.getCurrentUser()
      console.log(currentUser)
      if (!currentUser) return router.push('/login')

      const conversations = await conversationService.query()
      setConversations(conversations)
    })()
  }, [])

  return (
    <div className="h-full w-full flex">
      <Sidebar conversations={conversations} />
      {children}
    </div>
  )
}

export default Layout
