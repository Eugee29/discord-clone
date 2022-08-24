import { GetServerSideProps } from 'next'
import { ReactNode } from 'react'
import Layout from '../../layouts/Layout'
import { conversationService } from '../../service/conversation.service'

const ConversationsPage = () => {
  return (
    <div className="flex-1 bg-discord-gray-300">
      <h1>Conversations Page</h1>
    </div>
  )
}

ConversationsPage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const conversations = await conversationService.query()

  return {
    props: { conversations },
  }
}

export default ConversationsPage
