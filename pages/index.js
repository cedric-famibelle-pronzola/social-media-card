import Head from 'next/head'

import Background from '@/components/background'
import MyCard from '@/components/my-card'

const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE
const SITE_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_DESCRIPTION
const AVATAR_FILENAME = process.env.NEXT_PUBLIC_AVATAR_FILENAME || 'avatar.png'

function Index() {
  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
        <meta name='description' content={SITE_DESCRIPTION} />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='icon' type='image/png' href={`/images/${AVATAR_FILENAME}`} />
      </Head>
      <Background />
      <MyCard />
    </>
  )
}

export default Index
