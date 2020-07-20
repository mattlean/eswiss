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
  focusEleOnClose?: HTMLElement
  isOpen?: boolean
  onClose?: (event?: MouseEvent<HTMLButtonElement>) => void
}

/**
 * Modal
 * @prop {ReactNode} [children] React component children
 * @prop {string} [className] CSS class attribute value to append to default value
 * @prop {HTMLElement} [focusEleOnClose] Element to be focused on after modal closes
 * @prop {boolean} [isOpen] Unhide modal if true
 * @prop {(event?: MouseEvent<HTMLButtonElement>) => void} [onClose] Function to run when close event is triggered
 */
const Modal = ({
  children,
  className,
  focusEleOnClose,
  isOpen,
  onClose,
}: Props) => {
  const modalEle = useRef<HTMLElement>(null)
  const [tabNavStart, setTabNavStart] = useState<HTMLElement>()
  const [tabNavEnd, setTabNavEnd] = useState<HTMLElement>()

  /**
   * Function called when onClose event is triggered
   */
  const closeModal = () => {
    // Call onClose function if available.
    if (onClose) onClose()
    // Focus on focusEleOnClose element if available.
    // Will likely be the last focused item prior to modal opening.
    if (focusEleOnClose) focusEleOnClose.focus()
  }

  useEffect(() => {
    if (modalEle.current) {
      // Setup keyboard tab trap
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

      if (tabNav.length > 0) {
        setTabNavStart(tabNav[0] as HTMLElement)
        setTabNavEnd(tabNav[tabNav.length - 1] as HTMLElement)
      }

      modalEle.current.addEventListener('keydown', trapTab)
      return () => {
        currModalEle.removeEventListener('keydown', trapTab)
      }
    }
  }, [tabNavStart, tabNavEnd]) // eslint-disable-line react-hooks/exhaustive-deps

  let c = 'modal-overlay'
  if (isOpen) c += ' modal-open'
  if (className) c += ` ${className}`

  return (
    <div className={c}>
      <section ref={modalEle} className="modal">
        <button type="button" className="modal-close" onClick={closeModal}>
          X
        </button>
        <section className="modal-content">{children}</section>
      </section>
    </div>
  )
}

export default Modal
