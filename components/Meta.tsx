import Head from 'next/head'

interface Props {
  title?: string
}

const Meta = ({ title = 'Discord' }: Props) => {
  return (
    <Head>
      <meta name="description" content="Discord Clone - A communication app." />
      <title>{title}</title>
    </Head>
  )
}

export default Meta
