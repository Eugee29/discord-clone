import { GetServerSideProps } from 'next'
import { ReactNode } from 'react'
import { SiMaildotru } from 'react-icons/si'
import ConversationHeader from '../../components/ConversationHeader'
import MessageList from '../../components/MessageList'
import Meta from '../../components/Meta'
import Layout from '../../layouts/Layout'
import { Conversation } from '../../models/conversation.model'
import { conversationService } from '../../services/conversation.service'

interface Props {
  conversation: Conversation
}

const ConversationPage = ({ conversation }: Props) => {
  const conversationName = conversationService.getConversationName(conversation)

  return (
    <>
      <Meta>
        <title>
          Discord |{' '}
          {(conversation.members.length === 2 ? '@' : '') + conversationName}
        </title>
      </Meta>
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
  const { conversationId } = context.query
  const conversation = await conversationService.getConversation(
    conversationId as string
  )

  return { props: { conversation } }
}

export default ConversationPage
