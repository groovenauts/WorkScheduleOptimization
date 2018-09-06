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
import Mask from './Mask'
import Loading from './Loading'

import * as actions from './actions/tab2'

const TAB_HEIGHT = 44
const TABLE_HEADER = 44
const MARGIN_BOTTOM = 40

class Tab2 extends React.Component {
  componentDidMount() {
    const { actions } = this.props
    actions.loadStaffs()
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
        onClose={() => actions.changeProfile()}
        />
    )
  }
  render() {
    const { year, month, days, wdays, hours, height, actions, staffs, results, dayOffs, loadingStaffs, visibleProfile, visibleNestedProfile, visibleSetting, optimizating } = this.props
    return (
      <div id="tab2" ref={refs => this.element = refs}>
        <Gunttchart
          year={year}
          month={month}
          days={days}
          wdays={wdays}
          hours={hours}
          height={height - (TAB_HEIGHT + TABLE_HEADER + MARGIN_BOTTOM)}
          staffs={staffs}
          events={results}
          onClickStaff={id => actions.showProfile(id)}
          />
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
            actions.updateDayOffs(dayOffs)
            actions.optimize()
          }}>
          { this.renderProfile(visibleNestedProfile) }
        </Setting>
        { this.renderProfile(visibleProfile) }
        <Mask visible={loadingStaffs || optimizating || _.isEmpty(results)}>
          { loadingStaffs ? null :
            optimizating ? <Loading text={optimizating && "シフトを最適化しています"} /> :
            _.isEmpty(results) ? 
            <Button type="primary" onClick={ ()=>actions.optimize() }>
              最適化する
            </Button>
            : null
          }
        </Mask>
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
    loadingStaffs: state.tab2.loadingStaffs,
    optimizating: state.tab2.optimizating,
    profileStaffId: state.tab2.profileStaffId,
    visibleProfile: state.tab2.visibleProfile,
    visibleNestedProfile: state.tab2.visibleNestedProfile,
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
