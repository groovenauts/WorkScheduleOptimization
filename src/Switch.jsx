import React from 'react'
import {
  Icon,
} from 'antd'

import { VIEW_MODE } from './reducers/tab2'

class Switch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: null, // VIEW_MODE.PEOPLE or VIEW_MODE.TIME
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { loading } = this.state
    const { height, value } = this.props
    return (
      value !== nextProps.value ||
      height !== nextProps.height ||
      loading !== nextState.loading
    )
  }
  handleChange(value) {
    this.setState({loading: value}, () => {
      setTimeout(() => {
        this.props.onChange(value)
      }, 100)
      setTimeout(() => {
        this.setState({loading: null})
      }, 3000)
    })
  }
  render() {
    const { loading } = this.state
    const { height, size, value } = this.props
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
          <Icon type={loading === VIEW_MODE.PEOPLE ? 'loading':'team'} theme="outlined" style={iconStyle} onClick={e => {
            if (!loading && value !== VIEW_MODE.PEOPLE) {
              this.handleChange(VIEW_MODE.PEOPLE)
            }
          }}/>
        </div>
        <div style={style} className={value === VIEW_MODE.TIME ? 'active':''}>
          <Icon type={loading === VIEW_MODE.TIME ? 'loading':'clock-circle'} theme="outlined" style={iconStyle} onClick={e => {
            if (!loading && value !== VIEW_MODE.TIME) {
              this.handleChange(VIEW_MODE.TIME)
            }
          }}/>
        </div>
      </div>
    )
  }
}

export default Switch
