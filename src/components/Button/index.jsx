import React from 'react'

const Button = ({ children, onClick }) => (
  <input type="button" onClick={onClick} value={children} />
)

export default Button
