import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'

import { antdDecorator } from './Decorator'
import Calendar from '../src/Calendar'

let stories = storiesOf('Calendar', module)
stories.addDecorator(getStory => antdDecorator(getStory))

stories.add("normal", () => (
  <Calendar />
))


stories.add("exist events", () => {
  const now = moment()
  const schedules = [{
    id: _.uniqueId(),
    start: now,
    end: now.add(4, 'hours'),
  }]
  return <Calendar schedules={schedules} />

})
