import { combineReducers } from 'redux'
import app from './app'
import tab1 from './tab1'
import tab2 from './tab2'

const rootReducer = combineReducers({
  app,
  tab1,
  tab2,
})

export default rootReducer
