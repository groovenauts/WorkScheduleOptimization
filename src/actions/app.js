import { types } from './index'

export const resizeWindow = (width, height) => {
  return {
    type: types.RESIZE_WINDOW,
    width, 
    height
  }
}

export const start = () => {
  return {
    type: types.START,
  }
}

export const changeTab = activeKey => {
  return {
    type: types.CHANGE_TAB,
    activeKey,
  }
}