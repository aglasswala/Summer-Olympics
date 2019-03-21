import { USER_LOGGED_IN } from '../types'

export const userLoggedIn = email => ({
  type: USER_LOGGED_IN,
  email
})