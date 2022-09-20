import { GetServerSideProps } from 'next'
import { ReactNode, useEffect, useRef, useState } from 'react'
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
  const lastMsgRef = useRef<HTMLLIElement>(null)
  const [members, setMembers] = useState<DiscordUser[] | null>(null)
  const [conversation, setConversation] = useState<Conversation>(
    props.conversation
  )

  useEffect(() => {
    const unsubscribe = conversationService.subscribeToConversation(
      conversation.id,
      (updatedConversation) => {
        setConversation(updatedConversation)
        // Handle unread messages
        console.log('new message')
      }
    )

    ;(async () => {
      const conversationMembers = await userService.getMultipleUsers(
        conversation.membersIds
      )
      setMembers(conversationMembers)
    })()
    scrollToLastMessage()
    return () => unsubscribe()
  }, [conversation.id, conversation.membersIds])

  if (!members)
    return (
      <div className="flex-1 flex flex-col bg-discord-gray-300 max-h-screen" />
    )

  function scrollToLastMessage(options?: ScrollIntoViewOptions) {
    lastMsgRef.current?.scrollIntoView(options)
  }

  const onSendMessage = async (messageText: string) => {
    const message = {
      content: messageText,
      byUserId: user?.id,
      sentAt: Date.now(),
    } as Message

    await conversationService.sendMessage(conversation!.id, message)
    scrollToLastMessage({ behavior: 'smooth' })
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
        <ConversationHeader>
          <SiMaildotru
            aria-label="@"
            className="w-5 h-5 text-discord-gray-50"
          />
          <h1 className="text-white">{title}</h1>
        </ConversationHeader>

        <MessageList
          messages={conversation.messages}
          innerRef={lastMsgRef}
          scrollToLastMessage={scrollToLastMessage}
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
