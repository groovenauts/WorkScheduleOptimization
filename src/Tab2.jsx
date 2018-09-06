import React from 'react'
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  Button,
  Icon,
} from 'antd';

import Gunttchart from './Gunttchart'
import Setting from './Setting'
import Profile from './Profile'
import Predicting from './Processing'

import * as actions from './actions/tab2'

const TAB_HEIGHT = 44
const TAB_CONTAINER_HEADER = 32
const TABLE_HEADER = 44
const MARGIN_BOTTOM = 50

class Tab2 extends React.Component {
  componentDidMount() {
    const { actions } = this.props
    actions.loadStaffs()
  }
  render() {
    const { year, month, days, wdays, hours, height, actions, staffs, results, dayOffs, profileStaffId, visibleProfile, visibleSetting, optimizating } = this.props
    return (
      <div id="tab2" ref={refs => this.element = refs}>
        <div className="header">
          <div></div>
          <Button type="primary" onClick={ ()=>actions.optimize() }>
            最適化する
          </Button>
          <Icon type="setting" theme="filled" onClick={ ()=>actions.showSetting() }/>
        </div>
        <Gunttchart
          year={year}
          month={month}
          days={days}
          wdays={wdays}
          hours={hours}
          height={height - (TAB_HEIGHT + TAB_CONTAINER_HEADER + TABLE_HEADER + MARGIN_BOTTOM)}
          staffs={staffs}
          events={results}
          onClickStaff={id => actions.showProfile(id)}
          />
        <Setting
          title={`休日設定 (${year}/${month})`}
          width={800}
          height={height}
          year={year}
          month={month}
          days={days}
          wdays={wdays}
          staffs={staffs}
          dayOffs={dayOffs}
          visible={visibleSetting}
          onClickStaff={id => actions.showProfile(id)}
          onClose={() => actions.closeSetting()}
          onSubmit={(dayOffs) => actions.updateDayOffs(dayOffs)}
          />
        <Profile
          visible={visibleProfile}
          {..._.isNull(profileStaffId) ? {} : {
            ..._.find(staffs, staff => staff.id == profileStaffId),
            schedules: _.filter(results, event => event.staff_id == profileStaffId),
          }}
          onClose={() => actions.closeProfile()}
          />
        <Predicting visible={optimizating} text={"シフトを最適化しています"}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    year: state.app.year,
    month: state.app.month,
    days: state.app.days,
    wdays: state.app.wdays,
    hours: state.app.hours,
    height: state.app.height,
    staffs: state.tab2.staffs,
    results: state.tab2.results,
    dayOffs: state.tab2.dayOffs,
    optimizating: state.tab2.optimizating,
    profileStaffId: state.tab2.profileStaffId,
    visibleProfile: state.tab2.visibleProfile,
    visibleSetting: state.tab2.visibleSetting,
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
)(Tab2)
