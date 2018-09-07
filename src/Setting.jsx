import _ from 'lodash';
import React from 'react';
import {
  Drawer,
  Button,
} from 'antd';

import MonthlyTable from './MonthlyTable'
import { randomString } from './utils'

const HEADER_HEIGHT = 55
const FOOTER_HEIGHT = 72
const TABLE_HEADER_HEIGHT = 64
const MARGIN = 10

class Setting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editDate: null,
      dayOffs: props.dayOffs || [],
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { editDate } = this.state
    const { width, height, visible } = this.props;
    return (
      editDate !== nextState.editDate ||
      width !== nextProps.width ||
      height !== nextProps.height ||
      visible !== nextProps.visible
    )
  }
  render() {
    const { editDate, dayOffs } = this.state
    const {
      title,
      width,
      height,
      visible,
      year,
      month,
      days,
      wdays,
      staffs,
      onClickStaff,
      onSubmit,
      onClose,
    } = this.props;
    return (
      <Drawer
        className={"setting"}
        title={title}
        width={width || 600}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        >
        <div className="label">
          <span style={{marginRight: 6}}>{`休日設定: ${year}/${month}`}</span>
        </div>
        <MonthlyTable
          height={height - (HEADER_HEIGHT + FOOTER_HEIGHT + TABLE_HEADER_HEIGHT + MARGIN)}
          year={year}
          month={month}
          days={days}
          wdays={wdays}
          staffs={staffs}
          dayOffs={dayOffs}
          onUnClickCell={eventId => {
            this.setState({
              editDate: new Date(),
              dayOffs: _.reject(dayOffs, {id: eventId})
            })
          }}
          onClickCell={(staffId, year, month, day) => {
            this.setState({
              editDate: new Date(),
              dayOffs: _.concat(dayOffs, [{
                id: randomString(6),
                staff_id: staffId,
                year: year,
                month: month,
                day: day,
              }])
            })
          }}
          onClickStaff={staffId => onClickStaff(staffId)}
        />
        {this.props.children}
        <div className="footer">
          <Button onClick={() => onClose()}>{"キャンセル"}</Button>
          <Button type="primary" style={{marginLeft: 10}} onClick={editDate ? ()=>onSubmit(dayOffs) : ()=>{}} disabled={!editDate}>{"最適化する"}</Button>
        </div>
      </Drawer>
    )
  }
}
export default Setting;
