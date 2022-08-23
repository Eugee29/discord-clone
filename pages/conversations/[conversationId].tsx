import { GetServerSideProps, NextPage } from 'next'
import { ReactNode } from 'react'
import ConversationHeader from '../../components/ConversationHeader'
import MessageList from '../../components/MessageList'
import Layout from '../../layouts/Layout'
import { Conversation } from '../../models/conversation.model'
import { conversationService } from '../../service/conversation.service'

interface Props {
  conversation: Conversation
}

const ConversationPage = ({ conversation }: Props) => {
  return (
    <main className="flex-1 flex flex-col bg-discord-gray-300">
      <ConversationHeader members={conversation.members} />
      <MessageList messages={conversation.messages} />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { conversationId } = context.query as { conversationId: string }
  const conversation = await conversationService.getById(conversationId)

  return {
    props: {
      conversation,
    },
  }
}

ConversationPage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>
}

export default ConversationPage
