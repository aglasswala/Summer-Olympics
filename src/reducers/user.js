import { USER_LOGGED_IN } from '../types'
import { USER_LOGGED_OUT } from '../types'

export default function user(state = {}, action = {}) {
  switch(action.type) {
    case USER_LOGGED_IN: 
      return action.user
    case USER_LOGGED_OUT:
      return action.payload
    default: 
      return state
  }
}