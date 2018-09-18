import React from 'react'
import {
  Icon,
} from 'antd'

import { VIEW_MODE } from './reducers/tab2'

class Switch extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { height, value } = this.props
    return value !== nextProps.value || height !== nextProps.height
  }
  render() {
    const { height, size, value, onChange } = this.props
    let style = {}
    if (_.isNumber(height)) {
      style.height = height
      style.minHeight = height
      style.maxHeight = height
      if (_.isNumber(size)) {
        style.lineHeight = `${height}px`
      }
    }
    let iconStyle = {}
    if (_.isNumber(size)) {
      iconStyle.fontSize = size
    }
    return (
      <div className="switch slideDown" style={style}>
        <div style={style} className={value === VIEW_MODE.PEOPLE ? 'active':''}>
          <Icon type="team" theme="outlined" style={iconStyle} onClick={e => {
            if (value !== VIEW_MODE.PEOPLE) {
              onChange(VIEW_MODE.PEOPLE)
            }
          }}/>
        </div>
        <div style={style} className={value === VIEW_MODE.TIME ? 'active':''}>
          <Icon type="clock-circle" theme="outlined" style={iconStyle} onClick={e => {
            if (value !== VIEW_MODE.TIME) {
              onChange(VIEW_MODE.TIME)
            }
          }}/>
        </div>
      </div>
    )
  }
}

export default Switch
