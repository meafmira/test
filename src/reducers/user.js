import { handleActions } from 'redux-actions'
import userConstants from '../constants/user'

const initialState = {
  token: null,
  user: null,
}

const { AUTH, USER_FETCH_SUCCEEDED, USER_FETCH_FAILED, LOGOUT } = userConstants

export default handleActions(
  {
    [AUTH]: (state, { payload }) => ({
      ...state,
      token: payload,
    }),

    [USER_FETCH_SUCCEEDED]: (state, { payload: user }) => ({
      ...state,
      user,
    }),

    [USER_FETCH_FAILED]: (state, { payload: error }) => ({
      token: null,
      user: null,
    }),

    [LOGOUT]: state => ({
      token: null,
      user: null,
    }),
  },
  initialState
)
