import React from 'react'
import _ from 'lodash'
import {
  Calendar as AntdCalendar,
  Badge,
} from 'antd'

class Calendar extends React.Component {
  renderCell(value={}) {
    const { schedules, onRenderCell } = this.props
    const event = _.find(schedules || [], e => {
      return (
        value.year() === e.start.year() &&
        value.month() === e.start.month() &&
        value.date() === e.start.date()
      )
    })

    if (event) {
      if (_.isFunction(onRenderCell)) {
        return onRenderCell(event.id, event.start, event.end)
      } else {
        const text = `${event.start.utc().format('HH:MM')} - ${event.end.utc().format('HH:MM')}`
        return <Badge status={'error'} text={text} />
      }
    }
    return null;
  }
  onSelect(value) {
    const { onSelect } = this.props
    if (_.isFunction())
    onSelect(value)
  }
  render() {
    return (
      <div className="calendar">
        <AntdCalendar
          {...this.props}
          mode="month"
          dateCellRender={this.renderCell.bind(this)}
          onSelect={this.onSelect.bind(this)}
          />
      </div>
    )
  }
}

export default Calendar
