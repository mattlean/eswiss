import React, { MouseEvent, ReactNode } from 'react'
import './_index.scss'

interface Props {
  children: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

/**
 * Modal
 */
const Modal = ({ children, onClick }: Props) => (
  <div className="modal-area">
    <div className="modal">
      {children}
      <button className="modal-close">X</button>
    </div>
  </div>
)

export default Modal
