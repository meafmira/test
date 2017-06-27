import { createActions } from 'redux-actions'
import propertyConstants from '../constants/parking'

const {
  PROPERTIES_SEARCH_REQUESTED,
  PROPERTY_CHANGE,
  PROPERTY_FETCH_REQUESTED,
} = propertyConstants

export default createActions(
  PROPERTY_CHANGE,
  PROPERTIES_SEARCH_REQUESTED,
  PROPERTY_FETCH_REQUESTED
)
