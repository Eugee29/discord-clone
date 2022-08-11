import { GetServerSideProps } from 'next'
import MessageList from '../../components/MessageList'
import { Conversation } from '../../models/conversation.model'
import { conversationService } from '../../service/conversation.service'

interface Props {
  conversation: Conversation
}

const ConversationPage = ({ conversation }: Props) => {
  console.log(conversation)

  return (
    <main className="flex-1  bg-discord-gray-300 p-4">
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
