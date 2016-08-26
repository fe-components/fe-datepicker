import React from 'react'
import {
  storiesOf
  // action
} from '@kadira/storybook'
import Datepicker from '../src/'
/*
import Button from 'fe-button'

const theme = {

}*/

// console.log(Button)

storiesOf('Datepicker', module)
  .add('with text', () => (
    <div>
      <Datepicker onChange={() => {}} value='2016-10-11' formater='YYYY-MM-DD' />
    </div>
  ))
