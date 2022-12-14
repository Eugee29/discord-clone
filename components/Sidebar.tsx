import ConversationList from './ConversationList'
import SidebarHeader from './SidebarHeader'
import { BsFillPeopleFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Conversation } from '../models/conversation.model'

import SidebarFooter from './SidebarFooter'

interface Props {
  conversations: Conversation[] | null
  isSidebarVisible: boolean
}

const Sidebar = ({ conversations, isSidebarVisible }: Props) => {
  const router = useRouter()

  const isActive = router.pathname === '/conversations'

  return (
    <nav
      className={`flex flex-col h-full basis-60 bg-discord-gray-400 -translate-x-full transition-transform sm:shadow-none z-10 ${
        isSidebarVisible && 'translate-x-0 w-3/4'
      } sm:translate-x-0 fixed sm:relative shadow-2xl`}
    >
      <SidebarHeader />
      <div className="p-2 flex-1">
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
                Users
              </h1>
            </div>
          </div>
        </Link>
        <h1 className="text-xs font-ginto text-discord-gray-50 uppercase p-2.5">
          Direct messages
        </h1>
        <ConversationList conversations={conversations} />
      </div>

      <SidebarFooter />
    </nav>
  )
}

export default Sidebar
