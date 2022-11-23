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
      <div className="h-full flex flex-col items-center gap1-8 flex-1">
        <h1 className="text-[15vw] md:text-9xl font-ginto-nord uppercase text-white z-10">
          Discord
        </h1>
        <p className="text-[5vw] text-center text-white md:text-4xl mb-24 md:mb-12">
          {'( Clone )'}
        </p>
        {/* {user !== null ? (
          <HomePageButton
            isDark={true}
            onClick={() => router.push('/conversations')}
          >
            Start Chatting
          </HomePageButton>
        ) : ( */}
        <div className="flex flex-col sm:flex-row gap-12 z-10 self-stretch sm:self-center mb-auto">
          {user !== null ? (
            <HomePageButton
              isDark={true}
              onClick={() => router.push('/conversations')}
            >
              Start Chatting
            </HomePageButton>
          ) : (
            <>
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
            </>
          )}
        </div>
        {/* )} */}
      </div>

      <Hero1 className="absolute bottom-0 w-full" />
      <Hero2 className="absolute bottom-0 right-0 w-5/12 hidden md:block" />
      <Hero3 className="absolute bottom-0 left-0 w-5/12 hidden md:block" />
    </main>
  )
}

export default Home
