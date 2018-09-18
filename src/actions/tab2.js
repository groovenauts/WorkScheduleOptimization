import { types } from '.'
import moment from 'moment'
import { randomString } from '../utils'

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
}

export const changeViewMode = () => {
  return {
    type: types.CHANGE_VIEW_MODE
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

export const showProfileInSetting = (staffId) => {
  return {
    type: types.SHOW_NESTED_PROFILE,
    staffId: staffId,
  }  
}

export const changeProfile = (staffId) => {
  return {
    type: types.CHANGE_PROFILE,
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

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

export const optimizeWithoutPredict = (year, month, staffs) => {
  const ids = _.map(staffs, 'id')
  let shiftSchedules = []
  _.each(ids, id => {
    const numOfWorks = _.sample([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22])
    const days = _.map(_.times(30), i => i + 1)
    const workDays = _.sampleSize(days, numOfWorks)
    const workHour = _.sample([4, 5, 6, 7, 8])
    _.each(workDays, day => {
      const startWorkHour = _.sample(_.map(_.times(24)))
      const start = moment(randomDate(moment([year, month - 1, day, startWorkHour]).toDate(), moment([year, month - 1, day, startWorkHour]).toDate()))
      const startDate = moment(startDate).format()
      const end = start.clone().add(workHour, 'hours')
      const endDate = end.format()
      shiftSchedules.push({
        id: randomString(8),
        staff_id: id,
        startDate,
        start,
        endDate,
        end,
      })
    })
  })
  return shiftSchedules
}

export const optimize = () => (dispatch, getState) => {
  const { app, tab1, tab2 } = getState()
  const { year, month } = app
  const { results } = tab1
  const { staffs } = tab2

  dispatch({ type: types.OPTIMIZE })
  new Promise(resolve => {
    setTimeout(() => {
      resolve({optimized: optimizeWithoutPredict(year, month, staffs)})
    }, 1000 * 8)
  }).then((ret) => {
    dispatch({
      type: types.OPTIMIZED,
      results: ret.optimized,
    })
  })
}
