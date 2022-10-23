import { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  title: string
}

const ConversationHeader = ({ icon, title }: Props) => {
  return (
    <header className="bg-discord-gray-300 drop-shadow-md px-4 py-3">
      <div className="flex items-center gap-2">
        {icon}
        <h1 className="text-white">{title}</h1>
      </div>
    </header>
  )
}

export default ConversationHeader
