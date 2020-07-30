import React from 'react'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'
import Badge from './index'
import Btn from '../Btn'
import './_index.scss'

export default {
  title: 'Badge',
  component: Badge,
  decorators: [withKnobs],
}

export const Default = () => (
  <Badge wide={true}>{text('Text', 'Lorem Ipsum')}</Badge>
)

export const Fill = () => (
  <Badge fill={true} wide={true}>
    {text('Text', 'Lorem Ipsum')}
  </Badge>
)

export const BadgeAndHeading = () => (
  <h1 className="h4">
    {text('Heading Text', 'Lorem Ipsum')}{' '}
    <Badge fill={true} style={{ backgroundColor: 'red' }}>
      {text('Badge Text', 'Live')}
    </Badge>
  </h1>
)

export const BadgeAndButton = () => (
  <Btn>
    Notifications{' '}
    <Badge
      fill={true}
      style={{
        backgroundColor: 'blue',
      }}
      className="ml-0.5 pb-0.25 pl-0.5 pr-0.5 pt-0.25"
    >
      <span style={{ display: 'block', transform: 'translateY(2px)' }}>
        {text('Badge Text', '9')}
      </span>
    </Badge>
  </Btn>
)

export const BadgeClick = () => (
  <Badge wide={true} onClick={action('Triggered click event')}>
    Lipsum
  </Badge>
)

export const BadgeList = () => (
  <>
    <Badge wide={true}>#foo</Badge>
    <Badge wide={true} className="ml-1">
      #bar
    </Badge>
    <Badge wide={true} className="ml-1">
      #baz
    </Badge>
  </>
)
