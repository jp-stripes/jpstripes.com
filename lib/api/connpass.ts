import axios from 'axios'

export type ConnpassEvent = {
  event_id: number
  title: string
  catch: string
  description: string
  event_url: string
  started_at: string
  ended_at: string
  limit: number
  hash_tag: string
  event_type: string
  accepted: number
  waiting: number
  updated_at: string
  owner_id: number
  owner_nickname: string
  owner_display_name: string
  place: string
  address: string
  lat: string
  lon: string
  series: {
    id: number
    title: string
    url: string
  }
}
export type ConnpassEventResponse = {
  results_start: number
  results_returned: number
  results_available: number
  events: ConnpassEvent[]
}

export const listConnpassEvent = async (query: string) => {
  const { data: events } = await axios.get(`https://connpass.com/api/v1/event/?${query}`)
  return events as ConnpassEventResponse
}

export const listJPStripesConnpassEvents = async (query?: string) => {
  return listConnpassEvent(['series_id=12610', query].filter(Boolean).join('&'))
}
