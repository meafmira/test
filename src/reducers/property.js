import { handleActions } from 'redux-actions'
import propertyConstants from '../constants/parking'

const {
  PROPERTIES_SEARCH_SUCCEEDED,
  PROPERTIES_SEARCH_REQUESTED,
  PROPERTY_CHANGE,
  PROPERTY_FETCH_SUCCEEDED,
} = propertyConstants

export const initialState = []

export default handleActions(
  {
    [PROPERTIES_SEARCH_REQUESTED]: () => initialState,
    [PROPERTIES_SEARCH_SUCCEEDED]: (state, { payload }) => payload,
    [PROPERTY_CHANGE]: (state, { payload: newProperty }) =>
      state.map(
        property => (property.id === newProperty.id ? newProperty : property)
      ),
    [PROPERTY_FETCH_SUCCEEDED]: (state, { payload: property }) =>
      state.concat(property),
  },
  initialState
)
