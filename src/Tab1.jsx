import React from 'react'
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  Button,
} from 'antd';

import t from './i18n'
import { primaryColor } from './utils/color'
import BarChart from './BarChart'

import * as actions from './actions/tab1'

class Tab1 extends React.Component {
  componentDidMount() {
    this.props.actions.init()
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { visible } = this.props
    return visible || nextProps.visible
  }
  render() {
    const { visible, width, height, year, month, results } = this.props
    const formated = _.map(results, o => {
      return {
        ...o,
        label: `${o.start.format("M/D H:00")}-${o.end.format("H:00")}`,
      }
    })
    return (
      <div id="tab1" style={visible ? {} : {display: 'none'}}>
        <div className="content-wrapper">
          {_.isNumber(width) && _.isNumber(height) &&
            <BarChart
              width={width}
              height={height}
              data={formated}
              xDataKey={'label'}
              yDataKeys={[{key: 'num', label: t("main.numOfPredicted"), color: primaryColor}]}
              strokeColor={primaryColor}
              />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    year: state.app.year,
    month: state.app.month,
    predicting: state.tab1.predicting,
    predicted: state.tab1.predicted,
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
