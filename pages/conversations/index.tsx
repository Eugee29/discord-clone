import { ReactNode, useState } from 'react'
import ConversationHeader from '../../components/ConversationHeader'
import Layout from '../../layouts/Layout'
import { BsFillPeopleFill } from 'react-icons/bs'
import { userService } from '../../services/user.service'
import { GetServerSideProps } from 'next'
import { DiscordUser } from '../../models/discord-user.model'
import UserList from '../../components/UserList'
import UserFilter from '../../components/UserFilter'
import { useUser } from '../../context/UserContext'
import { useRouter } from 'next/router'
import { conversationService } from '../../services/conversation.service'
import Meta from '../../components/Meta'
import { getAuth } from 'firebase/auth'

interface Props {
  users: DiscordUser[]
}

const ConversationsPage = ({ users }: Props) => {
  const [displayNameFilter, setDisplayNameFilter] = useState('')
  const router = useRouter()
  const { user, setUser } = useUser()

  const startConversation = async (withUserId: string) => {
    // Check if the user already has a conversation with 'withUser'
    let conversation = user?.conversations.find(
      (conversation) =>
        conversation.membersIds.length === 2 &&
        conversation.membersIds.find((memberId) => memberId === withUserId)
    )

    // If the user doesn't have a conversation with 'withUser' create a new one
    if (!conversation) {
      const membersIds: string[] = [withUserId, user!.id]
      conversation = await conversationService.createConversation(membersIds)
      membersIds.forEach(
        async (memberId) =>
          await userService.addConversationToUser(memberId, conversation!)
      )
      setUser({
        ...user,
        conversations: [...user!.conversations, conversation],
      } as DiscordUser)
    }
    router.push(`/conversations/${conversation.id}`)
  }

  const usersToShow = users.filter(
    (currUser) =>
      new RegExp(displayNameFilter, 'i').test(currUser.displayName) &&
      currUser.id != user?.id
  )

  return (
    <>
      <Meta>
        <title>Discord | Users</title>
      </Meta>
      <div className="flex-1 bg-discord-gray-300">
        <ConversationHeader
          title="Users"
          icon={
            <BsFillPeopleFill
              aria-label="people"
              className="w-5 h-5 text-discord-gray-50"
            />
          }
        />
        <div className="p-5">
          <UserFilter
            value={displayNameFilter}
            setValue={setDisplayNameFilter}
          />
          <h1 className="py-4 px-3 font-ginto uppercase text-xs text-discord-gray-20">
            All users — {usersToShow.length}
          </h1>
          <UserList users={usersToShow} startConversation={startConversation} />
        </div>
      </div>
    </>
  )
}

ConversationsPage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async () => {
  const users = JSON.parse(JSON.stringify(await userService.getAllUsers()))
  return { props: { users } }
}

export default ConversationsPage
