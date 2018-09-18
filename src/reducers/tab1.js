import { handleActions } from 'redux-actions';
import _ from 'lodash'
import { types } from '../actions'

const initState = {
  predicting: false,
  predicted: false,
  predictedAt: null,
  results: [],
}

const init = (state, action) => {
  return {
    ...state,
    results: action.results,
  }
}

const predict = (state, action) => {
  return {
    ...state,
    predicting: true,
    predicted: false,
  }
}

const predicted = (state, action) => {
  return {
    ...state,
    predicting: false,
    predicted: true,
    predictedAt: new Date(),
    results: action.results,
  }
}

const handlers = handleActions({
  [types.TAB1_INIT]: init,
  [types.PREDICT]: predict,
  [types.PREDICTED]: predicted,
}, initState);

export default handlers;
