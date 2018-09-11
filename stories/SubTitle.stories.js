import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { antdDecorator } from './Decorator'
import { SubTitle } from '../src/Intro'

storiesOf('SubTitle', module)
  .addDecorator(getStory => antdDecorator(getStory))
  .addDecorator(getStory => <div style={{height: '100%', background: 'black'}}>{getStory()}</div>)
  .add("normal", () => <SubTitle />)
