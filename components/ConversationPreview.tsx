import Image from 'next/image'
import Link from 'next/link'
import { Conversation } from '../models/conversation.model'

interface Props {
  conversation: Conversation
}

const ConversationPreview = ({ conversation }: Props) => {
  return (
    <Link href={`/conversations/${conversation.id}`}>
      <div className="flex gap-3 px-2 py-[3px] w-56 cursor-pointer rounded hover:bg-discord-gray-250">
        <div className="h-9 w-9 rounded self-center p-0.5">
          <Image
            className="rounded-full"
            height="100%"
            width="100%"
            src={conversation.members[0].avatar}
            alt={conversation.members[0].username}
          ></Image>
        </div>
        <div className="flex flex-col flex-1 justify-center">
          <h1 className="text-discord-gray-50 leading-5 ">
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
