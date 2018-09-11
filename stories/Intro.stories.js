import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { antdDecorator } from './Decorator'
import Intro from '../src/Intro'

storiesOf('Intro', module)
  .addDecorator(getStory => antdDecorator(getStory))
  .add("normal", () => <Intro height={600} width={1000} onClick={action('onClick')} />)
