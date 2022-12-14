import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { UserProvider } from '../context/UserContext'
import Meta from '../components/Meta'

// eslint-disable-next-line @typescript-eslint/ban-types
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
      <Meta />
      <div className="h-full w-full fixed">
        {getLayout(<Component {...pageProps} />)}
      </div>
    </UserProvider>
  )
}

export default MyApp
