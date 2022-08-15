import type { GetServerSideProps, NextPage } from 'next'

const Home: NextPage = () => {
  return <h1>Home</h1>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  }
}

export default Home
