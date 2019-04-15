import { combineReducers } from 'redux'
import user from './user'
import events from './events'
import tickets from './tickets'

export default combineReducers({
  user,
  events,
  tickets
})