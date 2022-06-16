import dayjs from 'dayjs'
import { FC } from 'react'
import { ConnpassEvent } from '../../lib/api/connpass'
import { classNames } from '../../lib/classNames'

const EventDate: FC<Pick<ConnpassEvent, 'started_at' | 'ended_at'>> = ({
  started_at,
  ended_at,
}) => {
  return (
    <span>
      {dayjs(started_at).format('YYYY/MM/DD HH:mm')} ~ {dayjs(ended_at).format('YYYY/MM/DD HH:mm')}
    </span>
  )
}

const EventLabel: FC<Pick<ConnpassEvent, 'started_at'>> = ({ started_at: startedAt }) => {
  if (dayjs(startedAt).diff(dayjs()) > 0) return null
  return (
    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'>
      終了済
    </span>
  )
}

export const ConnpassEventList: FC<{
  events: ConnpassEvent[]
}> = ({ events }) => {
  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold text-gray-900'>イベント予定表</h1>
          {/*<p className='mt-2 text-sm text-gray-700'></p> */}
        </div>
        <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
          <a
            href='https://jpstripes.connpass.com/'
            target={'_blank'}
            rel='noopener noreferrer'
            className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
          >
            Connpassで見る
          </a>
        </div>
      </div>
      <div className='-mx-4 mt-6 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg'>
        <table className='min-w-full divide-y divide-gray-300'>
          <thead>
            <tr>
              <th
                scope='col'
                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
              >
                イベント名
              </th>
              <th
                scope='col'
                className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell'
              >
                開催日時
              </th>
              <th
                scope='col'
                className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell'
              >
                会場
              </th>
              <th
                scope='col'
                className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell'
              ></th>
              <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
                <span className='sr-only'>Select</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, eventIdx) => (
              <tr key={event.event_id}>
                <td
                  className={classNames(
                    eventIdx === 0 ? '' : 'border-t border-transparent',
                    'relative py-4 pl-4 sm:pl-6 pr-3 text-sm',
                  )}
                >
                  <EventLabel {...event} />
                  <div className='font-medium text-gray-900'>{event.title}</div>
                  <div className={'hidden px- py-1.5 text-sm text-gray-500 lg:table-cell'}>
                    {event.catch}
                  </div>
                  <div className='mt-1 flex flex-col text-gray-500 sm:block lg:hidden'>
                    <span>{event.catch}</span>
                    <span className='hidden sm:inline'> · </span>
                    <EventDate {...event} />
                  </div>
                  {eventIdx !== 0 ? (
                    <div className='absolute right-0 left-6 -top-px h-px bg-gray-200' />
                  ) : null}
                </td>
                <td
                  className={classNames(
                    eventIdx === 0 ? '' : 'border-t border-gray-200',
                    'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell',
                  )}
                >
                  <EventDate {...event} />
                </td>
                <td
                  className={classNames(
                    eventIdx === 0 ? '' : 'border-t border-gray-200',
                    'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell',
                  )}
                >
                  {event.place || 'オンライン'} <br />
                  {event.address}
                </td>
                <td
                  className={classNames(
                    eventIdx === 0 ? '' : 'border-t border-transparent',
                    'relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium',
                  )}
                >
                  <a href={event.event_url} className='text-indigo-600 hover:text-indigo-900'>
                    イベントページ
                  </a>
                  {eventIdx !== 0 ? (
                    <div className='absolute right-6 left-0 -top-px h-px bg-gray-200' />
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
