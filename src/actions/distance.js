import { createActions } from 'redux-actions'
import distanceConstants from '../constants/distance'

const { DISTANCES_FETCH_REQUESTED, CLEAR_DISTANCES } = distanceConstants

export default createActions(
  {
    [DISTANCES_FETCH_REQUESTED]: (origin, properties) => ({
      origin,
      properties,
    }),
  },
  CLEAR_DISTANCES
)
