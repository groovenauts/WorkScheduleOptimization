import React from 'react'
import _ from 'lodash'
import Typist from 'react-typist'

import Background from './Background'

class Intro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typed: false,
      fadeOut: false,
      visibility: 'visible',
    }
  }
  componentDidUpdate(nextProps, prevState) {
    const { fadeOut } = this.state
    const { onClick } = this.props
    if (!prevState.fadeOut && fadeOut) {
      setTimeout(() => {
        this.setState({
          visibility: 'hidden'
        }, () => onClick())
      }, 1000)
    }
  }
  componentWillUnmount() {
    window.$.firefly.pause(true)
  }
  render() {
    const { typed, fadeOut } = this.state
    const { height, width } = this.props
    return (
      <div id="intro">
        <Background height={height} width={width}>
          <div className={`center ${fadeOut ? 'exit':''}`} style={{
              visibility: this.state.visibility
            }}>
            <a className="white-logo" href="https://www.magellanic-clouds.com/blocks/" target="_blank"/>
            <div style={{marginTop: 50, marginBottom: 30, }}>
              <SubTitle onFinish={() => setTimeout(() => {
                this.setState({typed: true})
              }, 1000)}/>
            </div>
            {typed &&
              <button className={`button slideUp`} 
                onClick={() => this.setState({fadeOut: true})}>
                DEMO
              </button>
            }
          </div>
        </Background>
        <a className="footer-logo" href="https://www.groovenauts.jp/" target="_blank" />
      </div>
    )
  }
}

export class SubTitle extends React.Component {
  render() {
    const { onFinish } = this.props
    const textStyle = {
      color: 'white',
      fontSize: 30,
    }
    return (
      <Typist startDelay={1000} loop={true}
        onTypingDone={()=> _.isFunction(onFinish) ? onFinish():{}}>
        <span style={textStyle}>{"コールセンター　"}</span>
        <Typist.Delay ms={1000} />
        <span style={textStyle}>{"入電数予測 ✕ シフト最適化"}</span>
      </Typist>
    )
  }
}

export default Intro
