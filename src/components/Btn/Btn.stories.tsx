import React from 'react'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'
import Btn from './index'
import './_index.scss'

export default {
  title: 'Button',
  component: Btn,
  decorators: [withKnobs],
}

export const Default = () => (
  <Btn type="button" onClick={action('Triggered click event')}>
    {text('Text', 'Lorem Ipsum')}
  </Btn>
)

export const Outline = () => (
  <Btn outline onClick={action('Triggered click event')}>
    {text('Text', 'Lorem Ipsum')}
  </Btn>
)
