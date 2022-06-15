import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { ConnpassEvent, listJPStripesConnpassEvents } from '../lib/api/connpass'
import { ConnpassEventList } from '../components/connpass/EventList'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ events }) => {
  return (
    <>
      <Head>
        <title>JP_Stripes</title>
      </Head>

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' aria-label='Top'>
        <div className='w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none'>
          <ConnpassEventList events={events} />
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<{
  events: ConnpassEvent[]
}> = async () => {
  const { events } = await listJPStripesConnpassEvents('order=2&count=30')
  return {
    props: {
      events: events.reverse(),
    },
  }
}

export default Home
