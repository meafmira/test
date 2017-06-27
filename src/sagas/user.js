import { call, put, takeLatest } from 'redux-saga/effects'
import userConstants from '../constants/user'
import jwtDecode from 'jwt-decode'
import { setToken, get } from '../utils/api'

const {
  USER_FETCH_REQUESTED,
  USER_FETCH_SUCCEEDED,
  USER_FETCH_FAILED,
  AUTH,
  LOGOUT,
} = userConstants

export function* auth({ payload }) {
  yield setToken(payload)
  const { id: userId } = jwtDecode(payload)
  yield put({ type: USER_FETCH_REQUESTED, payload: { userId } })
}

export function* fetchUser(action) {
  try {
    const user = yield call(get, `user/${action.payload.userId}`)
    yield put({ type: USER_FETCH_SUCCEEDED, payload: user })
  } catch (payload) {
    yield put({ type: USER_FETCH_FAILED, payload, error: true })
  }
}

export function* fetchUserSaga() {
  yield takeLatest(AUTH, auth)
  yield takeLatest(USER_FETCH_REQUESTED, fetchUser)
}

export function* logoutSaga() {
  yield takeLatest(LOGOUT, function*() {
    yield setToken(null)
  })
}
