import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { ConnpassEvent, listJPStripesConnpassEvents } from '../lib/api/connpass'
import { ConnpassEventList } from '../components/connpass/EventList'
import dayjs from 'dayjs'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ events }) => {
  return (
    <>
      <Head>
        <title>JP_Stripes</title>
      </Head>

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' aria-label='Top'>
        <div className="mt-16 mb-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:mb-16">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block mb-2 xl:inline">JP_Stripes</span>{' '}
              <span className="block mb-4 text-indigo-600 xl:inline">Japan Stripe User Groups</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            JP_Stripesは、オンライン決済サービス「Stripe」の日本ユーザーコミュニティです。<br/>
            東京・京都・広島・福岡・松山・札幌など日本各地で開催されており、Stripeのサービスに関する内容だけでなく、キャッシュレスに関する取り組みなど、幅広いテーマについて触れることができる場です。
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="https://twitter.com/search?q=%23JP_Stripes&src=typed_query"
                  target='_blank'
                  rel='noopener noreferrer'
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  ツイートを見る (#JP_Stripes)
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="https://www.facebook.com/groups/jpstripes"
                  target='_blank'
                  rel='noopener noreferrer'
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Facebookグループ
                </a>
              </div>
            </div></div>
          </div>
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
      events: events
        .filter((event) => {
          return dayjs(event.started_at).diff(dayjs()) > 0
        })
        .reverse(),
    },
  }
}

export default Home
