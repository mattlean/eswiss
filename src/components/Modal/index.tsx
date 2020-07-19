import React, { MouseEvent, ReactNode } from 'react'
import './_index.scss'

interface Props {
  children: ReactNode
  className?: string
  onClose?: (event?: MouseEvent<HTMLButtonElement>) => void
}

/**
 * Modal
 * @prop {ReactNode} [children] React component children
 * @prop {string} [className] CSS class attribute value to append to default value
 * @prop {(event?: MouseEvent<HTMLButtonElement>) => void} [onClose] Function to run when click event is triggered
 */
const Modal = ({ children, className, onClose }: Props) => {
  let c = 'modal-area'
  if (className) c += ` ${className}`

  return (
    <div className={c}>
      <div className="modal">
        {children}
        <button type="button" className="modal-close" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  )
}

export default Modal
