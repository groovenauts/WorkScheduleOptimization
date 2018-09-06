import React from 'react'
import {
  Icon,
} from 'antd'

class Processing extends React.PureComponent {
  render() {
    const { visible, text } = this.props
    let style = {}
    if (!visible) {
      style['display'] = 'none'
    }
    return (
      <div id="mask"　style={style}>
        <div className={"center"}>
          <Icon type="loading" theme="outlined" style={{fontSize: 40}} />
          <span>{text}</span>
        </div>
      </div>
    )
  }
}

export default Processing
