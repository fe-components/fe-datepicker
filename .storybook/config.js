import { configure } from '@kadira/storybook'

configure(() => {
  require('../demo/')
  // require as many stories as you need.
}, module)
