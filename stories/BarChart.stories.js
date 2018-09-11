import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { antdDecorator } from './Decorator'
import BarChart from '../src/BarChart'

const style = {marginBottom: 20, border: 'solid 1px #e9e9e9', height: 400, width: 800};

let stories = storiesOf('BarChart', module)
stories.addDecorator(getStory => antdDecorator(getStory))
stories.addDecorator(getStory => <div style={style}>{getStory()}</div>)

const props = {
  width: 800,
  height: 400,
  data: [
    {name: '09/01', num: 4000},
    {name: '09/02', num: 3000},
    {name: '09/03', num: 2000},
    {name: '09/04', num: 2780},
    {name: '09/05', num: 1890},
    {name: '09/06', num: 2390},
    {name: '09/07', num: 3490},
  ],
  xDataKey: "name",
  yDataKeys: [
    {key: "num", label: "Nums", color: '#42A5F5'},
  ]
}

stories.add("normal", () => (
  <BarChart {...props} />
))
