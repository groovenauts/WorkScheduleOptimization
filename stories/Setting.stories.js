import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { antdDecorator } from './Decorator'
import Setting from '../src/Setting'

let stories = storiesOf('Setting', module)
stories.addDecorator(getStory => antdDecorator(getStory))

stories.add("normal", () => (
  <Setting
    title={"Title"}
    visible={true}
    height={500}
    year={2018}
    month={9}
    onClose={action('onClose')}
    onSubmit={action('onSubmit')}
  />
))
