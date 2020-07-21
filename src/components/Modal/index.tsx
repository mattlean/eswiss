import React, {
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import './_index.scss'

export interface Props {
  children: ReactNode
  className?: string
  closeOnOverlayClick?: boolean
  focusEleOnClose?: HTMLElement
  isOpen?: boolean
  onClose?: (event?: MouseEvent<HTMLButtonElement>) => void
  onOpen?: (...args: any[]) => void
}

/**
 * Modal
 * @prop {ReactNode} [children] React component children
 * @prop {string} [className] CSS class attribute value to append to default value
 * @prop {boolean} [closeOnOverlayClick] Close modal if overlay is clicked if true
 * @prop {HTMLElement} [focusEleOnClose] Element to be focused on after modal closes
 * @prop {boolean} [isOpen] Unhide modal if true
 * @prop {(event?: MouseEvent<HTMLButtonElement>) => void} [onClose] Function to run when close event is triggered
 * @prop {(...args: any[]) => void} [onOpen] Function to run when open event is triggered
 */
const Modal = ({
  children,
  className,
  closeOnOverlayClick,
  focusEleOnClose,
  isOpen,
  onClose,
  onOpen,
}: Props) => {
  /**
   * Control existance of modal-open CSS class on body element
   * @param {boolean} open modal-open CSS class exists on body element if true
   */
  const setBodyModalState = (open: boolean) => {
    const MODAL_OPEN_CLASS = 'modal-open'

    if (open) {
      document.body.classList.add(MODAL_OPEN_CLASS)
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS)
    }
  }

  // Apply modal-open CSS class to body element if isOpen
  useEffect(() => {
    if (isOpen) {
      setBodyModalState(true)

      // Call onOpen function is available.
      if (onOpen) onOpen()
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function called when onClose event is triggered
   */
  const closeModal = () => {
    setBodyModalState(false)

    // Call onClose function if available.
    if (onClose) onClose()

    // Focus on focusEleOnClose element if available.
    // Will likely be the last focused item prior to modal opening.
    if (focusEleOnClose) focusEleOnClose.focus()
  }

  const modalEle = useRef<HTMLElement>(null)
  const [tabNavStart, setTabNavStart] = useState<HTMLElement>()
  const [tabNavEnd, setTabNavEnd] = useState<HTMLElement>()

  // Setup keyboard tab trap, tabNavStart & tabNavEnd
  useEffect(() => {
    if (modalEle.current) {
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
              e.preventDefault()
              tabNavEnd.focus()
            }
          } else if (tabNavStart) {
            // Tab only
            if (document.activeElement === tabNavEnd) {
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
        tabNavStart.focus() // Focus tabNavStart to start user in modal
      }

      // Apply keyboard tab trap on modal
      currModalEle.addEventListener('keydown', trapTab)
      return () => currModalEle.removeEventListener('keydown', trapTab)
    }
  }, [tabNavStart, tabNavEnd]) // eslint-disable-line react-hooks/exhaustive-deps

  const overlayEle = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (closeOnOverlayClick) {
      if (overlayEle.current) {
        const currModalOverlayEle = overlayEle.current

        /**
         * Run closeModal() only when overlay is clicked alone
         * @param {MouseEvent} e Mouse event object
         */
        const clickOverlay = (e: globalThis.MouseEvent) => {
          if (e.target === currModalOverlayEle) closeModal()
        }

        /*
         * TODO
         * There is a problem with addEventListener & clickOverlay
         * so clickOverlay's e param is set to "globalThis.MouseEvent"
         * https://stackoverflow.com/questions/55092588/typescript-addeventlistener-set-event-type
         */
        currModalOverlayEle.addEventListener('click', clickOverlay)
        return () =>
          currModalOverlayEle.removeEventListener('click', clickOverlay)
      }
    }
  }, [closeOnOverlayClick]) // eslint-disable-line react-hooks/exhaustive-deps

  // Apply CSS class names
  let c = 'modal-overlay'
  if (isOpen) c += ' modal-open'
  if (className) c += ` ${className}`

  return (
    <div ref={overlayEle} className={c}>
      <section ref={modalEle} className="modal">
        <section className="modal-content">{children}</section>
        <button type="button" className="modal-close" onClick={closeModal}>
          X
        </button>
      </section>
    </div>
  )
}

export default Modal
