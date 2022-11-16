import { Message } from '../models/message.model'

interface Props {
  message: Message
}

const MessagePreviewSkeleton = ({ message }: Props) => {
  return (
    <div className="flex gap-4 py-0.5 mb-4 ">
      <div className="w-10 h-10 rounded-full bg-discord-gray-250 " />

      <div className="leading-snug flex-1">
        <h1 className="text-white bg-discord-gray-200 w-fit rounded-full text-transparent">
          {'some name'}
          <span className="text-xs ml-2 text-transparent">
            {message.sentAt}
          </span>
        </h1>
        <pre className="text-discord-gray-10 font-sans font-light text-transparent bg-discord-gray-250 w-fit rounded-full">
          {message.content}
        </pre>
      </div>
    </div>
  )
}

export default MessagePreviewSkeleton
