import { createActions } from 'redux-actions'
import userConstants from '../constants/user'

const { AUTH, LOGOUT } = userConstants

export default createActions(AUTH, LOGOUT)
