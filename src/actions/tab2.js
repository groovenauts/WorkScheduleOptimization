import { types } from '.'
import moment from 'moment'

const optimizeResults = [
  require('../../data/optimize_result1.json'),
  require('../../data/optimize_result2.json'),
]

export const loadStaffs = () => (dispatch) => {
  dispatch({ type: types.LOAD_STAFFS })
  new Promise(resolve => {
    resolve(require('../../data/staffs.json'))
  }).then((results) => {
    dispatch({
      type: types.LOADED_STAFFS,
      staffs: results,
    })
  })
1}

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

export const showProfileInSetting = (staffId) => {
  return {
    type: types.SHOW_NESTED_PROFILE,
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
  const { tab2 } = getState()
  const { numOfOptimize } = tab2

  dispatch({ type: types.OPTIMIZE })
  new Promise(resolve => {
    setTimeout(() => {
      const results = _.map(optimizeResults[(numOfOptimize + 1) % 2], event => {
        return {
          ...event,
          start: moment(event.startDate),
          end: moment(event.endDate),
        }
      })
      resolve(results)
    }, 3000)
  }).then((results) => {
    dispatch({
      type: types.OPTIMIZED,
      results: results,
    })
  })
}
