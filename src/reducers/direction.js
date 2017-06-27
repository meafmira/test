import { handleActions } from 'redux-actions'
import directionConstants from '../constants/direction'

const initialState = {
  directions: [],
}

const { DIRECTION_FETCH_SUCCEEDED } = directionConstants

export default handleActions(
  {
    [DIRECTION_FETCH_SUCCEEDED]: (state, { payload }) => ({
      ...state,
      directions: [...state.directions, payload],
    }),
  },
  initialState
)
