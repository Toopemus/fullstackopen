import { useState } from "react"

const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue("")
  }

  // Use this with spread for input field parameters
  const params = {
    type,
    value,
    onChange
  }

  return {
    type,
    value,
    onChange,
    reset,
    params
  }
}

export default useField
