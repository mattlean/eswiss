import React, {
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useViewportHeight, useViewportWidth } from '../../util'

export interface Props {
  allowBgScroll?: boolean
  ariaDescribedBy?: string
  ariaLabel?: string
  ariaLabelledBy?: string
  autoCenterH?: boolean
  autoCenterV?: boolean
  children?: ReactNode
  className?: string
  closeOnOverlayClick?: boolean
  hideEleWithAria?: HTMLElement | string
  focusEleOnClose?: HTMLElement
  isFull?: boolean
  isOpen?: boolean
  modalClassName?: string
  modalStyle?: object
  onClose?: (event?: MouseEvent<HTMLButtonElement>) => void
  onOpen?: (...args: any[]) => void
  overlayClassName?: string
  overlayStyle?: object
  overrideClassName?: boolean
  style?: object
  useAriaHidden?: boolean
  useAriaModal?: boolean
}

/**
 * Modal
 * @prop {boolean} [allowBgScroll] Allow background to scroll while modal is open if true
 * @prop {boolean} [autoCenterH] Automatically center modal horizontally when modal is smaller than viewport width
 * @prop {boolean} [autoCenterV] Automatically center modal vertically when modal is smaller than viewport height
 * @prop {string} [ariaDescribedBy] aria-describedby attribute value
 * @prop {string} [ariaLabel] aria-label attribute value
 * @prop {string} [ariaLabelledBy] aria-labelledby attribute value
 * @prop {ReactNode} [children] React component children
 * @prop {string} [className] Modal CSS class attribute value to append to default value. Overwritten by modalClassName prop.
 * @prop {boolean} [closeOnOverlayClick] Close modal if overlay is clicked if true
 * @prop {HTMLElement} [focusEleOnClose] Element to be focused on after modal closes
 * @prop {HTMLElement | string} [hideEleWithAria] Element to apply aria-hidden attribute to while modal is open. HTMLElement or selector string is accepted.
 * @prop {boolean} [isFull] Enable fullscreen if true
 * @prop {boolean} [isOpen] Unhide modal if true
 * @prop {string} [modalClassName] Modal CSS class attribute value to append to default value. Overrides className prop.
 * @prop {object} [modalStyle] Modal style attribute value. Overrides style prop.
 * @prop {(event?: MouseEvent<HTMLButtonElement>) => void} [onClose] Function to run when close event is triggered
 * @prop {(...args: any[]) => void} [onOpen] Function to run when open event is triggered
 * @prop {string} [overlayClassName] Overlay CSS class attribute value to append to default value.
 * @prop {boolean} [overrideClassName] Override default class attribute values if true
 * @prop {object} [overlayStyle] Overlay style attribute value
 * @prop {object} [style] Modal style attribute value. Overwritten by modalStyle prop.
 * @prop {boolean} [useAriaHidden] Use aria-hidden attribute on modal when it is closed if true
 * @prop {boolean} [useAriaModal] Use aria-modal attribute on modal when it is open. Defaults to true if useAriaHidden is not set.
 */
const Modal = ({
  allowBgScroll,
  autoCenterH,
  autoCenterV,
  ariaDescribedBy,
  ariaLabel,
  ariaLabelledBy,
  children,
  className,
  closeOnOverlayClick,
  focusEleOnClose,
  hideEleWithAria,
  isFull,
  isOpen,
  modalClassName,
  modalStyle,
  onClose,
  onOpen,
  overlayClassName,
  overlayStyle,
  overrideClassName,
  style,
  useAriaHidden,
  useAriaModal,
}: Props) => {
  const MODAL_OPEN_CLASS = 'modal-open' // CSS class that controls if modal is open visually

  // Use aria-modal in default conditions
  if (useAriaModal === undefined && useAriaHidden === undefined) {
    useAriaModal = true
  }

  /**
   * Control existance of modal-open CSS class on body element
   * @param {boolean} open modal-open CSS class exists on body element if true
   */
  const setBodyModalState = (open: boolean) => {
    if (open) {
      document.body.classList.add(MODAL_OPEN_CLASS)
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS)
    }
  }

  const [tabNavStart, setTabNavStart] = useState<HTMLElement>()

  // Apply modal-open CSS class to body element if isOpen
  useEffect(() => {
    if (isOpen) {
      if (!allowBgScroll) setBodyModalState(true)

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
    return () => document.body.classList.remove(MODAL_OPEN_CLASS)
  }, [allowBgScroll, hideEleWithAria, isOpen, onOpen, tabNavStart])

  // Remove modal-open CSS class from body element if allowBgScroll is changed to false
  useEffect(() => {
    if (!allowBgScroll) document.body.classList.remove(MODAL_OPEN_CLASS)
  }, [allowBgScroll])

  /**
   * Function called when onClose event is triggered
   */
  const closeModal = () => {
    setBodyModalState(false)

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

  const modalEle = useRef<HTMLElement>(null)
  const [tabNavEnd, setTabNavEnd] = useState<HTMLElement>()

  // Setup keyboard tab trap, tabNavStart & tabNavEnd
  useEffect(() => {
    if (modalEle && modalEle.current) {
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

      const currModalEle = modalEle.current
      const tabNav = currModalEle.querySelectorAll(
        '[contenteditable], [tabindex="0"], a[href], area[href], button:not([disabled]), embed, iframe, input:not([disabled]), object, select:not([disabled]), textarea:not([disabled])'
      )

      // Set tabNavStart & tabNavEnd
      if (tabNav.length > 0) {
        const tabNavStart = tabNav[0] as HTMLElement
        setTabNavStart(tabNavStart)
        setTabNavEnd(tabNav[tabNav.length - 1] as HTMLElement)
      }

      // Apply keyboard tab trap on modal
      currModalEle.addEventListener('keydown', trapTab)
      return () => currModalEle.removeEventListener('keydown', trapTab)
    }
  }, [tabNavStart, tabNavEnd]) // eslint-disable-line react-hooks/exhaustive-deps

  const overlayEle = useRef<HTMLDivElement>(null)

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
  const viewportWidth = useViewportWidth()
  const viewportHeight = useViewportHeight()
  useEffect(() => {
    if (modalEle && modalEle.current) {
      if (autoCenterH && typeof viewportWidth === 'number') {
        if (modalEle.current.offsetWidth < viewportWidth) {
          modalEle.current.classList.add('modal-centerh')
        } else {
          modalEle.current.classList.remove('modal-centerh')
        }
      }

      if (autoCenterV && typeof viewportHeight === 'number') {
        if (modalEle.current.offsetHeight < viewportHeight) {
          modalEle.current.classList.add('modal-centerv')
        } else {
          modalEle.current.classList.remove('modal-centerv')
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
    if (isFull) modalClassNames.push('modal-full')
  }

  if (modalClassName) {
    modalClassNames.push(modalClassName)
  } else if (className) {
    modalClassNames.push(className)
  }

  if (overlayClassName) overlayClassNames.push(overlayClassName)

  // Apply style
  let s
  if (modalStyle) {
    s = modalStyle
  } else if (style) {
    s = style
  }

  // Render component
  return (
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
      <section ref={modalEle} className={modalClassNames.join(' ')} style={s}>
        <button
          type="button"
          aria-label="Close Modal"
          onClick={closeModal}
          className="modal-close"
        >
          X
        </button>
        <section className="modal-content">{children}</section>
      </section>
    </div>
  )
}

export default Modal
