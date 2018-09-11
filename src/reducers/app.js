import { handleActions } from 'redux-actions';
import _ from 'lodash'
import moment from 'moment'
moment.locale(window.navigator.userLanguage || window.navigator.language)

import { types } from '../actions'

const DEFAULT_YEAR = 2018
const DEFAULT_MONTH = 9

const initState = {
  width: _.get(window, 'innerWidth', 0),
  height: _.get(window, 'innerHeight', 0),
  started: false,
  activeTabKey: 1,
  year: DEFAULT_YEAR,
  month: DEFAULT_MONTH,
  ..._.tap({}, param => {
    const m = moment(`${DEFAULT_YEAR}-${_.padStart(DEFAULT_MONTH, 2, '0')}`)
    const days = _.times(m.daysInMonth(), n => n + 1)
    param['days'] = days
    param['wdays'] = _.map(days, day => moment(`${DEFAULT_YEAR}-${_.padStart(DEFAULT_MONTH, 2, '0')}-${_.padStart(day, 2, '0')}`).format('dd'))
  }),
  hours: _.times(24),
}

const windowSize = (state, action) => {
  const { width, height } = action;
  return { ...state, width, height }
}

const start = (state, action) => {
  return {
    ...state,
    started: true
  }
}

const changeTab = (state, action) => {
  return {
    ...state,
    activeTabKey: action.activeKey
  }
}

const handlers = handleActions({
  [types.RESIZE_WINDOW]: windowSize,
  [types.START]: start,
  [types.CHANGE_TAB]: changeTab,
}, initState);

export default handlers;
