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
    
    let tableWidth = 0
    let columns = _.map(days, (day, i) => {
      return {
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
      }
    })
    columns.unshift({
      key: "name",
      dataIndex: "name",
      title: <span className={"column-name"}>名前</span>,
      fixed: true,
      width: 160,
    })
    tableWidth += 160

    columns.unshift({
      key: "index",
      dataIndex: "index",
      title: <span className={"column-header"}>No</span>,
      fixed: true,
      width: 20,
    })
    tableWidth += 20


    const grouped = _.groupBy(events, 'staff_id')
    const dataSource = _.map(staffs, (staff, i) => {
      let data = {
        key: i,
        index: <div className={"data-index"}>{i}</div>,
        name: <span className={"data-name"} onClick={() => onClickStaff(staff.id)}>{`${staff.first_name} ${staff.last_name}`}</span>,
        ...staff,
        labeled: false,
      }
      _.each(days, day => {
        _.each(hours, (hour, j) => {
          const hourStr = _.padStart(hour, 2, '0')
          const cell = moment(`${formatDate(year, month, day)} ${hourStr}:00:00`)
          let label = null
          let workingHours = null
          const onEvent = _.find(_.get(grouped, staff.id, []), event => {
            return cell.diff(event.start, 'hours') >= 0 && cell.diff(event.end, 'hours') < 0
          })
          if (onEvent) {
            const duration = moment.duration(onEvent.end.diff(onEvent.start))
            workingHours = duration.as('hours')
            if (!data.labeled) {
              label = (
                <Popover
                  content={
                    <div>
                      <span>{`${cell.format('M月D日 (dd)')}  ${onEvent.start.format('HH:MM')} - ${onEvent.end.format('HH:MM')} (${workingHours}H)`}</span>
                      <br />
                      <span style={{fontSize: 11, color: blue400, cursor: 'pointer'}} onClick={() => onClickStaff(staff.id)}>
                        {`${staff.first_name} ${staff.last_name} のスケジュールを見る`}
                        <Icon type="eye" theme="outlined" style={{marginLeft: 4}}/>
                      </span>
                    </div>
                  }
                  >
                  <p className="label">
                    {`${workingHours}H`}
                  </p>
                </Popover>
              )
              data.labeled = true
            }
          }
          data[`day${day}hour${hour}`] = (onEvent &&
            <div className={"cell" + ` b${workingHours}`}>
              {label}
            </div>
          )
        })
      })
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
