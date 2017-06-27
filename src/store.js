import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import app from './reducers'
import createLogger from 'redux-logger'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(app, applyMiddleware(createLogger(), sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store
