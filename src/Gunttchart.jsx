import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import {
  Icon,
  Table,
  Popover,
} from 'antd'

import { offset, formatDate } from './utils'
import { blue400 } from './utils/color'

const columnWidth = 20

class Gunttchart extends React.Component {
  render() {
    const { height, year, month, days, wdays, hours, staffs, events, onClickStaff } = this.props
    
    let columns = [{
      key: "index",
      dataIndex: "index",
      title: <div className={"column-header"}>No</div>,
      fixed: true,
      width: 20,
    }, {
      key: "name",
      dataIndex: "name",
      title: <span className={"column-name"}>名前</span>,
      fixed: true,
      width: 120,
    }, {
      key: "sumDays",
      dataIndex: "sumDays",
      title: <div className={"column-header"}>日数</div>,
      fixed: true,
      width: 30,
    }, {
      key: "sumHours",
      dataIndex: "sumHours",
      title: <div className={"column-header"}>時間</div>,
      fixed: true,
      width: 30,
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

    const grouped = _.groupBy(events, 'staff_id')
    const dataSource = _.map(staffs, (staff, i) => {
      let data = {
        key: i,
        index: <div className={"data-index"}>{i}</div>,
        name: <span className={"data-name"} onClick={() => onClickStaff(staff.id)}>{`${staff.first_name} ${staff.last_name}`}</span>,
        ...staff,
      }
      let sumDays = 0
      let sumHours = 0
      _.each(days, day => {
        let workingHours = 0
        _.each(hours, (hour, j) => {
          const hourStr = _.padStart(hour, 2, '0')
          const cell = moment(`${formatDate(year, month, day)} ${hourStr}:00:00`)
          let label = null
          
          const onEvent = _.find(_.get(grouped, staff.id, []), event => {
            return cell.diff(event.start, 'hours') >= 0 && cell.diff(event.end, 'hours') < 0
          })
          if (onEvent) {
            const duration = moment.duration(onEvent.end.diff(onEvent.start))
            if (workingHours === 0) {
              workingHours = duration.as('hours')
              label = (
                <Popover
                  content={
                    <span>{`${cell.format('M月D日 (dd)')}  ${onEvent.start.format('HH:MM')} - ${onEvent.end.format('HH:MM')} (${workingHours}H)`}</span>
                  }
                  title={
                    <span style={{color: blue400, cursor: 'pointer'}} onClick={() => onClickStaff(staff.id)}>
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
        sumHours += workingHours
        if (workingHours > 0) {
          sumDays += 1
        }
      })
      data['sumDays'] = <span className="to-right">{sumDays}</span>
      data['sumHours'] = <span className="to-right">{sumHours}</span>
      return data
    })

    return (
      <div className="gunttchart">
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

export default Gunttchart
