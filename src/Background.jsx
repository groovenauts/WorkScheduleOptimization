import React from 'react'
import _ from 'lodash'

const random = (min, max) => Math.floor(Math.random() * (max - min) + min)

const createDots = (maxTop, maxLeft, num=200) => {
  return _.map(_.times(num), i => {
    return {
      top: Math.floor(Math.random() * (maxTop || document.body.clientHeight)),
      left: Math.floor(Math.random() * (maxLeft || document.body.clientWidth)),
      size: random(2, 5),
    }
  })
}

class Background extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: props.height,
      width: props.width,
      dots: createDots(props.height, props.width)
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.height !== nextProps.height || prevState.width !== nextProps.width) {
      return {
        height: nextProps.height,
        width: nextProps.width,
        dots: createDots(nextProps.height, nextProps.width)
      }
    }
    return null
  }
  render() {
    const { dots } = this.state
    let children = []
    React.Children.forEach(this.props.children, child => {
      if (child){
        children.push(child);
      }
    })
    return (
      <div style={{height: '100%', width: '100%'}}>
        {_.map(dots, (o, i) => {
          return (
            <div key={`dot-${i}`} style={{
              position: 'absolute',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '50%',
              top: o.top,
              left: o.left,
              height: o.size,
              width: o.size,
            }}></div>
          )
        })}
        {children}
      </div>
    )
  }
}

export default Background
