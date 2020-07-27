import React, { MouseEvent, ReactNode } from 'react'

interface Props {
  ariaDescribedBy?: string
  ariaLabel?: string
  ariaLabelledBy?: string
  children?: ReactNode
  className?: string
  nodeType?: 'button' | 'input'
  onClick?: (event?: MouseEvent<HTMLButtonElement | HTMLInputElement>) => void
  outline?: boolean
  overrideClassName?: boolean
  style?: object
  type?: 'button' | 'reset' | 'submit'
}

/**
 * Button
 * @prop {string} [ariaDescribedBy] aria-describedby attribute value
 * @prop {string} [ariaLabel] aria-label attribute value
 * @prop {string} [ariaLabelledBy] aria-labelledby attribute value
 * @prop {ReactNode} [children] React component children
 * @prop {string} [className] CSS class attribute value to append to default value
 * @prop {'button'|'input'} [nodeType='button'] Determine if button is button or input element
 * @prop {(event?: MouseEvent<HTMLButtonElement|HTMLInputElement>) => void} [onClick] Function to run when click event is triggered
 * @prop {boolean} [outline] Set outline style if true
 * @prop {boolean} [overrideClassName] Override default class attribute values if true
 * @prop {object} [style] Style attribute value
 * @prop {('button' | 'reset' | 'submit')} [type='button'] HTML type attribute
 */
const Btn = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  className,
  nodeType,
  onClick,
  overrideClassName,
  outline,
  style,
  type,
}: Props) => {
  // Create DOM node type
  let Node: keyof JSX.IntrinsicElements
  if (nodeType === 'input') {
    Node = 'input'
  } else {
    Node = 'button'

    if (nodeType !== undefined && nodeType !== 'button') {
      // eslint-disable-next-line no-console
      console.warn(
        'Attempted to set unsupported node type. Setting node type as "button".'
      )
    }
  }

  let t = type || 'button' // Apply type attribute

  // Apply CSS class names
  let classNames = []
  if (!overrideClassName) {
    classNames.push('btn')
    if (outline) classNames.push('outline')
  }
  if (className) classNames.push(className)

  // Render component
  return (
    <Node
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      type={t}
      onClick={onClick}
      className={classNames.join(' ')}
      style={style}
    >
      {children}
    </Node>
  )
}

export default Btn
