import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

export default function configureStore() {
  let middleware = [thunk]
  let store = null;
  if (process.env.NODE_ENV === 'production') {
    store = createStore(rootReducer, applyMiddleware(...middleware))
  } else {
    const logger = createLogger();
    middleware.push(logger)
    store = createStore(rootReducer, applyMiddleware(...middleware))
  }
  return store
}

