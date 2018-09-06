import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'

import { antdDecorator } from './Decorator'
import Mask from '../src/Mask'
import Loading from '../src/Loading'

storiesOf('Mask/Loading', module)
  .addDecorator(getStory => antdDecorator(getStory))
  .add("normal", () => <Mask visible={true}><Loading /></Mask>)
  .add("with text", () => <Mask visible={true}><Loading text={"Loading..."} /></Mask>)
