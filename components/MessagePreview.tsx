import Image from 'next/image'
import {
  Dispatch,
  LegacyRef,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { DiscordUser } from '../models/discord-user.model'
import { Message } from '../models/message.model'
import { userService } from '../services/user.service'
import MessagePreviewLoader from './MessagePreviewLoader'

interface Props {
  message: Message
  setLastRef?: Dispatch<SetStateAction<RefObject<HTMLDivElement> | undefined>>
}

const MessagePreview = ({ message, setLastRef }: Props) => {
  const [byUser, setByUser] = useState<DiscordUser | null>(null)
  const messageRef: LegacyRef<HTMLDivElement> = useRef(null)

  useEffect(() => {
    ;(async () => {
      const user = await userService.getUser(message.byUserId)
      setByUser(user)
    })()
  }, [])

  useEffect(() => {
    if (setLastRef) setLastRef(messageRef)
  }, [messageRef])

  if (!byUser) return <MessagePreviewLoader message={message} />

  const sentAtDate = new Date(message.sentAt).toLocaleDateString('en-US')

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
