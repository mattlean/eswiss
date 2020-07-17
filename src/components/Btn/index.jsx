import React from 'react'
import './_index.scss'

const Btn = ({ children, className, onClick, outline }) => {
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
