import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
moment.locale(window.navigator.userLanguage || window.navigator.language)

import { antdDecorator } from './Decorator'
import TimeSchedule from '../src/TimeSchedule'
import { predicResult } from '../src/actions/tab1'
import { randomString } from '../src/utils'

let stories = storiesOf('TimeSchedule', module)
stories.addDecorator(getStory => antdDecorator(getStory))

const staffs = _.sampleSize(require('../data/staffs.json'), 30)
const days = _.times(moment(`${2018}-${_.padStart(9, 2, '0')}`).daysInMonth(), n => n + 1)
const wdays = _.map(days, day => moment(`${2018}-${_.padStart(9, 2, '0')}-${_.padStart(day, 2, '0')}`).format('dd'))
const ret1 = predicResult(2018, 9, _.size(staffs))

stories.add("normal", () => (
  <TimeSchedule
    year={2018}
    month={9}
    days={days}
    wdays={wdays}
    hours={_.times(24)}
    width={800}
    height={500}
    staffs={staffs}
    callbacks={ret1}
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
    onClickStaff={action('onClickStaff')}
    />
))
