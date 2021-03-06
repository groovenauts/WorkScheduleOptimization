import React from 'react'
import {
  FulfillingBouncingCircleSpinner,
  SemipolarSpinner,
  TrinityRingsSpinner,
  AtomSpinner,
  HalfCircleSpinner,
} from 'react-epic-spinners'

import { primaryColor } from './utils/color'

class Loading extends React.PureComponent {
  render() {
    const { visible, text } = this.props
    let style = {}
    if (!visible) {
      style['display'] = 'none'
    }
    const loadingComponent = _.sample([
      FulfillingBouncingCircleSpinner,
      SemipolarSpinner,
      TrinityRingsSpinner,
      AtomSpinner,
      HalfCircleSpinner,
    ])
    return (
      <div style={_.defaults(style, {display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'})}>
        {React.createElement(loadingComponent, {
          color: primaryColor,
          size: "40",
        })}
        {text && <span style={{fontSize: 14, marginTop: 20}}>{text}</span>}
      </div>
    )
  }
}

export default Loading
