import { types } from '.'
import moment from 'moment'
import { randomString } from '../utils'
import { MIN_PER_HOUR, MAX_PER_HOUR } from './tab1'

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
      const start = moment(randomDate(
          moment([year, month - 1, day, startWorkHour]).toDate(),
          moment([year, month - 1, day, startWorkHour]).toDate()
        ).toISOString())
      const startDate = start.format()
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

export const optimizeWithPredict = (year, month, staffs, predictResults) => {
  const ADJUST_INCREASE_NUM = 1.5
  const schedules = optimizeWithoutPredict(year, month, staffs)
  let nextSchedules = _.cloneDeep(schedules)
  const staffIds = _.map(staffs, 'id')
  _.each(predictResults, event => {
    const onSchedules = _.filter(schedules, schedule => {
      return (
        event.start.month() === schedule.start.month() &&
        event.start.days() === schedule.start.days() &&
        event.start.hours() === schedule.start.hours()
      )
    })
    const assignedStaffIds = _.chain(onSchedules).map('staff_id').uniq().value()

    let needNumOfStaff = _.floor(event.num / (MAX_PER_HOUR * ADJUST_INCREASE_NUM))
    needNumOfStaff -= _.size(assignedStaffIds)
    if (needNumOfStaff > 0) {
      const addStaffIds = _.sampleSize(_.difference(staffIds, assignedStaffIds), needNumOfStaff)
      _.each(addStaffIds, id => {
        let newSchedule = {
          start: event.start.clone(),
          end: event.end.clone(),
          id: randomString(8),
          staff_id: id,
        }
        newSchedule.startDate = newSchedule.start.toDate()
        newSchedule.endDate = newSchedule.end.toDate()
        nextSchedules.push(newSchedule)
      })
    }
  })
  return nextSchedules
}

export const optimize = () => (dispatch, getState) => {
  const { app, tab1, tab2 } = getState()
  const { year, month } = app
  const { results } = tab1
  const { staffs } = tab2

  dispatch({ type: types.OPTIMIZE })
  new Promise(resolve => {
    setTimeout(() => {
      resolve({optimized: _.isEmpty(results) ?
        optimizeWithoutPredict(year, month, staffs) :
        optimizeWithPredict(year, month, staffs, results)
      })
    }, 1000 * 3)
  }).then((ret) => {
    dispatch({
      type: types.OPTIMIZED,
      results: ret.optimized,
    })
  })
}
