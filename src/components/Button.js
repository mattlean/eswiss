import React from 'react'

export const Button = ({ children, onClick }) => (
  <input type="button" onClick={onClick} value={children} />
)
