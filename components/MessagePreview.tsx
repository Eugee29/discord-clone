import Image from 'next/image'
import { Message } from '../models/message.model'

interface Props {
  message: Message
}

const MessagePreview = ({ message }: Props) => {
  const sentAtDate = new Date(message.sentAt).toLocaleDateString('en-US')

  return (
    <div className="flex gap-4 py-0.5">
      <div className="w-10 h-10">
        <Image
          className="rounded-full"
          width="100%"
          height="100%"
          src={message.user.photoURL}
          alt={message.user.displayName}
        />
      </div>
      <div className="leading-snug flex-1">
        <h1 className="text-white ">
          {message.user.displayName}
          <span className="text-xs text-discord-gray-50">
            &nbsp;&nbsp;{sentAtDate}
          </span>
        </h1>
        <pre className="text-discord-gray-10">{message.content}</pre>
      </div>
    </div>
  )
}

export default MessagePreview
