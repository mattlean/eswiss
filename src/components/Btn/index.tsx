import React, { MouseEvent, ReactNode } from 'react'
import './_index.scss'

interface Props {
  children?: ReactNode
  className?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  outline?: boolean
}

/**
 * Button
 */
const Btn = ({ children, className, onClick, outline }: Props) => {
  let c = 'btn'

  if (outline) c += ' outline'
  if (className) c += ` ${className}`

  return (
    <button onClick={onClick} className={c}>
      {children}
    </button>
  )
}

export default Btn
