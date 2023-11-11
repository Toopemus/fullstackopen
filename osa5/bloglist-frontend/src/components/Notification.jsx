import PropTypes from "prop-types"

const Notification = ({ notification }) => {
  return (
    <>
      {notification &&
        <div className={notification.isError ? "error" : "notification"}>
          {notification.message}
        </div>
      }
    </>
  )
}

Notification.propTypes = {
  notification: PropTypes.object
}

export default Notification
