import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { antdDecorator } from './Decorator'
import Switch from '../src/Switch'
import { VIEW_MODE } from '../src/reducers/tab2'

storiesOf('Switch', module)
  .addDecorator(getStory => antdDecorator(getStory))
  .addDecorator(getStory => <div style={{background: '#070182', height: '100%', padding: 20}}>{getStory()}</div>)
  .add("no value", () => <Switch onChange={action("onChange")}/>)
  .add(`value is ${VIEW_MODE.PEOPLE}`, () => <Switch value={VIEW_MODE.PEOPLE} onChange={action("onChange")}/>)
  .add(`value is ${VIEW_MODE.TIME}`, () => <Switch value={VIEW_MODE.TIME} onChange={action("onChange")}/>)
  .add(`with height`, () => <Switch height={20} size={10} onChange={action("onChange")}/>)
