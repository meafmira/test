import { handleActions } from 'redux-actions'
import LayoutConstants from '../constants/layout'

const { SHOW_FINANCING_OPTIONS } = LayoutConstants

const initialState = {
  financingOptionsVisible: true,
}

export default handleActions(
  {
    [SHOW_FINANCING_OPTIONS]: (
      state,
      { payload: financingOptionsVisible }
    ) => ({
      ...state,
      financingOptionsVisible,
    }),
  },
  initialState
)
