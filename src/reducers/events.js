import { GET_EVENTS } from '../types'

export default function getEvents(state = {}, action = {}) {
  switch(action.type) {
    case GET_EVENTS: 
      return action.events
    default: 
      return state
  }
}