import { types } from '.'
import moment from 'moment'

export const loadStaffs = () => {
  let staffs = require('../../data/staffs.json')
  return {
    type: types.LOAD_STAFFS,
    staffs: staffs,
  }
}

export const showSetting = () => {
  return {
    type: types.SHOW_SETTING
  }  
}

export const closeSetting = () => {
  return {
    type: types.CLOSE_SETTING
  }  
}

export const showProfile = (staffId) => {
  return {
    type: types.SHOW_PROFILE,
    staffId: staffId,
  }  
}

export const closeProfile = () => {
  return {
    type: types.CLOSE_PROFILE
  }  
}

export const updateDayOffs = dayOffs => {
  return {
    type: types.UPDATE_DAY_OFFS,
    dayOffs
  }
}

export const optimize = () => (dispatch, getState) => {
  dispatch({ type: types.OPTIMIZE })
  setTimeout(() => {
    const schedules = require('../../data/optimize_result1.json')
    dispatch({
      type: types.OPTIMIZED,
      results: _.map(schedules, event => {
        return {
          ...event,
          start: moment(event.startDate),
          end: moment(event.endDate),
        }
      }),
    })
  }, 3000)
}
