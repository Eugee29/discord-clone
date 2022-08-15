import { useEffect, useState } from 'react'
import { Conversation } from '../models/conversation.model'
import { conversationService } from '../service/conversation.service'
import ConversationList from './ConversationList'
import SidebarHeader from './SidebarHeader'

const Sidebar = () => {
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
    <nav className="flex flex-col h-full w-fit bg-discord-gray-400">
      <SidebarHeader />
      <div className="p-2">
        <h1 className="text-xs font-bold text-discord-gray-50 uppercase p-2.5">
          Conversations
        </h1>
        <ConversationList conversations={conversations} />
      </div>
    </nav>
  )
}

export default Sidebar
