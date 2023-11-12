import { useContext } from "react"
import NotificationContext from "../notificationContext"

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  const [notification, messageDispatch] = useContext(NotificationContext)

  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }

}

export default Notification
