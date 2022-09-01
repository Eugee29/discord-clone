import ConversationList from './ConversationList'
import SidebarHeader from './SidebarHeader'
import { BsFillPeopleFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Conversation } from '../models/conversation.model'
import { authService } from '../services/auth.service'

interface Props {
  conversations: Conversation[] | null
}

const Sidebar = ({ conversations }: Props) => {
  const router = useRouter()

  const isActive = router.pathname === '/conversations'

  return (
    <nav className="flex flex-col h-full basis-60 bg-discord-gray-400 ">
      <SidebarHeader />
      <div className="p-2">
        <Link href="/conversations">
          <div
            className={`group hover:bg-discord-gray-250 flex gap-3 px-2 py-[3px] rounded cursor-pointer mb-4 ${
              isActive ? 'bg-discord-gray-100' : ''
            }`}
          >
            <div className="h-9 w-9 self-center p-2">
              <BsFillPeopleFill
                className={`h-full w-full text-white ${
                  isActive ? 'text-white' : 'text-discord-gray-50'
                }`}
                aria-label="people"
              />
            </div>
            <div className="flex flex-col flex-1 justify-center">
              <h1
                className={`group-hover:text-discord-gray-10 ${
                  isActive ? 'text-white' : 'text-discord-gray-50'
                }`}
              >
                People
              </h1>
            </div>
          </div>
        </Link>
        <h1 className="text-xs font-ginto text-discord-gray-50 uppercase p-2.5">
          Direct messages
        </h1>
        <ConversationList conversations={conversations} />
      </div>
      <button onClick={async () => await authService.logout()}>Log out</button>
    </nav>
  )
}

export default Sidebar
