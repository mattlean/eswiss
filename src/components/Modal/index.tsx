import React, {
  cloneElement,
  MouseEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  DISABLE_BG_SCROLL_CLASS,
  setBodyScroll,
  useViewportHeight,
  useViewportWidth,
} from '../../util'

// CSS class that controls if modal is open
const MODAL_OPEN_CLASS = 'modal-open'
// CSS class that controls if modal is full
const MODAL_FULL_CLASS = 'modal-full'
// CSS class that controls if modal is centered horizontally
const MODAL_CENTERH_CLASS = 'modal-centerh'
// CSS class that controls if modal is centered vertically
const MODAL_CENTERV_CLASS = 'modal-centerv'

export interface Props {
  __IS_SERVER__?: boolean
  allowBgScroll?: boolean
  ariaDescribedBy?: string
  ariaLabel?: string
  ariaLabelledBy?: string
  autoCenterH?: boolean
  autoCenterV?: boolean
  children?: ReactNode
  className?: string
  closeClassName?: string
  closeOnOverlayClick?: boolean
  contentClassName?: string
  hideEleWithAria?: HTMLElement | string
  focusEleOnClose?: HTMLElement
  isFull?: boolean
  isOpen?: boolean
  modalClassName?: string
  modalStyle?: object
  onClose?: (event?: MouseEvent<HTMLButtonElement>) => void
  onOpen?: (...args: any[]) => void
  overlayClassName?: string
  overlayOverride?: ReactElement
  overlayStyle?: object
  overrideClassName?: boolean
  style?: object
  useAriaHidden?: boolean
  useAriaModal?: boolean
}

/**
 * Modal
 * @prop {boolean} [__IS_SERVER__] Flag to determine if Modal is being rendered in the server or not
 * @prop {boolean} [allowBgScroll] Allow background to scroll while modal is open if true
 * @prop {boolean} [autoCenterH] Automatically center modal horizontally when modal is smaller than viewport width
 * @prop {boolean} [autoCenterV] Automatically center modal vertically when modal is smaller than viewport height
 * @prop {string} [ariaDescribedBy] aria-describedby attribute value
 * @prop {string} [ariaLabel] aria-label attribute value
 * @prop {string} [ariaLabelledBy] aria-labelledby attribute value
 * @prop {ReactNode} [children] React component children
 * @prop {string} [className] Modal CSS class attribute value to append to default value. Overwritten by modalClassName prop.
 * @prop {string} [closeClassName] Close button class attribute value to append to default value
 * @prop {boolean} [closeOnOverlayClick] Close modal if overlay is clicked if true
 * @prop {string} [contentClassName] Content class attribute value to append to default value
 * @prop {HTMLElement} [focusEleOnClose] Element to be focused on after modal closes
 * @prop {HTMLElement | string} [hideEleWithAria] Element to apply aria-hidden attribute to while modal is open. HTMLElement or selector string is accepted.
 * @prop {boolean} [isFull] Enable fullscreen if true
 * @prop {boolean} [isOpen] Unhide modal if true
 * @prop {string} [modalClassName] Modal CSS class attribute value to append to default value. Overrides className prop.
 * @prop {object} [modalStyle] Modal style attribute value. Overrides style prop.
 * @prop {(event?: MouseEvent<HTMLButtonElement>) => void} [onClose] Function to run when close event is triggered
 * @prop {(...args: any[]) => void} [onOpen] Function to run when open event is triggered
 * @prop {string} [overlayClassName] Overlay CSS class attribute value to append to default value.
 * @prop {ReactNode} [overlayOverride] Component to override default overlay div
 * @prop {boolean} [overrideClassName] Override default class attribute values if true
 * @prop {object} [overlayStyle] Overlay style attribute value
 * @prop {object} [style] Modal style attribute value. Overwritten by modalStyle prop.
 * @prop {boolean} [useAriaHidden] Use aria-hidden attribute on modal when it is closed if true
 * @prop {boolean} [useAriaModal] Use aria-modal attribute on modal when it is open. Defaults to true if useAriaHidden is not set.
 */
