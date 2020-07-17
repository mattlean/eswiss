import React from 'react'
import { action } from '@storybook/addon-actions'
import Btn from '.'

export default {
  title: 'Button',
  component: Btn,
}

export const Default = () => <Btn onClick={action('clicked')}>Lorem Ipsum</Btn>

export const Outline = () => (
  <Btn outline onClick={action('clicked')}>
    Lorem Ipsum
  </Btn>
)
