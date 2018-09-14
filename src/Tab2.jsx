import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  Button,
  Icon,
} from 'antd';

import EmployeeSchedule from './EmployeeSchedule'
import Profile from './Profile'

import * as actions from './actions/tab2'

const TABLE_HEADER_HEIGHT = 44

class Tab2 extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { visible } = this.props
    return visible || nextProps.visible
  }
  renderProfile() {
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
        visible={true}
        {...prop}
        onClose={() => actions.closeProfile()}
        />
    )
  }
  render() {
    const { visible, year, month, days, wdays, hours, height, actions, staffs, results, loadingStaffs, visibleProfile, optimizating } = this.props
    return (
      <div id="tab2" style={visible ? {} : {display: 'none'}}>
        <div className="content-wrapper fadeIn">
          <EmployeeSchedule
            year={year}
            month={month}
            days={days}
            wdays={wdays}
            hours={hours}
            height={height - TABLE_HEADER_HEIGHT}
            staffs={staffs}
            events={results}
            onClickStaff={id => actions.showProfile(id)}
            />
        </div>
        { visibleProfile && this.renderProfile() }
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
    staffs: state.tab2.staffs,
    results: state.tab2.results,
    dayOffs: state.tab2.dayOffs,
    loadingStaffs: state.tab2.loadingStaffs,
    optimizating: state.tab2.optimizating,
    profileStaffId: state.tab2.profileStaffId,
    visibleProfile: state.tab2.visibleProfile,
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
