import React from 'react'
import './_index.scss'

const Modal = ({ children, onClick }) => (
  <div className="modal-area">
    <div className="modal">
      {children}
      <button className="modal-close">X</button>
    </div>
  </div>
)

export default Modal
