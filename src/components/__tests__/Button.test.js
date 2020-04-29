import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../Button'

it('has button type attribute', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Button>Lorem Ipsum</Button>,
    div
  )

  expect(div.querySelector('input').type).toEqual('button')
})
