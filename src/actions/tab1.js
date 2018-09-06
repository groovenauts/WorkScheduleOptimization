import { types } from '.'
import moment from 'moment'
moment.locale(window.navigator.userLanguage || window.navigator.language)

import result from '../../data/predict_result.json'

const formatData = (year, month, data) => {
  return _.chain(data)
          .reject(o => {
            const m = moment(o.date)
            return year !== m.year() && month !== m.month()
          })
          .map(o => {
            const m = moment(o.date)
            return {
              num: o.num,
              day: m.format('Ddd'),
            }
          })
          .value()
}

export const init = () => (dispatch, getState) => {
  const { app } = getState()
  const { year, month } = app
  dispatch({
    type: types.TAB1_INIT,
    results: _.map(formatData(year, month, result), o => {
      return {
        day: o.day,
      }
    })
  })
}

export const predict = () => (dispatch, getState) => {
  const { app } = getState()
  const { year, month } = app
  dispatch({ type: types.PREDICT })
  setTimeout(() => {
    dispatch({
      type: types.PREDICTED,
      results: formatData(year, month, result)
    })
  }, 3000)
}
