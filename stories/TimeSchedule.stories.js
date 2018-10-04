import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'

import { getLanguage } from '../src/i18n'
moment.locale(getLanguage())
import { antdDecorator } from './Decorator'
import TimeSchedule from '../src/TimeSchedule'
import { predictResult } from '../src/actions/tab1'
import { optimizeWithPredict } from '../src/actions/tab2'
import { randomString } from '../src/utils'

let stories = storiesOf('TimeSchedule', module)
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
  <TimeSchedule
    {...defaultProps}
    callbacks={predictResult(defaultProps.month, defaultProps.days, _.size(staffs))}
    schedules={_.map([
      {
        id: randomString(6),
        staff_id: _.get(staffs, '0.id'),
        startDate: "2018-09-02T07:00:00.000Z",
        endDate: "2018-09-02T14:00:00.000Z"
      },
      {
        id: randomString(6),
        staff_id: _.get(staffs, '1.id'),
        startDate: "2018-09-02T10:00:00.000Z",
        endDate: "2018-09-02T18:00:00.000Z"
      },
      {
        id: randomString(6),
        staff_id: _.get(staffs, '2.id'),
        startDate: "2018-09-02T10:00:00.000Z",
        endDate: "2018-09-02T11:00:00.000Z"
      },
      {
        id: randomString(6),
        staff_id: _.get(staffs, '0.id'),
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
stories.add("generated schedules", () => {
  const predictedResults = predictResult(defaultProps.year, defaultProps.month, _.size(staffs))
  const optimizedResults = optimizeWithPredict(defaultProps.year, defaultProps.month, staffs, predictedResults)
  return (
    <TimeSchedule
      {...defaultProps}
      callbacks={predictedResults}
      schedules={optimizedResults}
      />
  )
})
