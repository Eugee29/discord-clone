import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Hero1 from '../public/assets/svgs/hero1.svg'
import Hero2 from '../public/assets/svgs/hero2.svg'
import Hero3 from '../public/assets/svgs/hero3.svg'
import { BiLogIn } from 'react-icons/bi'
import { useUser } from '../context/UserContext'
import HomePageButton from '../components/HomePageButton'
import HomePageHeader from '../components/HomePageHeader'

const Home: NextPage = () => {
  const router = useRouter()
  const { user } = useUser()

  return (
    <main className="bg-discord-blue-200 h-full relative flex flex-col">
      <HomePageHeader />
      <div className="h-full flex flex-col items-center gap-12 flex-1">
        <h1 className="text-9xl font-ginto-nord uppercase text-white z-10">
          Discord
        </h1>
        <p className="text-center text-white text-2xl">
          Receive and send text messages to any user, at any time
        </p>
        {user !== null ? (
          <HomePageButton
            isDark={true}
            onClick={() => router.push('/conversations')}
          >
            Start Chatting
          </HomePageButton>
        ) : (
          <div className="flex gap-12 z-10">
            <HomePageButton onClick={() => router.push('/login')}>
              <BiLogIn />
              Login
            </HomePageButton>
            <HomePageButton
              isDark={true}
              onClick={() => router.push('/register')}
            >
              Register
            </HomePageButton>
          </div>
        )}
      </div>

      <Hero1 className="absolute bottom-0 w-full" />
      <Hero2 className="absolute bottom-0 right-0" />
      <Hero3 className="absolute bottom-0 left-0" />
    </main>
  )
}

export default Home
