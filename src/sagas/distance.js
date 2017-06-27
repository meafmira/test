/* global google */
import { call, put, takeLatest } from 'redux-saga/effects'
import distanceConstants from '../constants/distance'
const {
  DISTANCES_FETCH_REQUESTED,
  DISTANCES_FETCH_SUCCEEDED,
  DISTANCES_FETCH_FAILED,
} = distanceConstants

const getDistanceMatrix = (...params) => {
  const distanceService = new google.maps.DistanceMatrixService()
  return new Promise((resolve, reject) => {
    distanceService.getDistanceMatrix(...params, (response, status) => {
      if (status !== 'OK')
        return reject(`Can't load distances: ${status} ${response}`)
      resolve(response)
    })
  })
}

export function* fetchDistances({ payload: { origin, properties } }) {
  const origins = [origin]
  const destinations = properties.map(property => {
    if (property.latitude && property.longitude) {
      const latLng = new google.maps.LatLng(
        property.latitude,
        property.longitude
      )
      return latLng
    }
    return property.address
  })
  try {
    const response = yield call(getDistanceMatrix, {
      origins,
      destinations,
      travelMode: google.maps.TravelMode.WALKING,
    })
    const distances = response.rows[0].elements
    const payload = Object.keys(properties).map((id, index) => ({
      distance: distances[index],
      propertyId: properties[id].id,
    }))
    yield put({ type: DISTANCES_FETCH_SUCCEEDED, payload })
  } catch (payload) {
    yield put({ type: DISTANCES_FETCH_FAILED, error: true, payload })
  }
}

export function* fetchDistancesSaga() {
  yield takeLatest(DISTANCES_FETCH_REQUESTED, fetchDistances)
}
