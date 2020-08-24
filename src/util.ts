import { useEffect, useState } from 'react'

export const DISABLE_BG_SCROLL_CLASS = 'disable-bg-scroll'

/**
 * Control if scrolling is enabled in background when modal is opened
 * @param {boolean} allowScrolling Allow scrolling if true, false otherwise
 */
export const setBodyScroll = (allowScrolling: boolean) => {
  if (allowScrolling) {
    document.body.classList.remove(DISABLE_BG_SCROLL_CLASS)
  } else {
    document.body.classList.add(DISABLE_BG_SCROLL_CLASS)
  }
}

/**
 * Custom hook that runs a function when component mounts
 * @param {() => void} cb Callback function to run on component mount
 */
export const useDidMount = (cb: () => void) => {
  const [didMount, setDidMount] = useState(false)
  useEffect(() => {
    if (!didMount) {
      setDidMount(true)
      cb()
    }
  }, [didMount]) // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * Custom hook that returns viewport height (including scrollbar) as state
 * @return {(number)} Viewport height
 */
export const useViewportHeight = (
  __IS_SERVER__?: boolean
): number | undefined => {
  const heightVal = __IS_SERVER__ ? undefined : window.innerHeight
  const [height, setHeight] = useState(heightVal)
  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [height])
  return height
}

/**
 * Custom hook that returns viewport width (including scrollbar) as state
 * @return {(number)} Viewport width
 */
export const useViewportWidth = (
  __IS_SERVER__?: boolean
): number | undefined => {
  const widthVal = __IS_SERVER__ ? undefined : window.innerWidth
  const [width, setWidth] = useState(widthVal)
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [width])
  return width
}

export default { useDidMount, useViewportHeight, useViewportWidth }
