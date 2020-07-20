import React, { MouseEvent, ReactNode } from 'react'
import './_index.scss'

interface Props {
  children: ReactNode
  className?: string
  isOpen?: boolean
  onClose?: (event?: MouseEvent<HTMLButtonElement>) => void
}

/**
 * Modal
 * @prop {ReactNode} [children] React component children
 * @prop {string} [className] CSS class attribute value to append to default value
 * @prop {boolean} [isOpen] Unhide modal if true
 * @prop {(event?: MouseEvent<HTMLButtonElement>) => void} [onClose] Function to run when close event is triggered
 */
const Modal = ({ children, className, isOpen, onClose }: Props) => {
  let c = 'modal-overlay'
  if (isOpen) c += ' modal-open'
  if (className) c += ` ${className}`

  return (
    <div className={c}>
      <section className="modal">
        <button type="button" className="modal-close" onClick={onClose}>
          X
        </button>
        <section className="modal-content">{children}</section>
      </section>
    </div>
  )
}

export default Modal
