import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import {
  Icon,
  Table,
  Popover,
} from 'antd'

import { formatDate } from './utils'
import { primaryColor } from './utils/color'

const columnWidth = 20

class EmployeeSchedule extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { height, year, month, schedules } = this.props;
    return (
      height !== nextProps.height ||
      year !== nextProps.year ||
      month !== nextProps.month ||
      _.size(schedules) !== _.size(nextProps.schedules)
    )
  }
  render() {
    const { height, width, year, month, days, wdays, hours, staffs, schedules, onClickStaff } = this.props

    let columns = [{
      key: "index",
      dataIndex: "index",
      title: <div className={"column-header italic"}>No</div>,
      fixed: true,
      width: 20,
    }, {
      key: "name",
      dataIndex: "name",
      title: <span className={"column-name"}>名前</span>,
      fixed: true,
      width: 120,
    }, {
      key: "sumNums",
      dataIndex: "sumNums",
      title: <div className={"column-header"}>出勤数(月)</div>,
      fixed: true,
      width: 70,
    }, {
      key: "sumHours",
      dataIndex: "sumHours",
      title: <div className={"column-header"}>勤務時間(月)</div>,
      fixed: true,
      width: 80,
    }]
    let tableWidth = _.sumBy(columns, o => o.width)
    _.each(days, (day, i) => {
      columns.push({
        key: `day${day}`,
        title: <div className={"column-header"}>{i === 0 ? `${month} / ${day} (${wdays[i]})` : `${day} (${wdays[i]})`}</div>,
        children: _.map(hours, hour => {
          tableWidth += columnWidth
          return {
            key: `day${day}hour${hour}`,
            title: <div className={"column-header"}>{hour}</div>,
            dataIndex: `day${day}hour${hour}`,
            width: columnWidth,
          }
        })
      })
    })

    const grouped = _.groupBy(schedules, 'staff_id')
    const dataSource = _.map(staffs, (staff, i) => {
      let data = {
        key: i,
        index: <div className={"data-index"}>{i}</div>,
        name: <span className={"data-name"} onClick={() => onClickStaff(staff.id)}>{`${staff.first_name} ${staff.last_name}`}</span>,
        ...staff,
      }
      let eventIds = []
      let sumHours = 0
      _.each(days, day => {
        _.each(hours, (hour, j) => {
          let workingHours = 0
          const hourStr = _.padStart(hour, 2, '0')
          const cell = moment(`${formatDate(year, month, day)} ${hourStr}:00:00`)
          let label = null
          
          const onEvent = _.find(_.get(grouped, staff.id, []), event => {
            return cell.diff(event.start, 'hours') >= 0 && cell.diff(event.end, 'hours') < 0
          })
          if (onEvent) {
            const duration = moment.duration(onEvent.end.diff(onEvent.start))
            workingHours = duration.as('hours')
            if (!_.includes(eventIds, onEvent.id)) {
              eventIds.push(onEvent.id)
              sumHours += workingHours
            }
            if (day === onEvent.start.date() && hour === onEvent.start.hour()) {
              label = (
                <Popover
                  content={
                    <span>{`${cell.format('M月D日 (dd)')}  ${onEvent.start.format('H:M')} - ${onEvent.end.format('H:M')} (${workingHours}H)`}</span>
                  }
                  title={
                    <span style={{color: primaryColor, cursor: 'pointer'}} onClick={() => onClickStaff(staff.id)}>
                      {`${staff.first_name} ${staff.last_name}`}
                    </span>}
                  >
                  <p className="label">
                    {`${workingHours}H`}
                  </p>
                </Popover>
              )
            }
          }
          data[`day${day}hour${hour}`] = (onEvent &&
            <div className={"cell" + ` b${workingHours}`}>
              {label}
            </div>
          )
        })
      })
      data['sumNums'] = <span className="to-right">{_.size(eventIds)}</span>
      data['sumHours'] = <span className="to-right">{sumHours}</span>
      return data
    })

    return (
      <div className="schedule">
        <div className={"table"}>
          <Table 
            size="middle"
            bordered={true}
            dataSource={dataSource}
            columns={columns} 
            width={600}
            pagination={false}
            scroll={{y: height, x: tableWidth}}
          />
        </div>
      </div>
    )
  }
}

export default EmployeeSchedule
