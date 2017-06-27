import { combineReducers } from 'redux'
import property from './property'
import distance from './distance'
import user from './user'
import layout from './layout'
import direction from './direction'

export default combineReducers({
  property,
  distance,
  user,
  layout,
  direction,
})
