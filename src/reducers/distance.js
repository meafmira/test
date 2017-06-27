import { handleActions } from 'redux-actions'
import distanceConstants from '../constants/distance'

const initialState = {
  distances: [],
  isRequested: false,
}

const { DISTANCES_FETCH_SUCCEEDED, CLEAR_DISTANCES } = distanceConstants

export default handleActions(
  {
    [DISTANCES_FETCH_SUCCEEDED]: (state, { payload }) => ({
      ...state,
      distances: payload,
      isRequested: false,
    }),
    [CLEAR_DISTANCES]: () => initialState,
  },
  initialState
)
