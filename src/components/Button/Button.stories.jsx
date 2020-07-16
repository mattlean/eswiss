import React from 'react'
import { action } from '@storybook/addon-actions'
import Button from './'

export default {
  title: 'Button',
  component: Button,
}

export const Default = () => (
  <Button onClick={action('clicked')}>Lorem Ipsum</Button>
)
