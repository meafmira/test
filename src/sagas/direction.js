/* global google */
import { call, put, takeLatest } from 'redux-saga/effects'
import directionConstants from '../constants/direction'
const {
  DIRECTION_FETCH_REQUESTED,
  DIRECTION_FETCH_SUCCEEDED,
  DIRECTION_FETCH_FAILED,
} = directionConstants

const getDirection = (origin, destination) => {
  return new Promise((resolve, reject) => {
    const {
      LatLng,
      DirectionsService,
      TravelMode,
      DirectionsStatus,
    } = google.maps
    const Service = new DirectionsService()
    Service.route(
      {
        origin: new LatLng(origin.lat, origin.lng),
        destination: new LatLng(destination.lat, destination.lng),
        travelMode: TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === DirectionsStatus.OK) {
          resolve(result)
        } else {
          reject(`Error fetching directions ${result}`)
        }
      }
    )
  })
}

export function* fetchDirection({ payload: { origin, property } }) {
  try {
    const destination = { lat: property.latitude, lng: property.longitude }
    const direction = yield call(getDirection, origin, destination)
    const payload = {
      direction,
      propertyId: property.id,
      origin,
    }
    yield put({ type: DIRECTION_FETCH_SUCCEEDED, payload })
  } catch (payload) {
    yield put({ type: DIRECTION_FETCH_FAILED, payload, error: true })
  }
}

export function* fetchDirectionSaga() {
  yield takeLatest(DIRECTION_FETCH_REQUESTED, fetchDirection)
}
