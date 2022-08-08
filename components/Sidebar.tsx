import { Conversation } from '../models/conversation.model'
import ConversationList from './ConversationList'

interface Props {
  conversations: Conversation[] | null
}

const Sidebar = ({ conversations }: Props) => {
  return (
    <nav className="h-full w-fit p-2 bg-discord-gray-400">
      <header className="p-2.5">
        <h1 className="text-xs font-bold text-discord-gray-50 uppercase">
          Conversations
        </h1>
      </header>
      <ConversationList conversations={conversations} />
    </nav>
  )
}

export default Sidebar
