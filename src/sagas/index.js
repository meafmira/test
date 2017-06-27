import { fetchDistancesSaga } from './distance'
import { searchPropertiesSaga, fetchPropertySaga } from './property'
import { fetchUserSaga, logoutSaga } from './user'
import { fetchDirectionSaga } from './direction'

export default function* rootSaga() {
  yield [
    fetchDistancesSaga(),
    searchPropertiesSaga(),
    fetchUserSaga(),
    logoutSaga(),
    fetchPropertySaga(),
    fetchDirectionSaga(),
  ]
}
