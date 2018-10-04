import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
moment.locale(window.navigator.userLanguage || window.navigator.language)

import { antdDecorator } from './Decorator'
import MonthlyTable from '../src/MonthlyTable'

let stories = storiesOf('MonthlyTable', module)
stories.addDecorator(getStory => antdDecorator(getStory))

const staffs = _.sampleSize(require('../data/staffs.ja.json'), 30)
const days = _.times(moment(`${2018}-${_.padStart(9, 2, '0')}`).daysInMonth(), n => n + 1)
const wdays = _.map(days, day => moment(`${2018}-${_.padStart(9, 2, '0')}-${_.padStart(day, 2, '0')}`).format('dd'))

stories.add("normal", () => (
  <MonthlyTable
    year={2018}
    month={9}
    days={days}
    wdays={wdays}
    hours={_.times(24)}
    height={500}
    staffs={staffs}
    dayOffs={[
      {
        id: "abc01",
        staff_id: _.chain(staffs).head().get('id').value(),
        year: 2018,
        month: 9,
        day: 1,
      },
      {
        id: "abc02",
        staff_id: _.chain(staffs).head().get('id').value(),
        year: 2018,
        month: 9,
        day: 15,
      },
    ]}
    onClickCell={action('onClickCell')}
    onUnClickCell={action('onUnClickCell')}
    onClickStaff={action('onClickStaff')}
  />
))
