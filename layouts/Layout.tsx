import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { ConversationPreviewModel } from '../models/conversation-preview.model'
import { authService } from '../service/auth.service'
import { userService } from '../service/user.service'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const [conversations, setConversations] = useState<
    null | ConversationPreviewModel[]
  >(null)

  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const currentUser = await authService.getCurrentUser()
      if (!currentUser) return router.push('/login')
      const user = await userService.getUser(currentUser.uid)
      setConversations(user?.conversations)
    })()
  }, [])

  return (
    <div className="h-full w-full flex">
      <Sidebar conversations={conversations} />
      {children}
    </div>
  )
}

export default Layout
