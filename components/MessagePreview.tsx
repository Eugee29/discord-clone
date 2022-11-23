import Image from 'next/image'
import { LegacyRef, useEffect, useRef, useState } from 'react'
import { DiscordUser } from '../models/discord-user.model'
import { Message } from '../models/message.model'
import { userService } from '../services/user.service'
import { utilService } from '../services/util.service'
import MessagePreviewSkeleton from './MessagePreviewSkeleton'

interface Props {
  message: Message
}

const MessagePreview = ({ message }: Props) => {
  const [byUser, setByUser] = useState<DiscordUser | null>(null)
  const messageRef: LegacyRef<HTMLDivElement> = useRef(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      const user = await userService.getUser(message.byUserId)
      setByUser(user)
    })()
  }, [message.byUserId])

  if (!byUser) return <MessagePreviewSkeleton message={message} />

  return (
    <div className="flex gap-4 py-0.5 mb-4" ref={messageRef}>
      <div className="w-10 h-10">
        <Image
          className="rounded-full"
          width="100%"
          height="100%"
          src={byUser.photoURL}
          alt={byUser.displayName}
        />
      </div>
      <div className="leading-snug flex-1">
        <h1 className="text-white ">
          {byUser.displayName}
          <span className="text-xs text-discord-gray-30 ml-2">
            {utilService.formatDate(message.sentAt)}
          </span>
        </h1>
        <pre className="text-discord-gray-10 font-sans font-light overflow-hidden">
          {message.content}
        </pre>
      </div>
    </div>
  )
}

export default MessagePreview
