import * as React from 'react'
import { Dispatch, SetStateAction } from "react";

/**
 *
 * @param {String} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */

interface UseLocalStorageStateOptions<T> {
  key: string;
  defaultValue?: unknown;
  serialize?: (arg: T) => string;
  deserialize?: (arg: string) => T;
}

function useLocalStorageState<T>(
  {key, defaultValue, serialize = JSON.stringify, deserialize = JSON.parse}: UseLocalStorageStateOptions<T>
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = React.useState<T>(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

export {useLocalStorageState}
