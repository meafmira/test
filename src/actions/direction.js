import { createActions } from 'redux-actions'
import DirectionConstants from '../constants/direction'

const { DIRECTION_FETCH_REQUESTED } = DirectionConstants

export default createActions(DIRECTION_FETCH_REQUESTED)
