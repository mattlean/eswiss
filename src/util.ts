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
