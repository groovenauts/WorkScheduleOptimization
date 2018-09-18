import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { antdDecorator } from './Decorator'
import Background from '../src/Background'

storiesOf('Background', module)
  .addDecorator(getStory => antdDecorator(getStory))
  .addDecorator(getStory => <div style={{background: '#070182', height: 400, width: 400}}>{getStory()}</div>)
  .add("normal", () => <Background height={400} width={400} />)
