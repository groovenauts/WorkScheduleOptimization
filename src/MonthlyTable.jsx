import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import {
  Icon,
  Table,
} from 'antd'

import t, { getLanguage }  from './i18n'
moment.locale(getLanguage())

class MonthlyTable extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { dayOffs } = this.props;
    return !_.isEqual(dayOffs, nextProps.dayOffs)
  }
  render() {
    const { year, month, days, wdays, height, staffs, dayOffs, onClickStaff, onClickCell, onUnClickCell } = this.props
    const columnWidth = 20
    let columns = _.map(days, (day, i) => {
      return {
        key: `day${day}`,
        title: (
          <div style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <span style={{fontSize: 12}}>{day}</span>
            <span style={{fontSize: 10, color: 'gray'}}>{wdays[i]}</span>
          </div>
        ),
        dataIndex: `day${day}`,
        // hiddens
        width: columnWidth,
        day: day,
      }
    })
    columns.unshift({
      key: "name",
      dataIndex: "name",
      title: <span className={"column-name"}>{t("main.name")}</span>,
      fixed: true,
      width: 120,
    })
    columns.unshift({
      key: "index",
      dataIndex: "index",
      title: <span className={"column-header italic"}>{t("main.number")}</span>,
      fixed: true,
      width: 20,
    })

    const mapping = _.reduce(dayOffs, (acc, e) => {
      _.set(acc, `${e.staff_id}.${e.day}`, e)
      return acc
    }, {})

    const dataSource = _.map(staffs, (staff, i) => {
      let data = {
        key: i,
        index: <div className={"data-index"}>{i}</div>,
        name: <span className="data-name" onClick={() => onClickStaff(staff.id)}>{`${staff.first_name} ${staff.last_name}`}</span>
      }
      _.each(columns, column => {
        if (/^day/.test(column.dataIndex)) {
          const event = _.get(mapping, `${staff.id}.${column.day}`)
          data[`${column.dataIndex}`] = (
            <div
              className="table-cell"
              onClick={() => {
                if (event) {
                  if (_.isFunction(onUnClickCell)) {
                    onUnClickCell(event.id)
                  }
                } else {
                  if (_.isFunction(onClickCell)) {
                    onClickCell(staff.id, year, month, column.day)
                  }
                }
              }}>
              {event && <Icon type="star" theme="filled" className="vacation-icon bigEntrance" />}
            </div>
          )
        }
      })
      return data
    })

    return (
      <div className="monthly-table">
        <Table 
          size="middle"
          dataSource={dataSource}
          columns={columns}
          bordered={true}
          pagination={false}
          scroll={{y: height}}
        />
      </div>
    )
  }
}

export default MonthlyTable
