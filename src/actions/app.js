import { types } from './index'

export const resizeWindow = (width, height) => {
  return {
    type: types.RESIZE_WINDOW,
    width, 
    height
  }
}

