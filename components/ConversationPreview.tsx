import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { Conversation } from '../models/conversation.model'
import { DiscordUser } from '../models/discord-user.model'
import { conversationService } from '../services/conversation.service'
import { userService } from '../services/user.service'

interface Props {
  conversation: Conversation
}

const ConversationPreview = ({ conversation }: Props) => {
  const router = useRouter()
  const { user } = useUser()
  const [members, setMembers] = useState<DiscordUser[] | null>(null)

  useEffect(() => {
    ;(async () => {
      const conversationMembers = await userService.getMultipleUsers(
        conversation.membersIds
      )
      setMembers(conversationMembers)
    })()
  }, [conversation.membersIds])

  if (!members) return <></>

  const isActive = router.query.conversationId === conversation.id

  const { title, photoURL } = conversationService.getConversationTitleAndPhoto(
    members.filter((member) => member.id != user!.id)
  )

  return (
    <Link href={`/conversations/${conversation.id}`}>
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
            src={photoURL}
            alt={title}
          />
        </div>
        <div className="flex flex-col flex-1 justify-center">
          <h1
            className={`group-hover:text-discord-gray-10 ${
              isActive ? 'text-white' : 'text-discord-gray-50'
            }`}
          >
            {title}
          </h1>
          {members.length > 2 && (
            <h2 className="text-xs text-discord-gray-50 leading-4">
              {members.length} Members
            </h2>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ConversationPreview
