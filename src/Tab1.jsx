import React from 'react'
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  Button,
} from 'antd';

import { blue400 } from './utils/color'
import BarChart from './BarChart'
import Predicting from './Processing'

import * as actions from './actions/tab1'

const TAB_HEIGHT = 44
const TAB_CONTAINER_HEADER = 32
const MARGIN_BOTTOM = 40

class Tab1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    this.props.actions.init()
  }
  render() {
    const { actions, width, height, month, predicting, results } = this.props
    return (
      <div id="tab1" ref={refs => this.element = refs}>
        <div className="header">
          <Button type="primary" onClick={ ()=> actions.predict() }>
            予測する
          </Button>
        </div>
        {_.isNumber(width) && _.isNumber(height) &&
          <BarChart
            width={width - 40}
            height={height - (TAB_HEIGHT + TAB_CONTAINER_HEADER + MARGIN_BOTTOM)}
            data={results}
            xDataKey={'day'}
            yDataKeys={[{key: 'num', label: `${month}月`, color: blue400}]}
            />
        }
        <Predicting visible={predicting} text={"入電を予測中"}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    width: state.app.width,
    height: state.app.height,
    month: state.app.month,
    predicting: state.tab1.predicting,
    results: state.tab1.results,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tab1)
