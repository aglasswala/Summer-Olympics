import { USER_LOGGED_IN } from '../types'
import { USER_LOGGED_OUT } from '../types'

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
})

export const userLoggedOut = user => ({
  type: USER_LOGGED_OUT,
  payload: {}
})