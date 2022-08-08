import { useEffect, useState } from 'react'
import { Conversation } from '../models/conversation.model'
import { conversationService } from '../service/conversation.service'
import Sidebar from '../components/Sidebar'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const [conversations, setConversations] = useState<Conversation[] | null>(
    null
  )

  useEffect(() => {
    ;(async () => {
      const conversations = await conversationService.query()
      setConversations(conversations)
    })()
  }, [])

  return (
    <div className="h-screen w-screen flex">
      <Sidebar conversations={conversations} />
      {children}
    </div>
  )
}

export default Layout
