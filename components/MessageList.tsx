import { Message } from '../models/message.model'
import MessagePreview from './MessagePreview'
import { useEffect, useRef, LegacyRef } from 'react'

interface Props {
  messages: Message[]
}

const MessageList = ({ messages }: Props) => {
  const listRef: LegacyRef<HTMLUListElement> = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: 0, left: 0 })
  }, [messages, listRef])

  return (
    <ul
      className="overflow-auto px-4 mt-auto flex flex-col-reverse mr-1 custom-scrollbar"
      ref={listRef}
    >
      {messages.map((message) => (
        <li key={message.id}>
          <MessagePreview message={message} />
        </li>
      ))}
    </ul>
  )
}

export default MessageList
