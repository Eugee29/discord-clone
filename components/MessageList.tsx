import { Message } from '../models/message.model'
import MessagePreview from './MessagePreview'

interface Props {
  messages: Message[]
}

const MessageList = ({ messages }: Props) => {
  return (
    <ul className="flex-1 flex flex-col gap-4 p-4">
      {messages.map((message) => (
        <li key={message.id}>
          <MessagePreview message={message} />
        </li>
      ))}
    </ul>
  )
}

export default MessageList
