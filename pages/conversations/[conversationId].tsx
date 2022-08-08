import { NextPage } from 'next'
import { useRouter } from 'next/router'

const ConversationPage: NextPage = () => {
  const router = useRouter()
  const { conversationId } = router.query

  return (
    <div className="flex-1  bg-discord-gray-300">
      <h1>{conversationId}</h1>
    </div>
  )
}

export default ConversationPage
