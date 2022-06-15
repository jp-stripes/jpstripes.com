import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { ConnpassEvent, listJPStripesConnpassEvents } from '../lib/api/connpass'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ events }) => {
  return (
    <>
      <Head>
        <title>JP_Stripes</title>
      </Head>
      <main>
        <h1>hello</h1>
        <pre>
          <code>{JSON.stringify(events, null, 2)}</code>
        </pre>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<{
  events: ConnpassEvent[]
}> = async () => {
  const { events } = await listJPStripesConnpassEvents()
  return {
    props: {
      events,
    },
  }
}

export default Home
