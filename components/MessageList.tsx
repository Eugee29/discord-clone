import { Message } from '../models/message.model'
import MessagePreview from './MessagePreview'
import { useEffect, RefObject, Dispatch, SetStateAction } from 'react'

interface Props {
  messages: Message[]
  setLastMsgRef: Dispatch<SetStateAction<RefObject<HTMLDivElement> | undefined>>
}

const MessageList = ({ messages, setLastMsgRef }: Props) => {
  return (
    <ul className="overflow-auto px-4 mt-auto flex flex-col mr-1 custom-scrollbar">
      {messages.map((message, index) => (
        <li key={message.id}>
          {index === messages.length - 1 ? (
            <MessagePreview message={message} setLastMsgRef={setLastMsgRef} />
          ) : (
            <MessagePreview message={message} />
          )}
        </li>
      ))}
    </ul>
  )
}

export default MessageList
