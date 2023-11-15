import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import { Alert } from "react-bootstrap"

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return (
    <>
      {notification && (
        <Alert variant={notification.isError ? "danger" : "success"}>
          {notification.message}
        </Alert>
      )}
    </>
  )
}

Notification.propTypes = {
  notification: PropTypes.object,
}

export default Notification
