import { useEffect, useState } from 'react'

const useLocalStorage = (key: string, initialValue: string[]) => {
  const getValue = () => {
    const storedValue = localStorage.getItem(key)
    return storedValue !== null ? JSON.parse(storedValue) : initialValue
  }

  const [value, setValue] = useState(getValue)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
