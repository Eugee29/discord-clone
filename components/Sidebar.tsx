import { ConversationPreviewModel } from '../models/conversation-preview.model'
import ConversationList from './ConversationList'
import SidebarHeader from './SidebarHeader'

interface Props {
  conversations: ConversationPreviewModel[] | null
}

const Sidebar = ({ conversations }: Props) => {
  return (
    <nav className="flex flex-col h-full w-60 bg-discord-gray-400 ">
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
