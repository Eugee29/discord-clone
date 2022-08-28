import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { UserProvider } from '../context/UserContext'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page: ReactNode) => page)
  return (
    <UserProvider>
      <div className="h-screen w-screen">
        {getLayout(<Component {...pageProps} />)}
      </div>
    </UserProvider>
  )
}

export default MyApp
