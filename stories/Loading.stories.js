import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
import { Icon } from 'antd';

import { antdDecorator } from './Decorator'
import Mask from '../src/Mask'
import Loading from '../src/Loading'

storiesOf('Mask/Loading', module)
  .addDecorator(getStory => antdDecorator(getStory))
  .add("normal", () => <Mask visible={true}><Loading visible={true}/></Mask>)
  .add("with text", () => <Mask visible={true}><Loading visible={true} text={"Loading..."} /></Mask>)
  .add("with children", () => <Mask visible={true}><Icon type="loading" theme="outlined" style={{color: '#060077', fontSize: 34, display: 'block'}}/></Mask>)
