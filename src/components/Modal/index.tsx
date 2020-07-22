import React, {
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useViewportHeight } from '../../util'

export interface Props {
  ariaDescribedBy?: string
  ariaLabelledBy?: string
  children?: ReactNode
  className?: string
  closeOnOverlayClick?: boolean
  hideEleWithAria?: HTMLElement | string
  focusEleOnClose?: HTMLElement
  isOpen?: boolean
  modalClassName?: string
  onClose?: (event?: MouseEvent<HTMLButtonElement>) => void
  onOpen?: (...args: any[]) => void
  overlayClassName?: string
}

/**
 * Modal
 * @prop {string} [ariaDescribedBy] aria-describedby attribute value
 * @prop {string} [ariaLabelledBy] aria-labelledby attribute value
 * @prop {ReactNode} [children] React component children
 * @prop {string} [className] Modal CSS class attribute value to append to default value. Overrides modalClassName prop.
 * @prop {boolean} [closeOnOverlayClick] Close modal if overlay is clicked if true
 * @prop {HTMLElement} [focusEleOnClose] Element to be focused on after modal closes
 * @prop {HTMLElement | string} [hideEleWithAria] Element to apply aria-hidden attribute to while modal is open. HTMLElement or selector string is accepted.
 * @prop {boolean} [isOpen] Unhide modal if true
 * @prop {string} [modalClassName] Modal CSS class attribute value to append to default value. Overwritten by className prop.
 * @prop {(event?: MouseEvent<HTMLButtonElement>) => void} [onClose] Function to run when close event is triggered
 * @prop {(...args: any[]) => void} [onOpen] Function to run when open event is triggered
 * @prop {string} [overlayClassName] Overlay CSS class attribute value to append to default value.
 */
const Modal = ({
  ariaDescribedBy,
  ariaLabelledBy,
  children,
  className,
  closeOnOverlayClick,
  focusEleOnClose,
  hideEleWithAria,
  isOpen,
  modalClassName,
  onClose,
  onOpen,
  overlayClassName,
}: Props) => {
  const MODAL_OPEN_CLASS = 'modal-open'

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
      setBodyModalState(true)

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
  }, [isOpen, tabNavStart]) // eslint-disable-line react-hooks/exhaustive-deps

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
  }, [hideEleWithAria, tabNavStart, tabNavEnd]) // eslint-disable-line react-hooks/exhaustive-deps

  const overlayEle = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (closeOnOverlayClick) {
      if (overlayEle.current) {
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
  }, [closeOnOverlayClick, hideEleWithAria]) // eslint-disable-line react-hooks/exhaustive-deps

  // Apply modal-center CSS class if modal shorter than viewport height
  const viewportHeight = useViewportHeight()
  useEffect(() => {
    if (modalEle && modalEle.current) {
      if (modalEle.current.offsetHeight < viewportHeight) {
        modalEle.current.classList.add('modal-center')
      } else {
        modalEle.current.classList.remove('modal-center')
      }
    }
  }, [viewportHeight])

  // Apply CSS class names
  let mc = 'modal'
  let oc = 'modal-overlay'
  if (isOpen) {
    oc += ` ${MODAL_OPEN_CLASS}`
  }

  if (className) {
    mc += ` ${className}`
  } else if (modalClassName) {
    mc += ` ${modalClassName}`
  }

  if (overlayClassName) {
    oc += ` ${overlayClassName}`
  }

  return (
    <div
      ref={overlayEle}
      aria-describedby={ariaDescribedBy}
      aria-labelledby={ariaLabelledBy}
      aria-hidden={!isOpen}
      role="dialog"
      className={oc}
    >
      <section ref={modalEle} className={mc}>
        <section className="modal-content">{children}</section>
        <button type="button" className="modal-close" onClick={closeModal}>
          X
        </button>
      </section>
    </div>
  )
}

export default Modal
