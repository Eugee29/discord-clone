import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const ConversationHeader = ({ children }: Props) => {
  return (
    <header className="bg-discord-gray-300 drop-shadow-md px-4 py-3">
      <div className="flex items-center gap-2">{children}</div>
    </header>
  )
}

export default ConversationHeader
