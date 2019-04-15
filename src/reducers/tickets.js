import { GET_TICKETS } from '../types'

export default function tickets(state = {}, action = {}) {
  switch(action.type) {
    case GET_TICKETS: 
      return action.tickets
    default: 
      return state
  }
}