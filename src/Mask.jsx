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
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Processing
