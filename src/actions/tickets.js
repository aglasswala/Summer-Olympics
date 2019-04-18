import { GET_TICKETS } from '../types'

export const getTickets = tickets => ({
  type: GET_TICKETS,
  tickets
})