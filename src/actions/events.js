import { GET_EVENTS } from '../types'

export const getEvents = events => ({
  type: GET_EVENTS,
  events
})