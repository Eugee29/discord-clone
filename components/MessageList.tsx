import { Message } from '../models/message.model'
import MessagePreview from './MessagePreview'
import { useEffect, RefObject, Dispatch, SetStateAction } from 'react'

interface Props {
  messages: Message[]

  setLastRef: Dispatch<SetStateAction<RefObject<HTMLDivElement> | undefined>>
  scrollToLastMessage: (options?: ScrollIntoViewOptions) => void
}

const MessageList = ({ messages, setLastRef, scrollToLastMessage }: Props) => {
  useEffect(() => {
    scrollToLastMessage({ behavior: 'smooth' })
  }, [messages])

  return (
    <ul className="overflow-auto px-4 mt-auto flex flex-col mr-1 custom-scrollbar">
      {messages.map((message, index) => (
        <li key={message.id}>
          {index === messages.length - 1 ? (
            <MessagePreview message={message} setLastRef={setLastRef} />
          ) : (
            <MessagePreview message={message} />
          )}
        </li>
      ))}
    </ul>
  )
}

export default MessageList
