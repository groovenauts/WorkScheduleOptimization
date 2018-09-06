import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'

import { antdDecorator } from './Decorator'
import Profile from '../src/Profile'

let stories = storiesOf('Profile', module)
stories.addDecorator(getStory => antdDecorator(getStory))

stories.add("normal", () => {
  const profile = {
    id: "2",
    first_name: "福岡",
    last_name: "勘太郎",
    name_yomi: "フクオカ　カンタロウ",
    gender: "男",
    birthday: "1986/8/1",
    phone: "090-0724-2607",
    email: "mGEBtkg@sample.jp"
  }
  const schedules = [{
    start: moment(),
    end: moment().add(4, 'hours'),
  }]
  return (
    <Profile
      visible={true}
      schedules={schedules}
      onClose={action("onClose")}
      {...profile}
    />
  )
})
