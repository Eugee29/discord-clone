import { ReactNode } from 'react'
import ConversationHeader from '../../components/ConversationHeader'
import Layout from '../../layouts/Layout'
import { BsFillPeopleFill } from 'react-icons/bs'
import { userService } from '../api/services/user.service'
import { GetServerSideProps } from 'next'
import { DiscordUser } from '../../models/discord-user.model'
import UserList from '../../components/UserList'
import { authService } from '../api/services/auth.service'

interface Props {
  users: DiscordUser[]
}

const ConversationsPage = ({ users }: Props) => {
  return (
    <div className="flex-1 bg-discord-gray-300">
      <ConversationHeader>
        <BsFillPeopleFill
          aria-label="people"
          className="w-5 h-5 text-discord-gray-50"
        />
        <h1 className="text-white">People</h1>
      </ConversationHeader>
      <div className="p-8">
        <UserList users={users} />
      </div>
    </div>
  )
}

ConversationsPage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async () => {
  const user = await authService.getCurrentUser()
  console.log(user)

  if (!user) return { redirect: { permanent: false, destination: '/login' } }
  const users = JSON.parse(JSON.stringify(await userService.getAllUsers()))
  return { props: { users } }
}

export default ConversationsPage
