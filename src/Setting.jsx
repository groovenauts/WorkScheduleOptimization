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
      dayOffs: props.dayOffs || [],
    }
  }
  render() {
    const { dayOffs } = this.state
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
              dayOffs: _.reject(dayOffs, {id: eventId})
            })
          }}
          onClickCell={(staffId, year, month, day) => {
            this.setState({
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
        <div className="footer">
          <Button onClick={() => onClose()}>{"キャンセル"}</Button>
          <Button type="primary" style={{marginLeft: 10}} onClick={() => onSubmit(dayOffs)}>{"設定完了"}</Button>
        </div>
      </Drawer>
    )
  }
}
export default Setting;
