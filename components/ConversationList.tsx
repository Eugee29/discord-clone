import { ConversationPreviewModel } from '../models/conversation-preview.model'
import { Conversation } from '../models/conversation.model'
import ConversationPreview from './ConversationPreview'

interface Props {
  conversations: ConversationPreviewModel[] | null
}

const ConversationList = ({ conversations }: Props) => {
  if (!conversations) return <h1>Loading...</h1>

  return (
    <ul className="flex flex-col gap-0.5">
      {conversations.map((conversation) => (
        <li key={conversation.id}>
          <ConversationPreview conversation={conversation} />
        </li>
      ))}
    </ul>
  )
}

export default ConversationList
