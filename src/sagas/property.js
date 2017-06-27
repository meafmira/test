import { call, put, takeLatest } from 'redux-saga/effects'
import propertyConstants from '../constants/parking'
import { get } from '../utils/api'
const {
  PROPERTIES_SEARCH_REQUESTED,
  PROPERTIES_SEARCH_SUCCEEDED,
  PROPERTIES_SEARCH_FAILED,
  PROPERTY_FETCH_REQUESTED,
  PROPERTY_FETCH_SUCCEEDED,
  PROPERTY_FETCH_FAILED,
} = propertyConstants

export function* searchProperties(action) {
  const lat = action.payload.lat
  const lng = action.payload.lng
  try {
    const { results: properties } = yield call(
      get,
      `search?latitude=${lat}&longitude=${lng}`
    )
    yield put({ type: PROPERTIES_SEARCH_SUCCEEDED, payload: properties })
  } catch (payload) {
    yield put({ type: PROPERTIES_SEARCH_FAILED, error: true, payload })
  }
}

export function* fetchProperty({ payload: propertyId }) {
  try {
    const property = yield call(get, `properties/${propertyId}`)
    yield put({ type: PROPERTY_FETCH_SUCCEEDED, payload: property })
  } catch (payload) {
    yield put({ type: PROPERTY_FETCH_FAILED, payload, error: true })
  }
}

export function* searchPropertiesSaga() {
  yield takeLatest(PROPERTIES_SEARCH_REQUESTED, searchProperties)
}

export function* fetchPropertySaga() {
  yield takeLatest(PROPERTY_FETCH_REQUESTED, fetchProperty)
}
