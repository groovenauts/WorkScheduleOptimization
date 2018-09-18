import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  LocaleProvider,
  Button,
} from 'antd';
import jaJP from 'antd/lib/locale-provider/ja_JP';

import './styles/index.scss'
import './styles/index.less'

import Header from './Header'
import Switch from './Switch'
import Setting from './Setting'
import Profile from './Profile'
import Intro from './Intro'
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Mask from './Mask'
import Loading from './Loading'
import Background from './Background'

import * as appActions from './actions/app'
import * as tab1Actions from './actions/tab1'
import * as tab2Actions from './actions/tab2'

const HEADER_HEIGHT = 80
const MARGIN_BOTTOM = 30
const MARGIN_WIDTH = 60
const PADDING_SIDE = 26

const ANIMATION_DURATION = 1000

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonFadeOut: false,
    }
  }
  componentDidMount() {
    this.props.actions.loadStaffs()
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize.bind(this))
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.buttonFadeOut && (nextProps.predicted || nextProps.optimized)) {
      return {
        buttonFadeOut: false,
      }
    }
    return null
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
  }
  onWindowResize() {
    this.props.actions.resizeWindow(
      document.body.clientWidth,
      document.body.clientHeight
    );
  }
  renderProfile(visible) {
    const { actions, staffs, results, profileStaffId } = this.props
    let prop = {}
    let staffIndex = -1
    if (!_.isNull(profileStaffId)) {
      staffIndex = _.findIndex(staffs, staff => staff.id == profileStaffId)
      prop = {
        ...staffs[staffIndex],
        schedules: _.filter(results, event => event.staff_id == profileStaffId),
      }
    }
    if (staffIndex !== -1) {
      const prepStaff = staffs[staffIndex - 1]
      const nextStaff = staffs[staffIndex + 1]
      if (prepStaff) {
        prop.onPrev = () => actions.changeProfile(prepStaff.id)
      }
      if (nextStaff) {
        prop.onNext = () => actions.changeProfile(nextStaff.id)
      }
    }
    return (
      <Profile
        visible={visible}
        {...prop}
        onClose={() => actions.closeProfile()}
        />
    )
  }
  renderMask() {
    const { buttonFadeOut } = this.state
    const {
      activeTabKey,
      actions,
      predicting,
      predicted,
      optimizating,
      optimized,
    } = this.props

    const willPredict = (activeTabKey === 1 && !predicting && !predicted)
    const willOptimize = (activeTabKey === 2 && !optimizating && !optimized)
    const visible = predicting || willPredict || optimizating || willOptimize
    let style = {
      top: HEADER_HEIGHT,
      left: PADDING_SIDE,
      right: PADDING_SIDE,
      bottom: MARGIN_BOTTOM,
      borderRadius: '4px',
    }
    return (
      <Mask visible={visible} style={style}>
        <Loading visible={predicting || optimizating} />
        <Button className={`${buttonFadeOut ? 'rocket-launch':'pulse hover-rotate'}`}
          style={_.thru(willPredict, visibleButton => {
            if (!visibleButton) {
              return {display: 'none'}
            }
            return {}
          })}
          type="primary"
          shape="circle"
          icon="rocket"
          size={"large"}
          onClick={()=> {
            this.setState({
              buttonFadeOut: true,
            }, () => setTimeout(() => actions.predict(), ANIMATION_DURATION))
          }}/>
        <Button className={`${buttonFadeOut ? 'rocket-launch':'pulse hover-rotate'}`}
          style={_.thru(willOptimize, visibleButton => {
            if (!visibleButton) {
              return {display: 'none'}
            }
            return {}
          })}
          type="primary"
          shape="circle"
          icon="rocket"
          size={"large"}
          onClick={()=> {
            this.setState({
              buttonFadeOut: true,
            }, () => setTimeout(() => actions.optimize(), ANIMATION_DURATION))
          }}/>
      </Mask>
    )
  }
  render() {
    const {
      started,
      activeTabKey,
      viewMode,
      year,
      month,
      days,
      wdays,
      width,
      height,
      staffs,
      dayOffs,
      visibleSetting,
      visibleNestedProfile,
      actions,
    } = this.props
    const contentWidth = _.isNumber(width) ? (width - MARGIN_WIDTH) : width
    const contentHeight = _.isNumber(height) ? (height - (HEADER_HEIGHT + MARGIN_BOTTOM)) : height
    let components = []
    if (started) {
      components = [
        <Header
          key="header"
          activeKey={activeTabKey}
          year={year}
          month={month}
          onChange={key => actions.changeTab(key)}
          onClickSetting={() => actions.showSetting()}
          >
          {activeTabKey === 2 &&
            <Switch
              value={viewMode}
              onChange={v => actions.changeViewMode(v)}
            />
          }
        </Header>,
        <Tab1 key="page1"
          visible={activeTabKey === 1}
          width={contentWidth}
          height={contentHeight}
          />,
        <Tab2 key="page2"
          visible={activeTabKey === 2}
          width={contentWidth}
          height={contentHeight} />
      ]
    } else {
      components = [
        <Intro
          key="intro"
          height={height}
          width={width}
          onClick={() => actions.start()}
        />
      ]
    }
    return (
      <div id="container" className="gradiention">
        <LocaleProvider locale={jaJP}>
          <Background height={height} width={width}>
            {components}
            <Setting
              title={"設定"}
              width={800}
              height={height}
              year={year}
              month={month}
              days={days}
              wdays={wdays}
              staffs={staffs}
              dayOffs={dayOffs}
              visible={visibleSetting}
              onClickStaff={id => actions.showProfileInSetting(id)}
              onClose={() => actions.closeSetting()}
              onSubmit={(dayOffs) => {
                actions.closeSetting()
                actions.optimize()
                actions.updateDayOffs(dayOffs)
              }}>
              { this.renderProfile(visibleNestedProfile) }
            </Setting>
            }
          </Background>
        </LocaleProvider>
        {started && this.renderMask()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    width: state.app.width,
    height: state.app.height,
    started: state.app.started,
    activeTabKey: state.app.activeTabKey,
    year: state.app.year,
    month: state.app.month,
    days: state.app.days,
    wdays: state.app.wdays,
    viewMode: state.tab2.viewMode,
    staffs: state.tab2.staffs,
    predicting: state.tab1.predicting,
    predicted: state.tab1.predicted,
    predictResults: state.tab1.results,
    optimizating: state.tab2.optimizating,
    optimized: state.tab2.optimized,
    optimizeResults: state.tab2.results,
    dayOffs: state.tab2.dayOffs,
    visibleSetting: state.tab2.visibleSetting,
    visibleNestedProfile: state.tab2.visibleNestedProfile,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Object.assign({}, appActions, tab1Actions, tab2Actions), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
