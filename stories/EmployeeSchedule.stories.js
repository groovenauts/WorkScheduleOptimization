import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
moment.locale(window.navigator.userLanguage || window.navigator.language)

import { optimizeWithoutPredict } from '../src/actions/tab2'
import { antdDecorator } from './Decorator'
import EmployeeSchedule from '../src/EmployeeSchedule'

let stories = storiesOf('EmployeeSchedule', module)
stories.addDecorator(getStory => antdDecorator(getStory))

const staffs = require('../data/staffs.ja.json')
const days = _.times(moment(`${2018}-${_.padStart(9, 2, '0')}`).daysInMonth(), n => n + 1)
const wdays = _.map(days, day => moment(`${2018}-${_.padStart(9, 2, '0')}-${_.padStart(day, 2, '0')}`).format('dd'))

const defaultProps = {
  year: 2018,
  month: 9,
  days: days,
  wdays: wdays,
  hours: _.times(24),
  width: 800,
  height: 500,
  staffs: staffs,
  onClickStaff: action('onClickStaff'),
}

stories.add("normal", () => (
  <EmployeeSchedule
    {...defaultProps}
    schedules={_.map([
      {
        id: "abc01",
        staff_id: _.chain(staffs).head().get('id').value(),
        startDate: "2018-09-02T07:00:00.000Z",
        endDate: "2018-09-02T14:00:00.000Z"
      },
      {
        id: "abc02",
        staff_id: _.chain(staffs).head().get('id').value(),
        startDate: "2018-09-25T03:00:00.000Z",
        endDate: "2018-09-25T10:00:00.000Z"
      },
    ], event => {
      return {
        ...event,
        start: moment(event.startDate),
        end: moment(event.endDate),
      }
    })}
    />
))
stories.add("generated schedules", () => (
  <EmployeeSchedule
    {...defaultProps}
    schedules={optimizeWithoutPredict(defaultProps.year, defaultProps.month, staffs)}
    />
))
