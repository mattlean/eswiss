import React, { MouseEvent, ReactNode } from 'react'

export interface Props {
  ariaDescribedBy?: string
  ariaLabel?: string
  ariaLabelledBy?: string
  children?: ReactNode
  className?: string
  fill?: boolean
  nodeType?: 'div' | 'li'
  onClick?: (event?: MouseEvent<HTMLElement>) => void
  style?: object
  wide?: boolean
}

/**
 * Badge
 * @prop {string} [ariaDescribedBy] aria-describedby attribute value
 * @prop {string} [ariaLabel] aria-label attribute value
 * @prop {string} [ariaLabelledBy] aria-labelledby attribute value
 * @prop {children} [children] Children
 * @prop {string} [className] CSS class attribute value to append to default value
 * @prop {boolean} [fill] Uses fill style if true
 * @prop {'div'|'li'} [nodeType] Determines if badge is div or li element
 * @prop {(event?: MouseEvent<HTMLElement>) => void} [onClick] Function to run when click event is triggered
 * @prop {object} [style] Style attribute value
 * @prop {boolean} [wide] Uses wide style if true
 */
const Badge = ({
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  className,
  fill,
  nodeType,
  onClick,
  style,
  wide,
}: Props) => {
  // Create DOM node type
  let Node: keyof JSX.IntrinsicElements
  if (nodeType === 'li') {
    Node = 'li'
  } else {
    Node = 'div'

    if (nodeType !== undefined && nodeType !== 'div') {
      // eslint-disable-next-line no-console
      console.warn(
        'Attempted to set unsupported node type. Setting node type as "div".'
      )
    }
  }

  // Apply CSS class names
  let c = 'badge'

  if (fill) {
    c += ' badge-fill'
  }

  if (wide) {
    c += ' badge-wide'
  }

  if (onClick) {
    c += ' badge-clickable'
  }

  if (className) {
    c += ` ${className}`
  }

  return (
    <Node
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      onClick={onClick}
      className={c}
      style={style}
    >
      {children}
    </Node>
  )
}

export default Badge
