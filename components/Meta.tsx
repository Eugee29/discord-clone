import Head from 'next/head'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

const Meta = ({ children }: Props) => {
  return (
    <Head>
      <meta name="description" content="Discord Clone - A communication app." />
      <title>Accord</title>
      {children}
    </Head>
  )
}

export default Meta
