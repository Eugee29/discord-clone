import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ReactNode, RefObject, useEffect, useState } from 'react'
import { SiMaildotru } from 'react-icons/si'
import ConversationHeader from '../../components/ConversationHeader'
import MessageBox from '../../components/MessageBox'
import MessageList from '../../components/MessageList'
import Meta from '../../components/Meta'
import { useUser } from '../../context/UserContext'
import Layout from '../../layouts/Layout'
import { Conversation } from '../../models/conversation.model'
import { DiscordUser } from '../../models/discord-user.model'
import { Message } from '../../models/message.model'
import { conversationService } from '../../services/conversation.service'
import { userService } from '../../services/user.service'

interface Props {
  conversation: Conversation
}

const ConversationPage = (props: Props) => {
  const { user } = useUser()
  const router = useRouter()
  const [members, setMembers] = useState<DiscordUser[] | null>(null)
  const [conversation, setConversation] = useState<Conversation>(
    props.conversation
  )
  const [lastMsgRef, setLastMsgRef] = useState<RefObject<HTMLDivElement>>()

  useEffect(() => {
    scrollToLastMessage()
  }, [lastMsgRef])

  useEffect(() => {
    const unsubscribe = conversationService.subscribeToConversation(
      router.query.conversationId as string,
      async (updatedConversation) => {
        const conversationMembers = await userService.getMultipleUsers(
          updatedConversation.membersIds
        )
        setConversation(updatedConversation)
        setMembers(conversationMembers)

        // Handle unread messages
        console.log('new message')
      }
    )

    return () => unsubscribe()
  }, [router.query.conversationId])

  if (!conversation || !members)
    return (
      <div className="flex-1 flex flex-col bg-discord-gray-300 max-h-screen" />
    )

  function scrollToLastMessage(options?: ScrollIntoViewOptions) {
    lastMsgRef?.current?.scrollIntoView(options)
  }

  const onSendMessage = async (messageText: string) => {
    const message = {
      content: messageText,
      byUserId: user?.id,
      sentAt: Date.now(),
    } as Message

    await conversationService.sendMessage(conversation!.id, message)
  }

  const { title } = conversationService.getConversationTitleAndPhoto(
    members.filter((member) => member.id != user!.id)
  )

  return (
    <>
      <Meta>
        <title>Discord | {(members.length <= 2 ? '@' : '') + title}</title>
      </Meta>

      <main className="flex-1 flex flex-col bg-discord-gray-300 max-h-screen">
        <ConversationHeader
          icon={
            <SiMaildotru
              aria-label="@"
              className="w-5 h-5 text-discord-gray-50"
            />
          }
          title={title}
        />

        <MessageList
          messages={conversation.messages}
          scrollToLastMessage={scrollToLastMessage}
          setLastMsgRef={setLastMsgRef}
        />
        <MessageBox
          placeholder={(members.length <= 2 ? '@' : '') + title}
          onSendMessage={onSendMessage}
        />
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
