import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { antdDecorator } from './Decorator'
import Header from '../src/Header'

storiesOf('Header', module)
  .addDecorator(getStory => antdDecorator(getStory))
  .add("active is 1", () => <Header
    activeKey={1}
    year={2018}
    month={9}
    onChange={action('onChange')}
    onClickSetting={action('onClickSetting')}
  />)
  .add("active is 2", () => <Header
    activeKey={2}
    year={2018}
    month={9}
    onChange={action('onChange')}
    onClickSetting={action('onClickSetting')}
  />)
