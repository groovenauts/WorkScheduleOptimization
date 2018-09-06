import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'

import { antdDecorator } from './Decorator'
import Processing from '../src/Processing'

storiesOf('Processing', module)
  .addDecorator(getStory => antdDecorator(getStory))
  .add("normal", () => <Processing visible={true} />)
  .add("with text", () => <Processing visible={true} text={"Loading..."} />)
