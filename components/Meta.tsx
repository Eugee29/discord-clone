import Head from 'next/head'

interface Props {
  title?: string
}

const Meta = ({ title = 'Discord' }: Props) => {
  return (
    <Head>
      {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      {/* <link rel="icon" href="/favicon.ico" /> */}
      <title>{title}</title>
    </Head>
  )
}

export default Meta
