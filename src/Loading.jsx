import React from 'react'
import {
  Icon,
} from 'antd'

class Loading extends React.PureComponent {
  render() {
    const { visible, text } = this.props
    let style = {}
    if (!visible) {
      style['display'] = 'none'
    }
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Icon type="loading" theme="outlined" style={{fontSize: 40, marginBottom: 20}} />
        <span style={{fontSize: 14}}>{text}</span>
      </div>
    )
  }
}

export default Loading
