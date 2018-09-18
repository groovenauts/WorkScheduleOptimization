import { handleActions } from 'redux-actions';
import _ from 'lodash'
import { types } from '../actions'

export const VIEW_MODE = {
  PEOPLE: 1,
  TIME: 2,
}

const initState = {
  loadingStaffs: false,
  viewMode: VIEW_MODE.TIME,
  staffs: [],
  results: [],
  dayOffs: [],
  optimizating: false,
  optimized: false,
  profileStaffId: null,
  visibleProfile: false,
  visibleNestedProfile: false,
  visibleSetting: false,
  numOfOptimize: 0,
}

const loadStaffs = (state, action) => {
  return {
    ...state,
    loadingStaffs: true,
  }
}

const loadedStaffs = (state, action) => {
  return {
    ...state,
    loadingStaffs: false,
    staffs: action.staffs,
  }
}

const changeViewMode = (state, action) => {
  const { viewMode } = state
  return {
    ...state,
    viewMode: viewMode === VIEW_MODE.PEOPLE ? VIEW_MODE.TIME : VIEW_MODE.PEOPLE
  }
}

const showProfile = (state, action) => {
  return {
    ...state,
    visibleProfile: true,
    visibleNestedProfile: false,
    profileStaffId: action.staffId,
  }
}

const showProfileInSetting = (state, action) => {
  return {
    ...state,
    visibleProfile: true,
    visibleNestedProfile: true,
    profileStaffId: action.staffId,
  }
}

const changeProfile = (state, action) => {
  return {
    ...state,
    profileStaffId: action.staffId,
  }
}

const closeProfile = (state, action) => {
  return {
    ...state,
    visibleProfile: false,
    visibleNestedProfile: false,
  }
}

const showSetting = (state, action) => {
  return {
    ...state,
    visibleSetting: true
  }
}

const closeSetting = (state, action) => {
  return {
    ...state,
    visibleSetting: false
  }
}

const updateDayOffs = (state, action) => {
  return {
    ...state,
    visibleSetting: false,
    dayOffs: action.dayOffs,
  }
}

const optimize = (state, action) => {
  return {
    ...state,
    optimizating: true,
    optimized: false,
    visibleSetting: false,
  }
}

const optimized = (state, action) => {
  return {
    ...state,
    optimizating: false,
    optimized: true,
    results: action.results,
    numOfOptimize: state.numOfOptimize + 1,
  }
}

const handlers = handleActions({
  [types.LOAD_STAFFS]: loadStaffs,
  [types.LOADED_STAFFS]: loadedStaffs,
  [types.CHANGE_VIEW_MODE]: changeViewMode,
  [types.SHOW_PROFILE]: showProfile,
  [types.SHOW_NESTED_PROFILE]: showProfileInSetting,
  [types.CHANGE_PROFILE]: changeProfile,
  [types.CLOSE_PROFILE]: closeProfile,
  [types.SHOW_SETTING]: showSetting,
  [types.CLOSE_SETTING]: closeSetting,
  [types.UPDATE_DAY_OFFS]: updateDayOffs,
  [types.OPTIMIZE]: optimize,
  [types.OPTIMIZED]: optimized,
}, initState);

export default handlers;
