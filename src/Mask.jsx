import React from 'react'
import {
  Icon,
} from 'antd'

class Mask extends React.PureComponent {
  render() {
    const { visible, style, text } = this.props
    let defaultStyle = {
      ...style
    }
    if (!visible) {
      defaultStyle['display'] = 'none'
    }
    let children = []
    React.Children.forEach(this.props.children, child => {
      if (child){
        children.push(child);
      }
    })
    return (
      <div id="mask"　style={defaultStyle}>
        <div className={"center slideUp"}>
          {children}
        </div>
      </div>
    )
  }
}

export default Mask
