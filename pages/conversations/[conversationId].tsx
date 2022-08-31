import { GetServerSideProps } from 'next'
import { ReactNode } from 'react'
import { SiMaildotru } from 'react-icons/si'
import ConversationHeader from '../../components/ConversationHeader'
import MessageList from '../../components/MessageList'
import Meta from '../../components/Meta'
import Layout from '../../layouts/Layout'
import { Conversation } from '../../models/conversation.model'
import { conversationService } from '../api/services/conversation.service'
import { authService } from '../api/services/auth.service'

interface Props {
  conversation: Conversation
}

const ConversationPage = ({ conversation }: Props) => {
  // const [conversation, setConversations] = useState<null | Conversation>()
  // const router = useRouter()

  // useEffect(() => {
  //   ;(async () => {
  //     const { conversationId } = router.query
  //     const conversations = await conversationService.getConversation(
  //       conversationId as string
  //     )
  //     setConversations(conversations as Conversation)
  //   })()
  // }, [router.query])

  const conversationName = conversation?.members[0].displayName

  return (
    <>
      <Meta title={conversationName} />
      <main className="flex-1 flex flex-col bg-discord-gray-300">
        {conversation ? (
          <>
            <ConversationHeader>
              <SiMaildotru
                aria-label="@"
                className="w-5 h-5 text-discord-gray-50"
              />
              <h1 className="text-white">{conversationName}</h1>
            </ConversationHeader>
            <MessageList messages={conversation.messages} />
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </main>
    </>
  )
}

ConversationPage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await authService.getCurrentUser()
  if (!user) return { redirect: { permanent: false, destination: '/login' } }

  const { conversationId } = context.query
  const conversations = await conversationService.getConversation(
    conversationId as string
  )

  return { props: { conversations } }
}

export default ConversationPage