const Modal = ({
  __IS_SERVER__,
  allowBgScroll,
  autoCenterH,
  autoCenterV,
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  className,
  closeClassName,
  closeOnOverlayClick,
  contentClassName,
  focusEleOnClose,
  hideEleWithAria,
  isFull,
  isOpen,
  modalClassName,
  modalStyle,
  onClose,
  onOpen,
  overlayClassName,
  overlayOverride,
  overlayStyle,
  overrideClassName,
  style,
  useAriaHidden,
  useAriaModal,
}: Props) => {
  // Use aria-modal in default conditions
  if (useAriaModal === undefined && useAriaHidden === undefined) {
    useAriaModal = true
  }

  const [tabNavStart, setTabNavStart] = useState<HTMLElement>()

  useEffect(() => {
    if (isOpen) {
      // Disable background scrolling while modal is open
      if (!allowBgScroll) setBodyScroll(false)

      // Hide background content from a11y API
      if (hideEleWithAria) {
        if (typeof hideEleWithAria !== 'string') {
          hideEleWithAria.setAttribute('aria-hidden', 'true')
        } else if (typeof hideEleWithAria === 'string') {
          const ele = document.querySelector(hideEleWithAria)
          if (ele) ele.setAttribute('aria-hidden', 'true')
        }
      }

      // Call onOpen function is available.
      if (onOpen) onOpen()

      // Begin focus on first focusable element in modal
      if (tabNavStart) tabNavStart.focus()
    }

    // Remove modal-open CSS class on body on unmount
    return () => document.body.classList.remove(DISABLE_BG_SCROLL_CLASS)
  }, [allowBgScroll, hideEleWithAria, isOpen, onOpen, tabNavStart])

  // Remove modal-open CSS class from body element if allowBgScroll is changed to false
  useEffect(() => {
    if (!allowBgScroll) document.body.classList.remove(DISABLE_BG_SCROLL_CLASS)
  }, [allowBgScroll])

  /**
   * Function called when onClose event is triggered
   */
  const closeModal = () => {
    setBodyScroll(true)

    // Expose background content for a11y API
    if (hideEleWithAria) {
      if (typeof hideEleWithAria !== 'string') {
        hideEleWithAria.removeAttribute('aria-hidden')
      } else if (typeof hideEleWithAria === 'string') {
        const ele = document.querySelector(hideEleWithAria)
        if (ele) ele.removeAttribute('aria-hidden')
      }
    }

    // Call onClose function if available.
    if (onClose) onClose()

    // Focus on focusEleOnClose element if available.
    // Will likely be the last focused item prior to modal opening.
    if (focusEleOnClose) focusEleOnClose.focus()
  }

  const overlayEle = useRef<HTMLDivElement>(null)
  const [tabNavEnd, setTabNavEnd] = useState<HTMLElement>()

  // Setup keyboard tab trap, tabNavStart & tabNavEnd
  useEffect(() => {
    if (overlayEle && overlayEle.current) {
      /**
       * Setup keyboard tab trap
       * @param {KeyboardEvent} e Keyboard event object
       */
      const trapTab = (e: KeyboardEvent) => {
        if (e.keyCode === 27) {
          closeModal()
        } else if (e.keyCode === 9) {
          // Shift + Tab
          if (tabNavEnd && e.shiftKey) {
            if (document.activeElement === tabNavStart) {
              // Move activeElement to end of tab nav
              e.preventDefault()
              tabNavEnd.focus()
            }
          } else if (tabNavStart) {
            // Tab only
            if (document.activeElement === tabNavEnd) {
              // Move activeElement to start of tab nav
              e.preventDefault()
              tabNavStart.focus()
            }
          }
        }
      }

      const currOverlayEle = overlayEle.current
      const tabNav = currOverlayEle.querySelectorAll(
        '[contenteditable], [tabindex="0"], a[href], area[href], button:not([disabled]), embed, iframe, input:not([disabled]), object, select:not([disabled]), textarea:not([disabled])'
      )

      // Set tabNavStart & tabNavEnd
      if (tabNav.length > 0) {
        setTabNavStart(tabNav[0] as HTMLElement)
        setTabNavEnd(tabNav[tabNav.length - 1] as HTMLElement)
      }

      // Apply keyboard tab trap on modal
      currOverlayEle.addEventListener('keydown', trapTab)
      return () => currOverlayEle.removeEventListener('keydown', trapTab)
    }
  }, [tabNavStart, tabNavEnd]) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle overlay click event listener
  useEffect(() => {
    if (closeOnOverlayClick) {
      if (overlayEle && overlayEle.current) {
        const currModalOverlayEle = overlayEle.current

        /**
         * Run closeModal() only when overlay is clicked alone
         * @param {MouseEvent} e Mouse event object
         */
        const clickOverlay = (e: any) => {
          if (e.target === currModalOverlayEle) closeModal()
        }

        /*
         * TODO
         * There is a problem with addEventListener & clickOverlay
         * so clickOverlay's e param is set to "any"
         * https://stackoverflow.com/questions/55092588/typescript-addeventlistener-set-event-type
         */
        currModalOverlayEle.addEventListener('click', clickOverlay)
        return () =>
          currModalOverlayEle.removeEventListener('click', clickOverlay)
      }
    }
  }, [closeOnOverlayClick]) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-center modal if conditions are met
  const modalEle = useRef<HTMLElement>(null)
  const viewportWidth = useViewportWidth(__IS_SERVER__)
  const viewportHeight = useViewportHeight(__IS_SERVER__)
  useEffect(() => {
    if (modalEle && modalEle.current) {
      if (autoCenterH && typeof viewportWidth === 'number') {
        if (modalEle.current.offsetWidth < viewportWidth) {
          modalEle.current.classList.add(MODAL_CENTERH_CLASS)
        } else {
          modalEle.current.classList.remove(MODAL_CENTERH_CLASS)
        }
      }

      if (autoCenterV && typeof viewportHeight === 'number') {
        if (modalEle.current.offsetHeight < viewportHeight) {
          modalEle.current.classList.add(MODAL_CENTERV_CLASS)
        } else {
          modalEle.current.classList.remove(MODAL_CENTERV_CLASS)
        }
      }
    }
  }, [autoCenterH, autoCenterV, viewportHeight, viewportWidth])

  // Assign conditional aria attributes
  const ariaHiddenVal = useAriaHidden && !isOpen ? true : undefined
  const ariaModalVal = useAriaModal && isOpen ? true : undefined

  // Apply CSS class names
  let modalClassNames = []
  let overlayClassNames = []

  if (!overrideClassName) {
    modalClassNames.push('modal')
    overlayClassNames.push('modal-overlay')
    if (isOpen) overlayClassNames.push(MODAL_OPEN_CLASS)
  }

  if (isFull) modalClassNames.push(MODAL_FULL_CLASS)

  if (modalClassName) {
    modalClassNames.push(modalClassName)
  } else if (className) {
    modalClassNames.push(className)
  }

  if (overlayClassName) overlayClassNames.push(overlayClassName)

  let closeClassNameVal = 'modal-close'
  if (closeClassName) {
    closeClassNameVal += ` ${closeClassName}`
  }
  let contentClassNameVal = 'modal-content'
  if (contentClassName) {
    contentClassNameVal += ` ${contentClassName}`
  }

  // Apply style
  let s
  if (modalStyle) {
    s = modalStyle
  } else if (style) {
    s = style
  }

  // Create modal JSX
  const modalContent = (
    <section ref={modalEle} className={modalClassNames.join(' ')} style={s}>
      <button
        type="button"
        aria-label="Close Modal"
        onClick={closeModal}
        className={closeClassNameVal}
      >
        X
      </button>
      <section className={contentClassNameVal}>{children}</section>
    </section>
  )

  let m
  if (overlayOverride) {
    m = cloneElement(
      overlayOverride,
      {
        ref: overlayEle,
        'aria-describedby': ariaDescribedBy,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        'aria-hidden': ariaHiddenVal,
        'aria-modal': ariaModalVal,
        role: 'dialog',
        className: overlayClassNames.join(' '),
        style: { overlayStyle },
      },
      modalContent
    )
  } else {
    m = (
      <div
        ref={overlayEle}
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-hidden={ariaHiddenVal}
        aria-modal={ariaModalVal}
        role="dialog"
        className={overlayClassNames.join(' ')}
        style={overlayStyle}
      >
        {modalContent}
      </div>
    )
  }

  // Render component
  return m
}

export default Modal
