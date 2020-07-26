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
  <h1 className="heading4">
    {text('Heading Text', 'Lorem Ipsum')}{' '}
    <Badge fill={true} style={{ backgroundColor: 'red' }}>
      {text('Badge Text', 'New')}
    </Badge>
  </h1>
)

export const BadgeAndButton = () => (
  <Btn>
    Notifications{' '}
    <Badge
      fill={true}
      wide={true}
      style={{
        backgroundColor: 'blue',
        marginLeft: '0.5em',
        padding: '0.4em 0.6em 0.25em',
      }}
    >
      {text('Badge Text', '9')}
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
    <Badge wide={true} style={{ marginLeft: '1em' }}>
      #bar
    </Badge>
    <Badge wide={true} style={{ marginLeft: '1em' }}>
      #baz
    </Badge>
  </>
)
