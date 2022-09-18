import { GetServerSideProps } from 'next'
import { ReactNode, useEffect, useState } from 'react'
import { SiMaildotru } from 'react-icons/si'
import ConversationHeader from '../../components/ConversationHeader'
import MessageBox from '../../components/MessageBox'
import MessageList from '../../components/MessageList'
import Meta from '../../components/Meta'
import { useUser } from '../../context/UserContext'
import Layout from '../../layouts/Layout'
import { Conversation } from '../../models/conversation.model'
import { DiscordUser } from '../../models/discord-user.model'
import { conversationService } from '../../services/conversation.service'
import { userService } from '../../services/user.service'

interface Props {
  conversation: Conversation
}

const ConversationPage = ({ conversation }: Props) => {
  const { user } = useUser()
  const [members, setMembers] = useState<DiscordUser[] | null>(null)

  useEffect(() => {
    ;(async () => {
      const conversationMembers = await userService.getMultipleUsers(
        conversation.membersIds
      )
      setMembers(conversationMembers)
    })()
  }, [])

  if (!members) return <h1>Loading...</h1>

  const { title } = conversationService.getConversationTitleAndPhoto(
    members.filter((member) => member.id != user!.id)
  )

  return (
    <>
      <Meta>
        <title>Discord | {(members.length <= 2 ? '@' : '') + title}</title>
      </Meta>

      <main className="flex-1 flex flex-col bg-discord-gray-300">
        <ConversationHeader>
          <SiMaildotru
            aria-label="@"
            className="w-5 h-5 text-discord-gray-50"
          />
          <h1 className="text-white">{title}</h1>
        </ConversationHeader>
        <div className="p-4 flex-1 flex flex-col">
          <MessageList messages={conversation.messages} />
          <MessageBox placeholder={(members.length <= 2 ? '@' : '') + title} />
        </div>
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
