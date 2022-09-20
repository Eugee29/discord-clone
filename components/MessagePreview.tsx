import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DiscordUser } from '../models/discord-user.model'
import { Message } from '../models/message.model'
import { userService } from '../services/user.service'

interface Props {
  message: Message
}

const MessagePreview = ({ message }: Props) => {
  const [byUser, setByUser] = useState<DiscordUser | null>(null)

  useEffect(() => {
    ;(async () => {
      const user = await userService.getUser(message.byUserId)
      setByUser(user)
    })()
  }, [])

  const sentAtDate = new Date(message.sentAt).toLocaleDateString('en-US')
  // MessagePreviewLoader
  if (!byUser)
    return (
      <div className="flex gap-4 py-0.5 mb-4">
        <div className="w-10 h-10 rounded-full bg-discord-gray-250" />

        <div className="leading-snug flex-1">
          <h1 className="text-white bg-discord-gray-200 w-fit rounded-full text-transparent">
            {'some name'}
            <span className="text-xs ml-2 text-transparent">{sentAtDate}</span>
          </h1>
          <pre className="text-discord-gray-10 font-sans font-light text-transparent bg-discord-gray-250 w-fit rounded-full">
            {message.content}
          </pre>
        </div>
      </div>
    )

  const defaultPhotoURL =
    'https://i.pinimg.com/originals/d0/37/0f/d0370fc08a89f10da14d64718269d4c1.jpg'

  return (
    <div className="flex gap-4 py-0.5 mb-4">
      <div className="w-10 h-10">
        <Image
          className="rounded-full"
          width="100%"
          height="100%"
          src={byUser.photoURL || defaultPhotoURL}
          alt={byUser.displayName}
        />
      </div>
      <div className="leading-snug flex-1">
        <h1 className="text-white ">
          {byUser.displayName}
          <span className="text-xs text-discord-gray-50 ml-2">
            {sentAtDate}
          </span>
        </h1>
        <pre className="text-discord-gray-10 font-sans font-light">
          {message.content}
        </pre>
      </div>
    </div>
  )
}

export default MessagePreview
