import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { antdDecorator } from './Decorator'
import Header from '../src/Header'
import Switch from '../src/Switch'

storiesOf('Header', module)
  .addDecorator(getStory => antdDecorator(getStory))
  .addDecorator(getStory => <div style={{background: '#070182', height: '100%', padding: 20}}>{getStory()}</div>)
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
  .add("with Switch", () => (
    <Header
      activeKey={1}
      year={2018}
      month={9}
      onChange={action('onChange')}
      onClickSetting={action('onClickSetting')}
    >
      <Switch />
    </Header>
  ))
