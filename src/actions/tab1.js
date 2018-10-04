import { types } from '.'
import moment from 'moment'
import { getLanguage } from '../i18n'
moment.locale(getLanguage())

export const MIN_PER_HOUR = 20
export const MAX_PER_HOUR = 60

export const predictResult = (year, month, numOfEmployees) => {
  const OFFSETS = [
    0.6, 0.5, 0.4, 0.3, 0.3, 0.3, // 00:00 - 05:00
    0.3, 0.4, 0.5, 0.7, 0.9, 1, // 06:00 - 11:00
    0.9, 0.8, 0.8, 0.8, 0.8, 0.8, // 12:00 - 17:00
    0.8, 1, 1, 0.9, 0.8, 0.7 // 18:00 - 23:00
  ]
  const start = moment(`${year}-${_.padStart(month, 2, '0')}`).utc()
  const days = _.times(start.daysInMonth())

  let results = []
  _.each(days, day => {
    const baseNum = _.sample(_.range(MIN_PER_HOUR, MAX_PER_HOUR))
    _.each(_.times(24), i => {
      const numPerEmployee = _.toInteger(baseNum * _.sample([
        OFFSETS[i] - 0.1,
        OFFSETS[i],
        OFFSETS[i] + 0.1,
        OFFSETS[i] + 0.2,
        OFFSETS[i] + 0.3,
      ]))
      const date = start.clone().utc().add(day, 'day').add(i, 'hours')
      results.push({
        date: date.format(),
        start: date,
        end: start.clone().utc().add(day, 'day').add(i + 1, 'hours'),
        num: numPerEmployee * numOfEmployees,
      })
    })
  })
  return results
}

export const init = () => (dispatch, getState) => {
  const { app } = getState()
  dispatch({
    type: types.TAB1_INIT,
    results: []
  })
}

export const predict = () => (dispatch, getState) => {
  const { app, tab2 } = getState()
  const { year, month } = app
  const { staffs } = tab2
  dispatch({ type: types.PREDICT })
  new Promise(resolve => {
    setTimeout(() => {
      resolve(predictResult(year, month, 5))
    }, 1000 * 8)
  }).then((results) => {
    dispatch({
      type: types.PREDICTED,
      results: results,
    })
  })
}
