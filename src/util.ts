import { useEffect, useState } from 'react'

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
export const useViewportHeight = (): number => {
  const [height, setHeight] = useState(window.innerHeight)
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
export const useViewportWidth = (): number => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [width])
  return width
}
