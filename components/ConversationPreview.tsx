import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ConversationPreviewModel } from '../models/conversation-preview.model'

interface Props {
  conversation: ConversationPreviewModel
}

const ConversationPreview = ({ conversation }: Props) => {
  const router = useRouter()

  const isActive = router.query.conversationId === conversation.id

  return (
    <Link href={`/conversations/${conversation.id}`} shallow={false}>
      <div
        className={`group hover:bg-discord-gray-250 flex gap-3 px-2 py-[3px] rounded cursor-pointer ${
          isActive ? 'bg-discord-gray-100' : ''
        }`}
      >
        <div className="h-9 w-9 self-center p-0.5">
          <Image
            className="rounded-full"
            height="100%"
            width="100%"
            src={conversation.members[0].avatar}
            alt={conversation.members[0].username}
          />
        </div>
        <div className="flex flex-col flex-1 justify-center">
          <h1
            className={`group-hover:text-discord-gray-10 ${
              isActive ? 'text-white' : 'text-discord-gray-50'
            }`}
          >
            {conversation.members[0].username}
          </h1>
          {conversation.members.length > 2 && (
            <small className="text-xs text-discord-gray-50 leading-4">
              {conversation.members.length} Members
            </small>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ConversationPreview
