import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import {
  Icon,
  Table,
  Popover,
  Avatar,
} from 'antd'

import { formatDate } from './utils'
import { primaryColor } from './utils/color'
import List from './List'

const columnWidth = 20

class TimeSchedule extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { height, year, month, optimizedAt } = this.props;
    return (
      height !== nextProps.height ||
      year !== nextProps.year ||
      month !== nextProps.month ||
      optimizedAt < nextProps.optimizedAt
    )
  }
  render() {
    const { height, width, year, month, days, wdays, hours, staffs, schedules, callbacks, onClickStaff } = this.props
    const maxNum = _.chain(callbacks).orderBy(['num'], ['desc']).head().get('num').value()
    const maxCells = _.round(width / columnWidth)
    const perCellNum = _.round(maxNum / maxCells)

    const columns = [{
      key: "day",
      dataIndex: "dayStr",
      width: 50,
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        }
        if (row.date.hours() == 0) {
          obj.props.rowSpan = 24
        } else {
          obj.props.rowSpan = 0
        }
        return obj
      },
    }, {
      key: "hour",
      dataIndex: "hourStr",
      width: 50,
    }]
    let tableWidth = _.sumBy(columns, o => o.width)

    _.each(_.times(maxCells), (v, i) => {
      columns.push({
        key: `cell${i}`,
        dataIndex: `cell${i}`,
        width: columnWidth,
      })
      tableWidth += columnWidth
    })

    const grouped = _.groupBy(staffs, 'id')
    let dataSource = []
    _.each(days, (day, i) => {
      _.each(hours, (hour, j) => {
        const cell = moment(`${formatDate(year, month, day)} ${_.padStart(hour, '0', 2)}:00:00`)
        let data = {
          key: `${i}-${j}`,
          className: "cell",
          dayStr: <div style={{textAlign: 'center'}}>{`${day} (${cell.format('dd')})`}</div>,
          hourStr: <div style={{textAlign: 'right', paddingRight: 6}}>{`${hour}:00`}</div>,
          // hidden
          day: day,
          hour: hour,
          date: cell,
        }
        const onschedules = _.filter(schedules, event => {
          return cell.diff(event.start, 'hours') >= 0 && cell.diff(event.end, 'hours') < 0
        })
        const assignStaffIds = _.chain(onschedules).map('staff_id').uniq().value()
        let renderCells = 0
        const result = _.find(callbacks, o => {
          return cell.diff(o.start, 'hours') >= 0 && cell.diff(o.end, 'hours') < 0
        })
        
        if (result) {
          renderCells = _.round(result.num / perCellNum)
        }
        
        _.each(_.times(maxCells), k => {
          const staff = _.get(grouped, `${assignStaffIds[k]}.0.id`, null)
          data[`cell${k}`] = (
            <div className={(renderCells > 0 && renderCells >= k) ? 'cell':''}>
              {staff && <Avatar style={{backgroundColor: 'white'}} size={16} src={require(`./styles/img/1.svg`)} />}
            </div>
          )
        })
        if (!_.isEmpty(assignStaffIds)) {
          const workingStaffs = _.map(assignStaffIds, id => _.get(grouped, `${id}.0`))
          data[`cell${_.size(assignStaffIds)}`] = (
            <Popover
              trigger="click"
              content={
                <List
                  header={`${month}/${day} ${hour}:00〜 ${_.size(workingStaffs)} 名  (入電数: ${_.get(result, 'num', '-')})`}
                  data={_.map(workingStaffs, staff => {
                    return {
                      icon: require('./styles/img/1.svg'),
                      title: `${staff.first_name} ${staff.last_name}`,
                      onClick: () => onClickStaff(staff.id),
                    }})
                  }/>
              }>
              <div className={_.size(assignStaffIds) <= renderCells ? 'cell':''}>
                <Icon type="caret-down" theme="filled" style={{color: primaryColor, cursor: 'pointer', fontSize: 10}}/>
              </div>
            </Popover>
          )
        }
        if (renderCells > 0) {
          data[`cell${renderCells}`] = <div style={{fontStyle: 'italic', fontSize: 11}}>{_.get(result, 'num', '')}</div>
        }
        dataSource.push(data)
      })
    })
    
    return (
      <div className="schedule">
        <div className={"table"}>
          <Table
            size="middle"
            showHeader={false}
            bordered={false}
            dataSource={dataSource}
            columns={columns} 
            width={tableWidth}
            pagination={false}
            scroll={{y: height, x: tableWidth}}
          />
        </div>
      </div>
    )
  }
}

export default TimeSchedule
