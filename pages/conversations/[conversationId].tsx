import { GetServerSideProps } from 'next'
import ConversationHeader from '../../components/ConversationHeader'
import MessageList from '../../components/MessageList'
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

export default ConversationPage
