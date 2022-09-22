import { Message } from '../models/message.model'
import MessagePreview from './MessagePreview'
import { useEffect, RefObject } from 'react'

interface Props {
  messages: Message[]
  innerRef: RefObject<HTMLLIElement>
  scrollToLastMessage: (options?: ScrollIntoViewOptions) => void
}

const MessageList = ({ messages, innerRef, scrollToLastMessage }: Props) => {
  useEffect(() => {
    scrollToLastMessage()
  }, [messages])

  return (
    <ul className="overflow-auto px-4 mt-auto flex flex-col mr-1 custom-scrollbar">
      {messages.map((message, index) => (
        <li
          key={message.id}
          ref={index === messages.length - 1 ? innerRef : null}
        >
          <MessagePreview message={message} />
        </li>
      ))}
    </ul>
  )
}

export default MessageList
