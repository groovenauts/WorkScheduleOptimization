import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { antdDecorator } from './Decorator'
import List from '../src/List'

storiesOf('List', module)
  .addDecorator(getStory => antdDecorator(getStory))
  .addDecorator(getStory => <div style={{height: '100%', width: 300, margin: 20, border: 'solid 1px grey'}}>{getStory()}</div>)
  .add("empty", () => <List />)
  .add("normal", () => <List header="header text" data={[{
    icon: require("../src/styles/img/1.svg"),
    title: "Title#1",
    description: "Description#1",
  }, {
    title: "Title#2",
    description: "Description#2",
  }]}/>)
