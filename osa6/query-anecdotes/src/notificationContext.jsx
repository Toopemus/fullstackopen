import { createContext, useReducer, useContext } from "react"

const messageReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIF":
      return action.payload
    case "RESET_NOTIF":
      return null
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(messageReducer, null)

  return (
    <NotificationContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationDispatch = () => {
  const counterAndDispatch = useContext(NotificationContext)
  return counterAndDispatch[1]
}

export default NotificationContext
