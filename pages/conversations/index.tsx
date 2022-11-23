import { ReactNode, useEffect, useState } from 'react'
import ConversationHeader from '../../components/ConversationHeader'
import Layout from '../../layouts/Layout'
import { BsFillPeopleFill } from 'react-icons/bs'
import { userService } from '../../services/user.service'

import { DiscordUser } from '../../models/discord-user.model'
import UserList from '../../components/UserList'
import UserFilter from '../../components/UserFilter'
import { useUser } from '../../context/UserContext'
import { useRouter } from 'next/router'
import { conversationService } from '../../services/conversation.service'
import Meta from '../../components/Meta'

const ConversationsPage = () => {
  const [displayNameFilter, setDisplayNameFilter] = useState('')
  const [users, setUsers] = useState<DiscordUser[] | null>(null)
  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    ;(async () => {
      const loadedUsers = await userService.getAllUsers()
      setUsers(loadedUsers.filter((user) => !user.isAnonymous))
    })()
  }, [])

  const startConversation = async (withUserId: string) => {
    if (!user) return
    // Check if the user already has a conversation with 'withUser'
    const existingConversation = user.conversations.find(
      (conversation) =>
        conversation.membersIds.length === 2 &&
        conversation.membersIds.find((memberId) => memberId === withUserId)
    )
    if (existingConversation)
      return router.push(`/conversations/${existingConversation.id}`)

    // If the user doesn't have a conversation with 'withUser' create a new one
    const membersIds: string[] = [withUserId, user.id]
    const newConversation = await conversationService.createConversation(
      membersIds
    )

    membersIds.forEach(
      async (memberId) =>
        await userService.addConversationToUser(memberId, newConversation)
    )

    router.push(`/conversations/${newConversation.id}`)
  }

  const usersToShow = users?.filter(
    (currUser) =>
      new RegExp(displayNameFilter, 'i').test(currUser.displayName) &&
      currUser.id != user?.id
  )

  return (
    <>
      <Meta>
        <title>Discord | Users</title>
      </Meta>

      <main className="flex-1 flex flex-col bg-discord-gray-300">
        <ConversationHeader
          title="Users"
          icon={
            <BsFillPeopleFill
              aria-label="people"
              className="w-5 h-5 text-discord-gray-50"
            />
          }
        />

        <UserFilter value={displayNameFilter} setValue={setDisplayNameFilter} />
        {usersToShow && (
          <>
            <h1 className="py-4 px-3 font-ginto uppercase text-xs text-discord-gray-20 mx-5">
              All users — {usersToShow.length}
            </h1>
            <UserList
              users={usersToShow}
              startConversation={startConversation}
            />
          </>
        )}
      </main>
    </>
  )
}

ConversationsPage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>
}

export default ConversationsPage
