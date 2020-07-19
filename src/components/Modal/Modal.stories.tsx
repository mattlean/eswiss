import React from 'react'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'
import Modal from './index'

export default {
  title: 'Modal',
  component: Modal,
  decorators: [withKnobs],
}

export const Default = () => (
  <Modal onClose={action('Triggered onClose event')}>
    {text(
      'Text',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue enim ac nibh dictum, eu hendrerit enim malesuada. Vivamus et magna dignissim ipsum viverra pretium quis interdum dui. Proin eget rhoncus arcu, ut feugiat est. Integer eget nulla sed orci gravida aliquet. Sed a luctus metus, ac porta ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non vestibulum quam. Vivamus porta vulputate ultrices. Ut et congue purus. Sed id tortor et sem cursus aliquet sed eget nibh. Sed scelerisque quam eleifend dolor pellentesque, eget ultricies justo aliquam. Praesent eu tortor sed diam dignissim accumsan. Cras sit amet ex mi.'
    )}
  </Modal>
)
