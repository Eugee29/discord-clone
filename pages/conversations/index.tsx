import { ReactNode, useState } from 'react'
import ConversationHeader from '../../components/ConversationHeader'
import Layout from '../../layouts/Layout'
import { BsFillPeopleFill } from 'react-icons/bs'
import { userService } from '../../services/user.service'
import { GetServerSideProps } from 'next'
import { DiscordUser } from '../../models/discord-user.model'
import UserList from '../../components/UserList'
import UserFilter from '../../components/UserFilter'

interface Props {
  users: DiscordUser[]
}

const ConversationsPage = ({ users }: Props) => {
  const [displayNameFilter, setDisplayNameFilter] = useState('')

  const usersToShow = users.filter((user) =>
    new RegExp(displayNameFilter, 'i').test(user.displayName)
  )

  return (
    <div className="flex-1 bg-discord-gray-300">
      <ConversationHeader>
        <BsFillPeopleFill
          aria-label="people"
          className="w-5 h-5 text-discord-gray-50"
        />
        <h1 className="text-white">Users</h1>
      </ConversationHeader>
      <div className="p-5">
        <UserFilter value={displayNameFilter} setValue={setDisplayNameFilter} />
        <h1 className="py-4 px-3 font-ginto uppercase text-xs text-discord-gray-20">
          All users — {users.length}
        </h1>
        <UserList users={usersToShow} />
      </div>
    </div>
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
