import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
moment.locale(window.navigator.userLanguage || window.navigator.language)

import { antdDecorator } from './Decorator'
import EmployeeSchedule from '../src/EmployeeSchedule'

let stories = storiesOf('EmployeeSchedule', module)
stories.addDecorator(getStory => antdDecorator(getStory))

const staffs = _.sampleSize(require('../data/staffs.json'), 30)
const days = _.times(moment(`${2018}-${_.padStart(9, 2, '0')}`).daysInMonth(), n => n + 1)
const wdays = _.map(days, day => moment(`${2018}-${_.padStart(9, 2, '0')}-${_.padStart(day, 2, '0')}`).format('dd'))

stories.add("normal", () => (
  <EmployeeSchedule
    year={2018}
    month={9}
    days={days}
    wdays={wdays}
    hours={_.times(24)}
    height={500}
    staffs={staffs}
    events={[
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
    ]}
    onClickStaff={action('onClickStaff')}
    />
))
