import React, { MouseEvent, ReactNode } from 'react'
import './_index.scss'

interface Props {
  children?: ReactNode
  className?: string
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void
  outline?: boolean
  type?: 'button' | 'reset' | 'submit'
}

/**
 * Button
 * @prop {ReactNode} [children] React component children
 * @prop {string} [className] CSS class attribute value to append to default value
 * @prop {(event?: MouseEvent<HTMLButtonElement>) => void} [onClick] Function to run when click event is triggered
 * @prop {boolean} [outline] Set outline style if true
 * @prop {('button' | 'reset' | 'submit')} [type=button] HTML type attribute
 */
const Btn = ({ children, className, onClick, outline, type }: Props) => {
  let t = type || 'button'
  let c = 'btn'
  if (outline) c += ' outline'
  if (className) c += ` ${className}`

  return (
    <button type={t} onClick={onClick} className={c}>
      {children}
    </button>
  )
}

export default Btn
